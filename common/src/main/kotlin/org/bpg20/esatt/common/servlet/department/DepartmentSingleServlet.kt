package org.bpg20.esatt.common.servlet.department

import com.google.inject.Inject
import com.google.inject.Singleton
import org.bpg20.esatt.common.datastore.DepartmentRepository
import org.bpg20.esatt.common.model.Department
import org.bpg20.esatt.common.servlet.RepositorySingleServlet

@Singleton
class DepartmentSingleServlet @Inject constructor(
  override val repository: DepartmentRepository
) : RepositorySingleServlet<Department>(Department::class.java) {
}
