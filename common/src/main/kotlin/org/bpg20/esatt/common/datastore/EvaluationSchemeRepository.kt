package org.bpg20.esatt.common.datastore

import org.bpg20.esatt.common.model.EvaluationScheme
import org.bson.types.ObjectId

class EvaluationSchemeRepository : ObjectIdRepository<EvaluationScheme>() {
  override val tClass: Class<EvaluationScheme> = EvaluationScheme::class.java
}
