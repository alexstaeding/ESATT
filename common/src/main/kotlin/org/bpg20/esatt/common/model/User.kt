package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import dev.morphia.annotations.Field
import dev.morphia.annotations.Index
import dev.morphia.annotations.Indexes
import dev.morphia.utils.IndexType
import org.bson.types.ObjectId

@Entity("users")
@Indexes(
  Index(fields = [Field(value = "$**", type = IndexType.TEXT)]),
)
@Serializable
class User : ObjectWithId.ObjectWithObjectId() {
  var userName: String? = null
  var email: String? = null
  var firstName: String? = null
  var lastName: String? = null
}
