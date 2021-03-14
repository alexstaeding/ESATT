package org.bpg20.esatt.common

import com.google.inject.Guice
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.routing.*
import io.ktor.serialization.*
import io.ktor.server.netty.*
import org.bpg20.esatt.common.http.ApplicationRouting
import org.slf4j.LoggerFactory

fun main(args: Array<String>) = EngineMain.main(args)

@Suppress("unused")
fun Application.module() {
  install(ContentNegotiation) {
    json()
  }
  val logger = LoggerFactory.getLogger("ESATT")
  logger.info("Starting initialization")
  val injector = Guice.createInjector(ESATTModule(logger))
  routing {
    /*
    static("/") {
      preCompressed {
        files("static/ESATT")
      }
    }
    */
    with(injector.getInstance(ApplicationRouting::class.java)) {
      configure()
    }
  }
}
