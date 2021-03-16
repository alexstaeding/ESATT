package org.bpg20.esatt.common.datastore

import com.google.inject.Inject
import dev.morphia.query.experimental.filters.Filters
import dev.morphia.query.experimental.updates.UpdateOperators
import org.bpg20.esatt.common.model.User
import org.slf4j.Logger

class UserRepository @Inject constructor(
  private val logger: Logger,
): ObjectIdRepository<User>() {
  override val tClass: Class<User> = User::class.java
  fun getOneOrCreateFromUserName(userName: String, linkLDAP: Boolean = false): User {
    val user = asQuery().filter(Filters.eq(User::userName.name, userName)).first()
    if (user != null) {
      if (linkLDAP && user.isLinkedLDAP != true) {
        val result = asQuery(user.getId()!!).update(UpdateOperators.set(User::isLinkedLDAP.name, true)).execute()
        if (!result.wasAcknowledged() || result.modifiedCount != 1L) {
          logger.error("Failed to set isLinkedLDAP for user $userName")
        }
      }
      return user
    }
    val toInsert = User()
    toInsert.userName = userName
    toInsert.isLinkedLDAP = linkLDAP
    return checkNotNull(insertOne(toInsert)) { "Failed to create user" }
  }
}
