package org.bpg20.esatt.common.config

import com.google.inject.Inject
import com.google.inject.Singleton
import org.spongepowered.configurate.CommentedConfigurationNode
import org.spongepowered.configurate.loader.ConfigurationLoader

@Singleton
class ConfigManager @Inject constructor(
  private val loader: ConfigurationLoader<CommentedConfigurationNode>,
) {
  var config: Config
  init {
    val rootNode = loader.load()
    if (rootNode.empty()) {
      rootNode.set(Config().apply { config = this })
      loader.save(rootNode)
    } else {
     config = rootNode[Config::class.java]!!
    }
  }
  fun get(): Config = config
}
