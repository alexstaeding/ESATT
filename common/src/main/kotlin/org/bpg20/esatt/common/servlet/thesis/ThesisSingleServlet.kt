package org.bpg20.esatt.common.servlet.thesis

import com.google.inject.Inject
import com.google.inject.Singleton
import org.bpg20.esatt.common.datastore.ThesisRepository
import org.bpg20.esatt.common.model.Thesis
import org.bpg20.esatt.common.servlet.RepositorySingleServlet

@Singleton
class ThesisSingleServlet @Inject constructor(
  override val repository: ThesisRepository
) : RepositorySingleServlet<Thesis>(Thesis::class.java) {
}
