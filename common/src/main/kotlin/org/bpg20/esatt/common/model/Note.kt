package org.bpg20.esatt.common.model

import dev.morphia.annotations.Embedded
import org.bson.types.ObjectId
import java.time.Instant

@Embedded
class Note {
  var creatorId: ObjectId? = null
  var createdUtc: Instant? = null
  var content: String? = null
}
