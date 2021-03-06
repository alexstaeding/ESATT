package org.bpg20.esatt.common.datastore

import dev.morphia.query.Query
import org.bpg20.esatt.common.model.ObjectWithId
import org.bson.types.ObjectId
import java.util.concurrent.CompletableFuture

abstract class ObjectIdRepository<T : ObjectWithId<ObjectId>> : Repository<ObjectId, T>() {
  override val tKeyClass: Class<ObjectId> = ObjectId::class.java
  override fun asQuery(id: Any): Query<T> = asQuery(id as? ObjectId ?: ObjectId(id.toString()))
}
