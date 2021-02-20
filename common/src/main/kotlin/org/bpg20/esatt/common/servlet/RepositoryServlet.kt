package org.bpg20.esatt.common.servlet

import com.google.inject.Inject
import org.bpg20.esatt.common.datastore.Repository
import org.bpg20.esatt.common.model.ObjectWithId
import org.bpg20.esatt.common.serialization.SerializationService
import java.util.concurrent.CompletableFuture
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

abstract class RepositoryServlet<T : ObjectWithId<*>>(
  private val modelValidation: Validation.Model<T>,
  private val modelClass: Class<T>,
) : HttpServlet() {

  @Inject
  protected lateinit var serializationService: SerializationService

  protected abstract val repository: Repository<*, T>

  /**
   * Maps a [Sequence] of elements to the provided [targetClass][Class] using the provided
   * [serialization function][serFun] and appends it to this [Appendable] as a json array
   */
  fun Appendable.append(seq: Sequence<T>, serFun: (T) -> String) {
    append("[" + seq.map(serFun).joinToString(",") + "]")
  }

  fun Appendable.appendFull(seq: Sequence<T>, serializer: SerializationService.Serializer<T>) {
    append(seq, serializer::toJsonFull)
  }

  fun Appendable.appendPreview(seq: Sequence<T>, serializer: SerializationService.Serializer<T>) {
    append(seq, serializer::toJsonPreview)
  }

  override fun doGet(request: HttpServletRequest, response: HttpServletResponse) {
    response.contentType = "text/json"
    response.addHeader("Access-Control-Allow-Origin", "*")
    val out = response.writer
    val errors = StringBuilder()
    val ascending = Validation.validateAscending(request.getHeader("ascending"), errors)
    val field = modelValidation.validateSortByField(request.getHeader("field"), errors)
    val limit = Validation.validateLimit(request.getHeader("limit"), errors)
    val preview = Validation.validatePreview(request.getHeader("preview"), errors)
    if (
      ascending.second
      || field.second
      || limit.second
      || preview.second
    ) {
      response.status = 400
      out.appendLine(Validation.errorMessage)
      out.append(errors)
      return
    }
    // get the serializer early, don't bother with a db lookup if its not there
    val serializer = serializationService.getSerializer(modelClass, response) ?: return
    val seq = repository.getAll(
      ascending.first,
      field.first,
      limit.first,
    )
    when (preview.first) {
      true -> out.appendPreview(seq, serializer)
      else -> out.appendFull(seq, serializer)
    }
  }

  private fun HttpServletRequest.parseObjectAndThen(
    response: HttpServletResponse,
    dbFun: (T) -> CompletableFuture<T?>,
    validateFun: (T, Appendable?) -> Boolean
  ) {
    val serializer = serializationService.getSerializer(modelClass, response) ?: return
    response.contentType = "text/json"
    response.addHeader("Access-Control-Allow-Origin", "*")
    val obj = serializer.fromJson(reader.readText())
    if (obj == null || !validateFun(obj, response.writer)) {
      response.status = 400
      return
    }
    response.writer.append(serializer.toJsonFull(dbFun(obj).join()))
  }

  override fun doPost(request: HttpServletRequest, response: HttpServletResponse) {
    request.parseObjectAndThen(response, repository::insertOne, modelValidation::validateCreate)
  }

  override fun doPut(request: HttpServletRequest, response: HttpServletResponse) {
    request.parseObjectAndThen(response, repository::updateOne, modelValidation::validateUpdate)
  }
}
