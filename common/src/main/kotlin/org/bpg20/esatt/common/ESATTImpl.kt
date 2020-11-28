package org.bpg20.esatt.common

import com.google.inject.Inject
import com.google.inject.Singleton
import com.google.inject.servlet.GuiceFilter
import org.bpg20.esatt.api.ESATT
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.servlet.DefaultServlet
import org.eclipse.jetty.servlet.ServletContextHandler
import org.slf4j.Logger
import java.util.EnumSet
import java.util.Scanner
import javax.servlet.DispatcherType

@Singleton
class ESATTImpl : ESATT {

  @Inject
  private lateinit var logger: Logger

  override fun start() {
    val server = Server(8008)
    val servletContextHandler = ServletContextHandler(server, "/")
    servletContextHandler.addFilter(GuiceFilter::class.java, "/*", EnumSet.allOf(DispatcherType::class.java))
    servletContextHandler.addServlet(DefaultServlet::class.java, "/")
    logger.info("Starting jetty")
    server.start()
    server.stopAtShutdown = true
    val scanner = Scanner(System.`in`)
    logger.info("Server started: listening at ${server.uri}")
    logger.info("Awaiting input...")
    while (server.isRunning) {
      when (scanner.nextLine()) {
        "exit", "quit" -> server.stop()
        else -> logger.error("Invalid input. Options: exit, quit")
      }
    }
  }
}
