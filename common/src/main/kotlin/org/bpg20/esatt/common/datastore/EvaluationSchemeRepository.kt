package org.bpg20.esatt.common.datastore

import org.bpg20.esatt.common.model.EvaluationScheme
import org.bson.types.ObjectId

class EvaluationSchemeRepository : Repository<ObjectId, EvaluationScheme>() {
  override val tClass: Class<EvaluationScheme> = EvaluationScheme::class.java
  override val tKeyClass: Class<ObjectId> = ObjectId::class.java
}
