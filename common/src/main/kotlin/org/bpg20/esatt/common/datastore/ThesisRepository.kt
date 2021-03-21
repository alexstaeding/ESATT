package org.bpg20.esatt.common.datastore

import com.google.inject.Inject
import dev.morphia.query.Projection
import org.bpg20.esatt.common.model.Thesis

class ThesisRepository : ObjectIdRepository<Thesis>() {

  @Inject
  private lateinit var departmentRepository: DepartmentRepository

  @Inject
  private lateinit var userRepository: UserRepository

  override val tClass: Class<Thesis> = Thesis::class.java

  override fun Projection.preview() {
    exclude(
      Thesis::notes.name,
    )
  }

  private fun Thesis.injectDepartment() {
    departmentRepository.getOne(departmentId ?: return)?.apply {
      departmentName = name
    }
  }

  private fun Thesis.injectSupervisor() {
    userRepository.getOne(supervisorId ?: return)?.apply {
      supervisorFirstName = firstName
      supervisorLastName = lastName
    }
  }

  private fun Thesis.injectCoSupervisor() {
    userRepository.getOne(coSupervisorId ?: return)?.apply {
      coSupervisorFirstName = firstName
      coSupervisorLastName = lastName
    }
  }

  private fun Thesis.injectAll() {
    injectDepartment()
    injectSupervisor()
    injectCoSupervisor()
  }

  override fun getOne(id: Any): Thesis? {
    return super.getOne(id)?.apply { injectAll() }
  }

  override fun getAll(ascending: Boolean?, field: String?, limit: Int?, preview: Boolean?, search: String?): Sequence<Thesis> {
    return super.getAll(ascending, field, limit, preview, search).map { it.apply { injectAll() } }
  }
}
