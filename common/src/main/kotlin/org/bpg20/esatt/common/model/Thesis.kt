package org.bpg20.esatt.common.model

import dev.morphia.annotations.Entity
import dev.morphia.annotations.Transient
import org.bson.types.ObjectId

@Entity("theses")
class Thesis : ObjectWithId<ObjectId>() {
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

  var grade: Double? = null
  var calculatedGrade: Double? = null
  var grading: Grading? = null
}