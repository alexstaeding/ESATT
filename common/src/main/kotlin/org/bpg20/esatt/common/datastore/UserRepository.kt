package org.bpg20.esatt.common.datastore

import dev.morphia.query.experimental.filters.Filters
import org.bpg20.esatt.common.model.User

class UserRepository : ObjectIdRepository<User>() {
  override val tClass: Class<User> = User::class.java
  fun getOneOrCreateFromUserName(userName: String): User {
    val user = asQuery().filter(Filters.eq(User::userName.name, userName)).first()
    if (user != null) {
      return user
    }
    val toInsert = User()
    toInsert.userName = userName
    return checkNotNull(insertOne(toInsert)) { "Failed to create user" }
  }
}
