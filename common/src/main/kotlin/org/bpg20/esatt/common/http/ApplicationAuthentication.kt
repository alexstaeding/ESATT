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

package org.bpg20.esatt.common.http

import com.google.inject.Inject
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.auth.ldap.*
import org.bpg20.esatt.common.Config
import org.bpg20.esatt.common.datastore.UserRepository

class ApplicationAuthentication @Inject constructor(
  private val config: Config,
  private val userRepository: UserRepository,
) : Configurable<Application> {
  override fun Application.configure() {
    install(Authentication) {
      basic {
        validate { credential ->
          ldapAuthenticate(
            credential,
            config.ldapConnection!!,
            config.ldapUserDNFormat!!
          ) {
            userRepository.getOneOrCreateFromUserName(it.name, linkLDAP = true)
            UserIdPrincipal(it.name)
          }
        }
      }
    }
  }
}
