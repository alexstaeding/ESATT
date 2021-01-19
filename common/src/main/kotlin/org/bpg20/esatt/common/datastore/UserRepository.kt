package org.bpg20.esatt.common.datastore

import org.bpg20.esatt.common.model.User
import org.bson.types.ObjectId

class UserRepository : Repository<ObjectId, User>() {
  override val tClass: Class<User> = User::class.java
  override val tKeyClass: Class<ObjectId> = ObjectId::class.java
}
