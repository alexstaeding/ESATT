package org.bpg20.esatt.common.servlet.evaluationscheme

import com.google.inject.Inject
import com.google.inject.Singleton
import org.bpg20.esatt.common.datastore.EvaluationSchemeRepository
import org.bpg20.esatt.common.model.EvaluationScheme
import org.bpg20.esatt.common.servlet.RepositoryServlet
import org.bpg20.esatt.common.servlet.Validation

@Singleton
class EvaluationSchemeServlet @Inject constructor(
  override val repository: EvaluationSchemeRepository
) : RepositoryServlet<EvaluationScheme>(Validation.EvaluationSchemeValidation, EvaluationScheme::class.java) {
}
