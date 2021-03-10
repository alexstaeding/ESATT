package org.bpg20.esatt.common

import com.google.inject.AbstractModule
import com.google.inject.TypeLiteral
import org.slf4j.Logger
import org.spongepowered.configurate.CommentedConfigurationNode
import org.spongepowered.configurate.hocon.HoconConfigurationLoader
import org.spongepowered.configurate.loader.ConfigurationLoader
import java.nio.file.Paths

class ESATTModule(
  private val logger: Logger,
) : AbstractModule() {
  override fun configure() {
    bind(Logger::class.java).toInstance(logger)
    bind(object : TypeLiteral<ConfigurationLoader<CommentedConfigurationNode>>() {}).toInstance(
      HoconConfigurationLoader.builder().path(Paths.get("./esatt.conf")).build()
    )
  }
}
