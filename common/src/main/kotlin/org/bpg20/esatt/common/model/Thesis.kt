/*
 *   ESATT - https://www.github.com/alexstaeding/ESATT
 *   Copyright (C) 2021 Bachelor-Praktikum Gruppe 20
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Lesser General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Lesser General Public License for more details.
 *
 *     You should have received a copy of the GNU Lesser General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
  var coSupervisorId: ObjectId? = null

  @Transient
  var supervisorFirstName: String? = null

  @Transient
  var supervisorLastName: String? = null

  @Transient
  var coSupervisorFirstName: String? = null

  @Transient
  var coSupervisorLastName: String? = null

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
