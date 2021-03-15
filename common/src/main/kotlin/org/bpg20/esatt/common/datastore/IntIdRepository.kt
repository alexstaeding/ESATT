package org.bpg20.esatt.common.datastore

import org.bpg20.esatt.common.model.ObjectWithId

abstract class IntIdRepository<T : ObjectWithId<Int>> : Repository<Int, T>() {
  override val tKeyClass: Class<Int> = Int::class.java
  override fun Any.asTKey(): Int = this as? Int ?: toString().toInt()
}
