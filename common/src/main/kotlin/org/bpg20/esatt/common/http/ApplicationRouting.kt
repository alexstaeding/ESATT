package org.bpg20.esatt.common.http

import com.google.inject.Inject
import dev.morphia.query.UpdateException
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.pipeline.*
import org.bpg20.esatt.common.datastore.*
import org.bpg20.esatt.common.model.ObjectWithId

class ApplicationRouting @Inject constructor(
  private val departmentRepository: DepartmentRepository,
  private val documentTemplateRepository: DocumentTemplateRepository,
  private val evaluationSchemeRepository: EvaluationSchemeRepository,
  private val thesisRepository: ThesisRepository,
  private val userRepository: UserRepository,
) : Configurable<Route> {
  override fun Route.configure() {
    route("/api/v1/departments") {
      configureRepository(departmentRepository, Validation.DepartmentValidation)
    }
    route("/api/v1/document-templates") {
      configureRepository(documentTemplateRepository, Validation.DocumentTemplateValidation)
    }
    route("/api/v1/evaluation-schemes") {
      configureRepository(evaluationSchemeRepository, Validation.EvaluationSchemeValidation)
    }
    route("/api/v1/theses") {
      configureRepository(thesisRepository, Validation.ThesisValidation)
    }
    route("/api/v1/users") {
      configureRepository(userRepository, Validation.UserValidation)
    }
  }
}

inline fun <reified T : ObjectWithId<*>> Route.configureRepository(
  repository: Repository<*, T>,
  modelValidation: Validation.Model<T>,
) {
  get {
    val errors = StringBuilder(Validation.errorMessage)
    val ascending = Validation.validateAscending(call.request.header("ascending"), errors)
    val field = modelValidation.validateSortByField(call.request.header("field"), errors)
    val limit = Validation.validateLimit(call.request.header("limit"), errors)
    val preview = Validation.validatePreview(call.request.header("preview"), errors)
    val search = call.request.header("search")
    if (ascending.second
      || field.second
      || limit.second
      || preview.second
    ) {
      return@get call.respondText(errors.toString(), status = HttpStatusCode.BadRequest)
    }
    getAndRun({
      repository.getAll(
        ascending.first,
        field.first,
        limit.first,
        preview.first,
        search,
      ).toList()
    }) {
      if (it != null) {
        call.respondText("Failed to get documents: ${it.message}", status = HttpStatusCode.InternalServerError)
      }
    }
  }
  get("{id}") {
    val errors = StringBuilder(Validation.errorMessage)
    val id = Validation.requireId(call.parameters["id"])
      ?: return@get call.respondText(errors.toString(), status = HttpStatusCode.BadRequest)
    val parsedId = try {
      with(repository) { id.asTKey() }
    } catch (e: IllegalArgumentException) {
      return@get call.respondText("Invalid id: ${e.message}", status = HttpStatusCode.BadRequest)
    }
    getAndRun({ repository.getOne(parsedId) }) {
      if (it == null) {
        call.respondText("No document with id $id", status = HttpStatusCode.NotFound)
      } else {
        call.respondText("Failed to get document with id $id: ${it.message}", status = HttpStatusCode.InternalServerError)
      }
    }
  }
  post {
    receiveAndRun(repository::insertOne) {
      call.respondText(
        "Failed to insert document: ${throwable?.message}",
        status = HttpStatusCode.InternalServerError,
      )
    }
  }
  put {
    receiveAndRun(repository::updateOne) {
      when {
        original.getId() == null -> call.respondText(
          "Id is required to update document",
          status = HttpStatusCode.BadRequest,
        )
        throwable is UpdateException -> call.respondText(
          "No document with id ${original.getId()}: ${throwable.message}",
          status = HttpStatusCode.BadRequest,
        )
        else -> call.respondText(
          "Failed to update document: ${throwable?.message}",
          status = HttpStatusCode.InternalServerError,
        )
      }
    }
  }
}

suspend inline fun <reified T> PipelineContext<Unit, ApplicationCall>.getAndRun(
  dbFun: () -> T,
  ifFailed: (Throwable?) -> Unit,
) {
  val result: Pair<T?, Throwable?> = try {
    dbFun() to null
  } catch (e: Throwable) {
    null to e
  }
  if (result.first == null) {
    ifFailed(result.second)
  } else {
    call.respond(result.first!!)
  }
}

suspend inline fun <reified T : ObjectWithId<*>> PipelineContext<Unit, ApplicationCall>.receiveAndRun(
  dbFun: (T) -> T?,
  ifFailed: (FailedResult<T>).() -> Unit,
) {
  val received = try {
    call.receive<T>()
  } catch (e: Throwable) {
    return call.respondText(e.message ?: "An error occurred", status = HttpStatusCode.BadRequest)
  }
  val result: Pair<T?, Throwable?> = try {
    dbFun(received) to null
  } catch (e: Throwable) {
    null to e
  }
  if (result.first == null) {
    ifFailed(FailedResult(received, result.second))
  } else {
    call.respond(result.first!!)
  }
}

data class FailedResult<T>(
  val original: T,
  val throwable: Throwable?,
)
