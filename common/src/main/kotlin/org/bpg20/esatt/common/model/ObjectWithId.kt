@file:UseSerializers(serializerClasses = [InstantSerializer::class, ObjectIdSerializer::class])

package org.bpg20.esatt.common.model

import dev.morphia.annotations.Id
import dev.morphia.annotations.PrePersist
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import org.bpg20.esatt.common.serializer.InstantSerializer
import org.bpg20.esatt.common.serializer.ObjectIdSerializer
import java.time.Instant
import java.time.OffsetDateTime
import java.time.ZoneOffset

@Serializable
open class ObjectWithId<TKey : Comparable<TKey>> {

  @Id
  var id: TKey? = null

  @Serializable(InstantSerializer::class)
  var lastUpdatedUtc: Instant? = null

  @PrePersist
  fun prePersist() {
    lastUpdatedUtc = OffsetDateTime.now(ZoneOffset.UTC).toInstant()
  }
}
