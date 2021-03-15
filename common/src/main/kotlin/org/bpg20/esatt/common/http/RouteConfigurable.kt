package org.bpg20.esatt.common.http

import io.ktor.routing.*

interface RouteConfigurable {
  fun Route.configure()
}
