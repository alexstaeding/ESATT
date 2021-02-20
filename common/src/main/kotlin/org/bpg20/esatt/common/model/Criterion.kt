package org.bpg20.esatt.common.model

import dev.morphia.annotations.Embedded

@Embedded
class Criterion {
  var name: String? = null
  var description: String? = null
  var weight: Double = 0.0
  var criteria: List<Criterion>? = null
}
