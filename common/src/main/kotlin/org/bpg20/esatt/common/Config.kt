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

import org.spongepowered.configurate.objectmapping.ConfigSerializable
import org.spongepowered.configurate.objectmapping.meta.Comment

@ConfigSerializable
class Config {

  @Comment("Authentication to use. Options: [none, ldap]")
  var authentication: String? = "none"

  @Comment("The LDAP connection string")
  var ldapConnection: String? = "ldap://localhost:389"

  @Comment("The LDAP userDNFormat")
  var ldapUserDNFormat: String? = "uid=%s,dc=example,dc=com"

  @Comment("The MongoDB connection string")
  var mongodbConnection: String? = "mongodb://localhost:27017"

  @Comment("The hostname to use for the webserver. Default 0.0.0.0 (any)")
  var webHost: String? = "0.0.0.0"

  @Comment("The port to use for the webserver. Default 80")
  var webPort: Int? = 80
}
