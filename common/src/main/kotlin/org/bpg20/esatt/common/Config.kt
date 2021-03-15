package org.bpg20.esatt.common

import org.spongepowered.configurate.objectmapping.ConfigSerializable
import org.spongepowered.configurate.objectmapping.meta.Comment
import org.spongepowered.configurate.objectmapping.meta.Setting

@ConfigSerializable
class Config {

  @Comment("The MongoDB connection string")
  var mongodbConnection: String? = "mongodb://localhost:27017"
}
