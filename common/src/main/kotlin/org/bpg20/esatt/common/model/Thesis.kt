@file:UseSerializers(serializerClasses = [InstantSerializer::class, ObjectIdSerializer::class])

package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import dev.morphia.annotations.Field
import dev.morphia.annotations.Index
import dev.morphia.annotations.Indexes
import dev.morphia.annotations.Transient
import dev.morphia.utils.IndexType
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import org.bpg20.esatt.common.serializer.InstantSerializer
import org.bpg20.esatt.common.serializer.ObjectIdSerializer
import org.bson.types.ObjectId

@Entity("theses")
@Indexes(
  Index(fields = [Field(value = "$**", type = IndexType.TEXT)]),
)
@Serializable
class Thesis : ObjectWithId.ObjectWithObjectId() {
  var firstName: String? = null
  var lastName: String? = null
  var gender: Gender? = null
  var email: String? = null
  var studentId: String? = null
  var supervisorId: ObjectId? = null

  @Transient
  var supervisorFirstName: String? = null

  @Transient
  var supervisorLastName: String? = null

  var evaluatorFirstName: String? = null
  var evaluatorLastName: String? = null

  /**
   * E.g. Bachelor, Master
   */
  var thesisType: String? = null

  /**
   * E.g. Informatik, Elektrotechnik
   */
  var departmentId: Int? = null

  @Transient
  var departmentName: String? = null

  var subject: String? = null
  var title: String? = null
  var status: Status? = null
  var notes: List<Note>? = null

  var grade: Double = 0.0
  var calculatedGrade: Double = 0.0
  var grading: Grading? = null
}
