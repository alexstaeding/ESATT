/*
 *   ESATT - https://www.github.com/alexstaeding/ESATT
 *   Copyright (C) 2021 Bachelor-Praktikum Gruppe 20
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Lesser General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Lesser General Public License for more details.
 *
 *     You should have received a copy of the GNU Lesser General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
