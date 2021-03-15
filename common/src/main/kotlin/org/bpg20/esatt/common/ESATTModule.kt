package org.bpg20.esatt.common

import com.google.inject.AbstractModule
import org.slf4j.Logger

class ESATTModule(
  private val logger: Logger,
) : AbstractModule() {
  override fun configure() {
    bind(Logger::class.java).toInstance(logger)
  }
}
