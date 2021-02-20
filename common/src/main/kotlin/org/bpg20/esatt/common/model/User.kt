package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import org.bson.types.ObjectId

@Entity("users")
class User : ObjectWithId<ObjectId>() {
  var userName: String? = null
  var email: String? = null
  var firstName: String? = null
  var lastName: String? = null
}
