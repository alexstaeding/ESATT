package org.bpg20.esatt.common

import org.spongepowered.configurate.objectmapping.ConfigSerializable
import org.spongepowered.configurate.objectmapping.meta.Comment

@ConfigSerializable
class Config {

  @Comment("Authentication to use. Options: [none, ldap]")
  var authentication: String? = "none"

  @Comment("The LDAP connection string")
  var ldapConnection: String? = "ldap://ldap.forumsys.com:389"

  @Comment("The LDAP userDNFormat")
  var ldapUserDNFormat: String? = "uid=%s,dc=example,dc=com"

  @Comment("The MongoDB connection string")
  var mongodbConnection: String? = "mongodb://localhost:27017"
}
