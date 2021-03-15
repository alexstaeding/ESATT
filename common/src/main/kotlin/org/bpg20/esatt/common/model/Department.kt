package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import kotlinx.serialization.Serializable

@Entity("departments")
@Serializable
class Department : ObjectWithId.ObjectWithIntId() {
  var name: String? = null
}
