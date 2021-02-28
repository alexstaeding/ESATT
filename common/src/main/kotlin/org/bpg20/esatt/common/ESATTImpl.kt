package org.bpg20.esatt.common

import com.google.inject.Inject
import com.google.inject.Singleton
import com.google.inject.servlet.GuiceFilter
import org.bpg20.esatt.api.ESATT
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.server.handler.ResourceHandler
import org.eclipse.jetty.servlet.DefaultServlet
import org.eclipse.jetty.servlet.ServletContextHandler
import org.eclipse.jetty.util.resource.Resource
import org.slf4j.Logger
import java.util.EnumSet
import javax.servlet.DispatcherType

@Singleton
class ESATTImpl : ESATT {

  @Inject
  private lateinit var logger: Logger

  override fun start() {
    val server = Server(8008)

    val servletContextHandler = ServletContextHandler()
    servletContextHandler.addFilter(GuiceFilter::class.java, "/api/*", EnumSet.allOf(DispatcherType::class.java))
    servletContextHandler.addServlet(DefaultServlet::class.java, "/*")

    val resourceHandler = ResourceHandler()
    val staticFiles = javaClass.classLoader.getResource("static/ESATT")
    logger.info("Loading static files from $staticFiles")
    resourceHandler.baseResource = Resource.newResource(staticFiles)
    resourceHandler.isDirAllowed = true
    servletContextHandler.insertHandler(resourceHandler)

    server.handler = servletContextHandler
    logger.info("Starting jetty")
    server.start()
    server.stopAtShutdown = true
    logger.info("Server started: listening at ${server.uri}")
    server.join()
  }
}
