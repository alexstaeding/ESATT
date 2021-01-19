package org.bpg20.esatt.common.datastore

import org.bpg20.esatt.common.model.Department

class DepartmentRepository : Repository<Int, Department>() {
  override val tClass: Class<Department> = Department::class.java
  override val tKeyClass: Class<Int> = Int::class.java
}
