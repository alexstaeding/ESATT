package org.bpg20.esatt.common.datastore

import org.bpg20.esatt.common.model.ObjectWithId
import java.util.concurrent.CompletableFuture

abstract class IntIdRepository<T : ObjectWithId<Int>> : Repository<Int, T>() {
  override val tKeyClass: Class<Int> = Int::class.java
  override fun getOne(id: Any): CompletableFuture<T> = getOne(asQuery(id as? Int ?: id.toString().toInt()))
}
