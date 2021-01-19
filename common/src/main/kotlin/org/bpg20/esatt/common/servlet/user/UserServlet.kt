package org.bpg20.esatt.common.servlet.user

import com.google.inject.Inject
import com.google.inject.Singleton
import org.bpg20.esatt.common.datastore.UserRepository
import org.bpg20.esatt.common.model.User
import org.bpg20.esatt.common.servlet.RepositoryServlet
import org.bpg20.esatt.common.servlet.Validation

@Singleton
class UserServlet @Inject constructor(
  override val repository: UserRepository,
) : RepositoryServlet<User>(Validation.UserValidation, User::class.java) {
}
