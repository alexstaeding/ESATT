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
