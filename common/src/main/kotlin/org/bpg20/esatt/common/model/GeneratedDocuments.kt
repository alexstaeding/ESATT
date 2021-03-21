package org.bpg20.esatt.common.model

import kotlinx.serialization.Serializable

@Serializable
data class GeneratedDocuments (
  var pdfFileName: String,
  var texFileName: String,
)
