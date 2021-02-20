package org.bpg20.esatt.common.model

import dev.morphia.annotations.Embedded

@Embedded
class Grade {
  var name: String? = null
  var description: String? = null
  var weight: Double = 1.0
  var grades: List<Grade>? = null
  var grade: Int? = null
}
