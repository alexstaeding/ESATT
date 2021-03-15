package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import dev.morphia.annotations.Field
import dev.morphia.annotations.Index
import dev.morphia.annotations.Indexes
import dev.morphia.utils.IndexType
import kotlinx.serialization.Serializable

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
