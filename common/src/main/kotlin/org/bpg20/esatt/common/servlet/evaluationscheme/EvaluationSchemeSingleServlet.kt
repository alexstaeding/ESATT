package org.bpg20.esatt.common.servlet.evaluationscheme

import com.google.inject.Inject
import com.google.inject.Singleton
import org.bpg20.esatt.common.datastore.EvaluationSchemeRepository
import org.bpg20.esatt.common.model.EvaluationScheme
import org.bpg20.esatt.common.servlet.RepositorySingleServlet

@Singleton
class EvaluationSchemeSingleServlet @Inject constructor(
  override val repository: EvaluationSchemeRepository,
) : RepositorySingleServlet<EvaluationScheme>(EvaluationScheme::class.java) {
}
