package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import kotlinx.serialization.Serializable
import org.bson.types.ObjectId

@Entity("users")
@Serializable
class User : ObjectWithId.ObjectWithObjectId() {
  var userName: String? = null
  var email: String? = null
  var firstName: String? = null
  var lastName: String? = null
}
