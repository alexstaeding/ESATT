/*
 *   ESATT - https://www.github.com/alexstaeding/ESATT
 *   Copyright (C) 2021 Bachelor-Praktikum Gruppe 20
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Lesser General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Lesser General Public License for more details.
 *
 *     You should have received a copy of the GNU Lesser General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package org.bpg20.esatt.common.http

import com.google.inject.Inject
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*
import io.ktor.util.pipeline.*
import org.bpg20.esatt.common.datastore.UserRepository
import org.bpg20.esatt.common.model.User

class AuthenticationRouting @Inject constructor(
  private val userRepository: UserRepository,
) : Configurable<Route> {

  override fun Route.configure() {
    route("/api/v1/current-user") {
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
    val session: LoginSession = checkNotNull(call.sessions.get<LoginSession>()) { "Not authenticated" }
    return userRepository.getOneOrCreateFromUserName(session.userName)
  }
}
