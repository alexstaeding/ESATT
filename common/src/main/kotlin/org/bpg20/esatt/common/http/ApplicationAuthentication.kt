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
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.sessions.*
import org.bpg20.esatt.common.Config
import org.slf4j.Logger

class ApplicationAuthentication @Inject constructor(
  private val config: Config,
  private val logger: Logger,
) : Configurable<Application> {

  override fun Application.configure() {
    install(Authentication) {
      session<LoginSession> {
        challenge {
          if (call.sessions.get<LoginSession>() == null) {
            logger.info("Challenging user")
            call.respond(HttpStatusCode.Unauthorized, "/sign-in")
          }
        }
        validate { null }
      }
    }
  }
}
