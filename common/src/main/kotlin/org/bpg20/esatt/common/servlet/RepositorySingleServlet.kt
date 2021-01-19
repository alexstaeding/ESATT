package org.bpg20.esatt.common.servlet

import com.google.inject.Inject
import org.bpg20.esatt.common.datastore.Repository
import org.bpg20.esatt.common.model.ObjectWithId
import org.bpg20.esatt.common.serialization.SerializationService
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

abstract class RepositorySingleServlet<T : ObjectWithId<*>>(
  private val modelClass: Class<T>,
) : HttpServlet() {

  @Inject
  protected lateinit var serializationService: SerializationService

  protected abstract val repository: Repository<*, T>

  override fun doGet(request: HttpServletRequest, response: HttpServletResponse) {
    response.contentType = "text/json"
    response.addHeader("Access-Control-Allow-Origin", "*")
    val out = response.writer
    val errors = StringBuilder()
    val id = Validation.requireId(request.pathInfo.substring(1), errors)
    if (id == null) {
      response.status = 400
      out.appendLine(Validation.errorMessage)
      out.append(errors)
      return
    }
    // get the serializer early, don't bother with a db lookup if its not there
    val serializer = serializationService.getSerializer(modelClass, response) ?: return
    val one = repository.getOne(id).join()
    if (one == null) {
      response.status = 404
      out.appendLine(Validation.errorMessage)
      out.appendLine("Could not find ${modelClass.simpleName} with id $id")
      return
    }
    out.append(serializer.toJsonFull(one))
  }
}
