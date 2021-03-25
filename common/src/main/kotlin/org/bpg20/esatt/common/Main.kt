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

package org.bpg20.esatt.common

import com.google.inject.Guice
import com.google.inject.Injector
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.features.*
import io.ktor.http.content.*
import io.ktor.routing.*
import io.ktor.serialization.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.sessions.*
import kotlinx.serialization.json.Json
import org.bpg20.esatt.common.http.*
import org.slf4j.LoggerFactory
import java.io.File

fun main(args: Array<String>) {
  val logger = LoggerFactory.getLogger("ESATT")
  logger.info("Starting initialization")
  val injector = Guice.createInjector(ESATTModule(logger))
  val config = injector.getInstance(Config::class.java)
  val server = embeddedServer(
    Netty,
    port = config.webPort!!,
    host = config.webHost!!,
  ) {
    module(injector)
  }.start()
  Runtime.getRuntime().addShutdownHook(Thread {
    logger.info("Shutting down...")
    server.stop(500, 1000)
  })
}

fun Application.module(injector: Injector) {
  install(ContentNegotiation) {
    json(
      Json {
        encodeDefaults = false
        ignoreUnknownKeys = true
      }
    )
  }
  val config = injector.getInstance(Config::class.java)
  val authenticationOptional = config.authentication != "ldap"
  install(Sessions) {
    cookie<LoginSession>("LOGIN_SESSION", directorySessionStorage(File(".sessions"), cached = false))
  }
  configure<Application, ApplicationAuthentication>(injector)
  install(SinglePageApplication) {
    folderPath = "static/ESATT"
    ignoreIfContains = Regex("^/api.*$")
  }
  routing {
    configure<Route, SessionRouting>(injector)
    authenticate(optional = authenticationOptional) {
      static("/generated-documents/") {
        files("generated-documents")
      }
      configure<Route, ApplicationRouting>(injector)
      configure<Route, AuthenticationRouting>(injector)
      configure<Route, DocumentGeneratorRouting>(injector)
    }
  }
}

inline fun <reified R, reified T : Configurable<R>> R.configure(injector: Injector) {
  with(injector.getInstance(T::class.java)) {
    configure()
  }
}
