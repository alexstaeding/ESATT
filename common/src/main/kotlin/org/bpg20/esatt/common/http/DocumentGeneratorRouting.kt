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
import com.google.inject.Singleton
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.pipeline.*
import org.bpg20.esatt.common.datastore.*
import org.bpg20.esatt.common.model.GeneratedDocuments
import java.io.File

@Singleton
class DocumentGeneratorRouting @Inject constructor(
  private val documentTemplateRepository: DocumentTemplateRepository
) : Configurable<Route> {
  private var counter: Int = 0

  override fun Route.configure() {
    route("/api/v1/generate-documents") {
      get {
        val errors = StringBuilder(Validation.errorMessage)
        val id = Validation.requireId(call.request.header("id"), errors)
          ?: return@get call.respondText(errors.toString(), status = HttpStatusCode.BadRequest)
        val parsedId = try {
          with(documentTemplateRepository) { id.asTKey() }
        } catch (e: IllegalArgumentException) {
          return@get call.respondText("Invalid id: ${e.message}", status = HttpStatusCode.BadRequest)
        }
        val documentTemplate = try {
          documentTemplateRepository.getOne(parsedId)
        } catch (e: Throwable) {
          return@get call.respondText(
            "Failed to get document with id $id: ${e.message}",
            status = HttpStatusCode.InternalServerError,
          )
        }
        if (documentTemplate == null) {
          return@get call.respondText("No document with id $id", status = HttpStatusCode.NotFound)
        }
        val texTemplate = documentTemplate.texTemplate ?: return@get call.respondText(
          "Document with id $id has no template",
          status = HttpStatusCode.NotFound
        )
        val placeholders = documentTemplate.placeholders ?: emptyList()
        val placeholderValidation = mutableListOf<Boolean>()
        val mappedPlaceholders: MutableMap<String, String> = mutableMapOf()

        for (placeholder in placeholders) {
          placeholderValidation.add(Validation.validateString(placeholder, call.request.header(placeholder), errors))
        }

        for (potentialError in placeholderValidation) {
          if (potentialError) {
            return@get call.respondText(errors.toString(), status = HttpStatusCode.BadRequest)
          }
        }

        for (placeholder in placeholders) {
          mappedPlaceholders[placeholder] = call.request.header(placeholder)!!
        }

        val generatedDocuments = convertTexToPdf(texTemplate, mappedPlaceholders)
          ?: return@get call.respondText("Generating document did fail.", status = HttpStatusCode.InternalServerError)

        call.respond(generatedDocuments)
      }
    }
  }

  private fun convertTexToPdf(texTemplate: String, mappedPlaceHolders: MutableMap<String, String>): GeneratedDocuments? {
    val pathAndName = replacePlaceholders(texTemplate, mappedPlaceHolders)
    val texPath = pathAndName.first
    val texFileName = pathAndName.second
    val outputPath = "generated-documents"
    val pdfFileName = texFileName.replace(".tex", ".pdf")
    val convertLatex = Runtime.getRuntime().exec("pdflatex -output-directory $outputPath $texPath")
    convertLatex.inputStream.bufferedReader().use {
      it.readLines()
    }
    return GeneratedDocuments(pdfFileName, texFileName)
  }

  private fun replacePlaceholders(texTemplate: String, mappedPlaceHolders: MutableMap<String, String>): Pair<String, String> {
    var finalTexTemplate = texTemplate
    for ((placeholder, value) in mappedPlaceHolders) {
      finalTexTemplate = finalTexTemplate.replace("@$placeholder@", value)
    }
    val fileName = "LatexFile${counter++}.tex"
    val path = "generated-documents/$fileName"
    File(path).writeText(finalTexTemplate)
    return Pair(path, fileName)
  }
}
