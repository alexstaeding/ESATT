package org.bpg20.esatt.common

import com.google.inject.AbstractModule
import org.slf4j.Logger
import org.spongepowered.configurate.hocon.HoconConfigurationLoader
import java.nio.file.Paths

class ESATTModule(
  private val logger: Logger,
) : AbstractModule() {
  override fun configure() {
    bind(Logger::class.java).toInstance(logger)
    val loader = HoconConfigurationLoader.builder().path(Paths.get("./esatt.conf")).build()
    val rootNode = loader.load()
    val config: Config
    if (rootNode.empty()) {
      rootNode.set(Config().apply { config = this })
      loader.save(rootNode)
    } else {
      config = rootNode[Config::class.java]!!
    }
    bind(Config::class.java).toInstance(config)
  }
}
