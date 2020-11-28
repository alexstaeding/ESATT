package org.bpg20.esatt.common

import com.google.inject.Guice
import org.bpg20.esatt.api.ESATT
import org.bpg20.esatt.common.servlet.CommonServletModule
import org.slf4j.LoggerFactory

fun main(args: Array<String>) {
  val logger = LoggerFactory.getLogger("ESATT")
  logger.info("Starting initialization")
  val injector = Guice.createInjector(
    CommonServletModule(),
    ESATTModule(logger)
  )
  injector.getInstance(ESATT::class.java).start()
}
