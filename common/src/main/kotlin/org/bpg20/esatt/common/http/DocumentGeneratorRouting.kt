package org.bpg20.esatt.common.http

import com.google.inject.Inject
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.pipeline.*
import org.bpg20.esatt.common.datastore.*
import org.bpg20.esatt.common.model.GeneratedDocuments
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader

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
    val inputSR = InputStreamReader(convertLatex.inputStream)
    val buffReader = BufferedReader(inputSR)
    for (l in buffReader.readLines()) {
      println(l)
    }
    buffReader.close()
    inputSR.close()
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
