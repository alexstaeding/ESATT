package org.bpg20.esatt.common.datastore

import com.google.inject.Inject
import org.bpg20.esatt.common.model.Thesis
import org.bson.types.ObjectId
import java.util.concurrent.CompletableFuture

class ThesisRepository : Repository<ObjectId, Thesis>() {

  @Inject
  private lateinit var departmentRepository: DepartmentRepository

  @Inject
  private lateinit var userRepository: UserRepository

  override val tClass: Class<Thesis> = Thesis::class.java
  override val tKeyClass: Class<ObjectId> = ObjectId::class.java

  private fun Thesis.injectDepartment(): Thesis {
    val department = departmentRepository.getOne(departmentId ?: return this).join()
    if (department != null) {
      departmentName = department.name
    }
    return this
  }

  private fun Thesis.injectSupervisor(): Thesis {
    val supervisor = userRepository.getOne(supervisorId ?: return this).join()
    if (supervisor != null) {
      supervisorFirstName = supervisor.firstName
      supervisorLastName = supervisor.lastName
    }
    return this
  }

  override fun getOne(id: Any): CompletableFuture<Thesis> {
    return super.getOne(id).thenApply { it.injectDepartment().injectSupervisor() }
  }

  override fun getAll(ascending: Boolean?, field: String?, limit: Int?): Sequence<Thesis> {
    return super.getAll(ascending, field, limit)
      // inject department and supervisor data
      .map { it.injectDepartment().injectSupervisor() }
  }
}
