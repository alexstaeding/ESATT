package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import org.bson.types.ObjectId

@Entity("evaluationSchemes")
class EvaluationScheme : ObjectWithId<ObjectId>() {
  var name: String? = null
  var departmentId: Int? = null
  var description: String? = null
  var criteria: List<Criterion>? = null
}
