package org.bpg20.esatt.common.model

import dev.morphia.annotations.Embedded
import java.time.Instant

@Embedded
class Status {
  var allocationDateUtc: Instant? = null
  var signUpUtc: Instant? = null
  var presentationUtc: Instant? = null
  var dueDateUtc: Instant? = null
  var extendedDueDateUtc: Instant? = null
  var submittedUtc: Instant? = null
  var gradedUtc: Instant? = null
  var reportCreatedUtc: Instant? = null
}
