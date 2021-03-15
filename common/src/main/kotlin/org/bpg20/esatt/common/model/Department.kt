package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import dev.morphia.annotations.Field
import dev.morphia.annotations.Index
import dev.morphia.annotations.Indexes
import dev.morphia.utils.IndexType
import kotlinx.serialization.Serializable

@Entity("departments")
@Indexes(
  Index(fields = [Field(value = "$**", type = IndexType.TEXT)]),
)
@Serializable
class Department : ObjectWithId.ObjectWithIntId() {
  var name: String? = null
}
