package org.bpg20.esatt.common.http

import com.google.inject.Inject
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.pipeline.*
import org.bpg20.esatt.common.datastore.UserRepository
import org.bpg20.esatt.common.model.User

class AuthenticationRouting @Inject constructor(
  private val userRepository: UserRepository,
) : Configurable<Route> {

  override fun Route.configure() {
    route("/api/v1/currentUser") {
      get {
        val user: User = try {
          interceptUser()
        } catch (e: Throwable) {
          return@get call.respondText(
            "Unable to get current user: ${e.message}",
            status = HttpStatusCode.InternalServerError,
          )
        }
        call.respond(user)
      }
    }
  }

  private fun PipelineContext<Unit, ApplicationCall>.interceptUser(): User {
    val userPrincipal: UserIdPrincipal = checkNotNull(call.authentication.principal()) { "Not authenticated" }
    return userRepository.getOneOrCreateFromUserName(userPrincipal.name)
  }
}
