package org.bpg20.esatt.common.datastore

import dev.morphia.query.Projection
import org.bpg20.esatt.common.model.EvaluationScheme

class EvaluationSchemeRepository : ObjectIdRepository<EvaluationScheme>() {
  override val tClass: Class<EvaluationScheme> = EvaluationScheme::class.java

  override fun Projection.preview() {
    exclude(
      EvaluationScheme::criteria.name,
    )
  }
}
