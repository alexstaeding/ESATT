package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity

@Entity("departments")
class Department : ObjectWithId<Int>() {
  var name: String? = null
}
