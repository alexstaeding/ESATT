package org.bpg20.esatt.common.servlet.department

import com.google.inject.Inject
import com.google.inject.Singleton
import org.bpg20.esatt.common.datastore.DepartmentRepository
import org.bpg20.esatt.common.model.Department
import org.bpg20.esatt.common.servlet.RepositoryServlet
import org.bpg20.esatt.common.servlet.Validation

@Singleton
class DepartmentServlet @Inject constructor(
  override val repository: DepartmentRepository,
) : RepositoryServlet<Department>(Validation.DepartmentValidation, Department::class.java) {
}
