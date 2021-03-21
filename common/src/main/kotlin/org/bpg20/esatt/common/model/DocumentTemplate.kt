package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import kotlinx.serialization.Serializable

@Entity("templates")
@Serializable
class DocumentTemplate : ObjectWithId.ObjectWithObjectId() {
  var name: String? = null
  var texTemplate: String? = null
  var placeholders: List<String>? = null
}
