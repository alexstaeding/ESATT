package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import kotlinx.serialization.SerialInfo
import kotlinx.serialization.Serializable
import org.bson.types.ObjectId

@Entity("templates")
@Serializable
class DocumentTemplate : ObjectWithId.ObjectWithObjectId() {
  var name: String? = null
  var texTemplate: String? = null
  var placeholders: List<String>? = null
}