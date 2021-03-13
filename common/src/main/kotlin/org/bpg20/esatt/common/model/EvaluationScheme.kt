package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import org.bson.types.ObjectId

@Entity("evaluationSchemes")
@Indexes(
  Index(fields = [Field(value = "$**", type = IndexType.TEXT)]),
)
@Serializable
class EvaluationScheme : ObjectWithId.ObjectWithObjectId() {
  var name: String? = null
  var description: String? = null
  var criteria: List<Criterion>? = null
}
