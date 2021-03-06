package org.bpg20.esatt.common.datastore

import dev.morphia.query.Query
import org.bpg20.esatt.common.model.ObjectWithId
import java.util.concurrent.CompletableFuture

abstract class IntIdRepository<T : ObjectWithId<Int>> : Repository<Int, T>() {
  override val tKeyClass: Class<Int> = Int::class.java
  override fun asQuery(id: Any): Query<T> = asQuery(id as? Int ?: id.toString().toInt())
}
