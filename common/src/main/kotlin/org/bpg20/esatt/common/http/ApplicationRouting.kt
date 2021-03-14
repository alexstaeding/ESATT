package org.bpg20.esatt.common.http

import com.google.inject.Inject
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import org.bpg20.esatt.common.datastore.DepartmentRepository
import org.bpg20.esatt.common.datastore.EvaluationSchemeRepository
import org.bpg20.esatt.common.datastore.Repository
import org.bpg20.esatt.common.datastore.ThesisRepository
import org.bpg20.esatt.common.datastore.UserRepository
import org.bpg20.esatt.common.model.ObjectWithId

class ApplicationRouting @Inject constructor(
  private val departmentRepository: DepartmentRepository,
  private val evaluationSchemeRepository: EvaluationSchemeRepository,
  private val thesisRepository: ThesisRepository,
  private val userRepository: UserRepository,
) {
  fun Route.configure() {
    route("/api/v1/departments") {
      configureRepository(departmentRepository, Validation.DepartmentValidation)
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
    if (ascending.second
      || field.second
      || limit.second
      || preview.second
    ) {
      return@get call.respondText(errors.toString(), status = HttpStatusCode.BadRequest)
    }
    call.respond(
      repository.getAll(
        ascending.first,
        field.first,
        limit.first,
        preview.first,
      ).toList()
    )
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
    val document = repository.getOne(parsedId)
      ?: return@get call.respondText("No document with id $id", status = HttpStatusCode.NotFound)
    call.respond(document)
  }
  post {
    val received = try {
      call.receive<T>()
    } catch (e: Throwable) {
      return@post call.respondText(e.message ?: "An error occurred", status = HttpStatusCode.BadRequest)
    }
    val document = repository.insertOne(received)
      ?: return@post call.respondText("Failed to insert document", status = HttpStatusCode.InternalServerError)
    call.respond(document)
  }
  put {
    val received = try {
      call.receive<T>()
    } catch (e: Throwable) {
      return@put call.respondText(e.message ?: "An error occurred", status = HttpStatusCode.BadRequest)
    }
    val document = repository.updateOne(received)
      ?: return@put call.respondText("Failed to update document", status = HttpStatusCode.InternalServerError)
    call.respond(document)
  }
}


