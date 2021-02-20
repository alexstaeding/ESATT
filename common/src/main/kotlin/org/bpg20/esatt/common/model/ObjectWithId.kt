package org.bpg20.esatt.common.model

import dev.morphia.annotations.Id
import dev.morphia.annotations.PrePersist
import java.time.Instant
import java.time.OffsetDateTime
import java.time.ZoneOffset

open class ObjectWithId<TKey : Comparable<TKey>> {

  @Id
  var id: TKey? = null

  var lastUpdatedUtc: Instant? = null

  @PrePersist
  fun prePersist() {
    lastUpdatedUtc = OffsetDateTime.now(ZoneOffset.UTC).toInstant()
  }
}
