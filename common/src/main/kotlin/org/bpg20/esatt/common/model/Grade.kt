package org.bpg20.esatt.common.model

import dev.morphia.annotations.Embedded

@Embedded
class Grade {
  var name: String? = null
  var description: String? = null
  var weight: Double = 0.0
  var grades: List<Grade>? = null
  var grade: Double? = null
}
