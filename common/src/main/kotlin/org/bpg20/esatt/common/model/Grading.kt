package org.bpg20.esatt.common.model

import dev.morphia.annotations.Embedded
import kotlinx.serialization.Serializable

@Embedded
@Serializable
class Grading {
  var name: String? = null
  var description: String? = null
  var grades: List<Grade>? = null
}
