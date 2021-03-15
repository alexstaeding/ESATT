package org.bpg20.esatt.common.datastore

import org.bpg20.esatt.common.model.ObjectWithId
import org.bson.types.ObjectId

abstract class ObjectIdRepository<T : ObjectWithId<ObjectId>> : Repository<ObjectId, T>() {
  override val tKeyClass: Class<ObjectId> = ObjectId::class.java
  override fun Any.asTKey(): ObjectId = this as? ObjectId ?: ObjectId(toString())
}
