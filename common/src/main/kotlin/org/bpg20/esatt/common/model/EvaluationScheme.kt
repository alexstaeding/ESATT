package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import kotlinx.serialization.Serializable
import org.bson.types.ObjectId

@Entity("evaluationSchemes")
@Serializable
class EvaluationScheme : ObjectWithId.ObjectWithObjectId() {
  var name: String? = null
  var description: String? = null
  var criteria: List<Criterion>? = null
}
