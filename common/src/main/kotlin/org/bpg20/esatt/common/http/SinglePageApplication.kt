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

import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.*
import io.ktor.util.pipeline.*
import java.io.File
import java.io.FileNotFoundException
import java.nio.file.Path
import java.nio.file.Paths

/**
 * Original source: https://github.com/lamba92/ktor-spa
 * Modified for authentication support
 *
 * The SPA configuration class.
 * @param configuration The object configured by the install lambda.
 */
class SinglePageApplication(private val configuration: Configuration) {
  companion object Feature : ApplicationFeature<Application, Configuration, SinglePageApplication> {

    override val key = AttributeKey<SinglePageApplication>("SinglePageApplication")

    override fun install(
      pipeline: Application,
      configure: Configuration.() -> Unit
    ): SinglePageApplication {
      val feature = SinglePageApplication(Configuration().apply(configure))
      pipeline.routing {
        feature.configuration.authConfiguration.apply {
          if (this == null) {
            routeStatic(feature.configuration)
          } else {
            authenticate(*configurations, optional = optional) {
              routeStatic(feature.configuration)
            }
          }
        }
      }
      pipeline.intercept(ApplicationCallPipeline.Fallback) {
        if (call.response.status() == null) {
          call.respond(HttpStatusCodeContent(HttpStatusCode.NotFound))
          finish()
        }
      }
      pipeline.sendPipeline.intercept(ApplicationSendPipeline.Before) { message ->
        feature.intercept(this, message)
      }
      return feature
    }

    private fun Route.routeStatic(configuration: Configuration) {
      static(configuration.spaRoute) {
        if (configuration.useFiles)
          files(configuration.folderPath)
        else
          resources(configuration.folderPath)
      }
    }
  }

  private suspend fun intercept(
    pipelineContext: PipelineContext<Any, ApplicationCall>,
    message: Any
  ) = with(pipelineContext) context@{

    val requestUrl = call.request.uri
    val regex = configuration.ignoreIfContains
    val stop by lazy {
      !((regex == null || !requestUrl.contains(regex))
        && (requestUrl.startsWith(configuration.spaRoute)
        || requestUrl.startsWith("/${configuration.spaRoute}")))
    }
    val is404 by lazy {
      when (message) {
        is HttpStatusCode -> message == HttpStatusCode.NotFound
        is HttpStatusCodeContent -> message.status == HttpStatusCode.NotFound
        else -> false
      }
    }
    val acceptsHtml by lazy {
      call.request.acceptItems().any {
        ContentType.Text.Html.match(it.value)
      }
    }

    if (call.attributes.contains(StatusPages.key) || stop || !is404 || !acceptsHtml)
      return@context

    call.attributes.put(key, this@SinglePageApplication)

    if (configuration.useFiles) {
      val file = configuration.fullPath().toFile()
      if (!file.exists()) throw FileNotFoundException("${configuration.fullPath()} not found")
      call.respondFile(File(configuration.folderPath), configuration.defaultPage)
    } else {
      val indexPageApplication = call.resolveResource(configuration.fullPath().toString())
        ?: throw FileNotFoundException("${configuration.fullPath()} not found")
      call.respond(indexPageApplication)
    }
    finish()
  }

  data class Configuration(
    var spaRoute: String = "",
    var useFiles: Boolean = false,
    var folderPath: String = "",
    var defaultPage: String = "index.html",
    var ignoreIfContains: Regex? = null,
    var authConfiguration: AuthConfiguration? = null,
  ) {
    fun fullPath(): Path = Paths.get(folderPath, defaultPage)
  }

  class AuthConfiguration(
    vararg var configurations: String? = arrayOf(null),
    var optional: Boolean = false,
  )
}
