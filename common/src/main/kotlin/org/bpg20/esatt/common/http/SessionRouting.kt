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
import io.ktor.auth.*
import io.ktor.auth.ldap.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.sessions.*
import org.bpg20.esatt.common.Config
import org.bpg20.esatt.common.datastore.UserRepository
import org.slf4j.Logger
import java.util.Base64

class SessionRouting @Inject constructor(
  private val config: Config,
  private val logger: Logger,
  private val userRepository: UserRepository,
) : Configurable<Route> {

  override fun Route.configure() {
    route("/api/v1/sign-out") {
      post {
        call.sessions.clear<LoginSession>()
        call.respondText("Signed out", status = HttpStatusCode.OK)
      }
    }
    route("/api/v1/sign-in") {
      post {
        val authorization = call.request.header("Authorization")
          ?: return@post call.respond(HttpStatusCode.BadRequest, LoginStatus.MISSING)
        val parts = authorization.split(" ")
        if (parts.size != 2 || parts[0] != "Basic") {
          return@post call.respondText("Must use Basic auth", status = HttpStatusCode.BadRequest)
        }
        val credentials = String(Base64.getDecoder().decode(parts[1])).split(":")
        if (credentials.size != 2) {
          return@post call.respondText(
            "Credentials not in correct format Base64('username':'password')",
            status = HttpStatusCode.BadRequest
          )
        }

        val userName = credentials[0]
        val password = credentials[1]


        val principal = ldapAuthenticate(
          UserPasswordCredential(userName, password),
          config.ldapConnection!!,
          config.ldapUserDNFormat!!
        ) {
          logger.info("Successful login (LDAP) for $userName @ ${call.request.origin.remoteHost}")
          userRepository.getOneOrCreateFromUserName(it.name, linkLDAP = true)
          UserIdPrincipal(it.name)
        }
        if (principal == null) {
          logger.info("Failed login (LDAP) for $userName @ ${call.request.origin.remoteHost}")
          return@post call.respond(HttpStatusCode.BadRequest, LoginStatus.INVALID)
        }

        call.sessions.set("LOGIN_SESSION", LoginSession(principal.name))
        call.respond(HttpStatusCode.OK, LoginStatus.SUCCESS)
      }
    }
  }

  private enum class LoginStatus {
    SUCCESS,
    MISSING,
    INVALID,
  }
}
