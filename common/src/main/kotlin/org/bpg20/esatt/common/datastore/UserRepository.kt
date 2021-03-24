/*
 *   ESATT - https://www.github.com/alexstaeding/ESATT
 *   Copyright (C) 2021 Bachelor-Praktikum Gruppe 20
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Lesser General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Lesser General Public License for more details.
 *
 *     You should have received a copy of the GNU Lesser General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
    print(userName)
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
