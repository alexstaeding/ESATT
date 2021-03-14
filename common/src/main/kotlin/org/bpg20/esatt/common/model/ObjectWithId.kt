@file:UseSerializers(serializerClasses = [InstantSerializer::class, ObjectIdSerializer::class])

package org.bpg20.esatt.common.model

import dev.morphia.annotations.Id
import dev.morphia.annotations.PrePersist
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import org.bpg20.esatt.common.serializer.InstantSerializer
import org.bpg20.esatt.common.serializer.ObjectIdSerializer
import org.bson.types.ObjectId
import java.time.Instant
import java.time.OffsetDateTime
import java.time.ZoneOffset

@Serializable
sealed class ObjectWithId<TKey : Comparable<TKey>> {

  abstract fun getId(): TKey? // not an abstract var because of a bug in kotlinx serialization

  @Serializable(InstantSerializer::class)
  var lastUpdatedUtc: Instant? = null

  @PrePersist
  fun prePersist() {
    lastUpdatedUtc = OffsetDateTime.now(ZoneOffset.UTC).toInstant()
  }

  @Serializable
  open class ObjectWithObjectId : ObjectWithId<ObjectId>() {
    @Id
    @Serializable(ObjectIdSerializer::class)
    private var id: ObjectId? = null
    override fun getId(): ObjectId? = id
  }

  @Serializable
  open class ObjectWithIntId : ObjectWithId<Int>() {
    @Id
    private var id: Int? = null
    override fun getId(): Int? = id
  }
}
