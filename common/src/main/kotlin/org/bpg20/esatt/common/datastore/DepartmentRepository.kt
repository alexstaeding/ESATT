package org.bpg20.esatt.common.datastore

import org.bpg20.esatt.common.model.Department

class DepartmentRepository : IntIdRepository<Department>() {
  override val tClass: Class<Department> = Department::class.java
}
