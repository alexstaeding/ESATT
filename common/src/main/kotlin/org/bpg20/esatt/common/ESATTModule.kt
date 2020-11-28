package org.bpg20.esatt.common

import com.google.inject.AbstractModule
import org.bpg20.esatt.api.ESATT
import org.slf4j.Logger

class ESATTModule(
  private val logger: Logger,
) : AbstractModule() {
  override fun configure() {
    bind(ESATT::class.java).to(ESATTImpl::class.java)
    bind(Logger::class.java).toInstance(logger)
  }
}
