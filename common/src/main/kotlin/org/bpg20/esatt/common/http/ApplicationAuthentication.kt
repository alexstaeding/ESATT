package org.bpg20.esatt.common.http

import com.google.inject.Inject
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.auth.ldap.*
import org.bpg20.esatt.common.Config

class ApplicationAuthentication @Inject constructor(
  private val config: Config,
) : Configurable<Application> {
  override fun Application.configure() {
    install(Authentication) {
      basic {
        validate { credential ->
          ldapAuthenticate(
            credential,
            config.ldapConnection!!,
            "uid=%s,ou=system"
          ) {
            UserIdPrincipal(it.name)
          }
        }
      }
    }
  }
}
