package org.bpg20.esatt.common

import com.google.inject.Guice
import com.google.inject.Injector
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.features.*
import io.ktor.routing.*
import io.ktor.serialization.*
import io.ktor.server.netty.*
import kotlinx.serialization.json.Json
import org.bpg20.esatt.common.http.ApplicationAuthentication
import org.bpg20.esatt.common.http.ApplicationRouting
import org.bpg20.esatt.common.http.AuthenticationRouting
import org.bpg20.esatt.common.http.Configurable
import org.bpg20.esatt.common.http.SinglePageApplication
import org.slf4j.LoggerFactory

fun main(args: Array<String>) = EngineMain.main(args)

@Suppress("unused")
fun Application.module() {
  install(ContentNegotiation) {
    json(
      Json {
        encodeDefaults = false
      }
    )
  }
  val logger = LoggerFactory.getLogger("ESATT")
  logger.info("Starting initialization")
  val injector = Guice.createInjector(ESATTModule(logger))
  val config = injector.getInstance(Config::class.java)
  val authenticationOptional = config.authentication != "ldap"
  configure<Application, ApplicationAuthentication>(injector)
  install(SinglePageApplication) {
    folderPath = "static/ESATT"
    ignoreIfContains = Regex("^/api.*$")
    authConfiguration = SinglePageApplication.AuthConfiguration(optional = authenticationOptional)
  }
  routing {
    authenticate(optional = authenticationOptional) {
      configure<Route, ApplicationRouting>(injector)
      configure<Route, AuthenticationRouting>(injector)
    }
  }
}

inline fun <reified R, reified T : Configurable<R>> R.configure(injector: Injector) {
  with(injector.getInstance(T::class.java)) {
    configure()
  }
}
