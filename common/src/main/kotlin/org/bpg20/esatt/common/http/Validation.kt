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

package org.bpg20.esatt.common.http

import org.bpg20.esatt.common.model.Department
import org.bpg20.esatt.common.model.DocumentTemplate
import org.bpg20.esatt.common.model.EvaluationScheme
import org.bpg20.esatt.common.model.ObjectWithId
import org.bpg20.esatt.common.model.Thesis
import org.bpg20.esatt.common.model.User

object Validation {

  val fail = Pair(null, true)
  val empty = Pair(null, false)
  fun <T> T.success() = Pair(this, false)
  const val errorMessage = "An error occurred processing your request!"

  fun requireId(id: String?, writer: Appendable? = null): String? {
    if (id == null) {
      writer?.appendLine("ID is required")
      return null
    }
    return id
  }

  fun requireId(obj: ObjectWithId<*>, writer: Appendable? = null): Boolean {
    if (obj.getId() == null) {
      writer?.appendLine("ID is required")
      return false
    }
    return true
  }

  fun validateAscending(value: String?, writer: Appendable? = null): Pair<Boolean?, Boolean> {
    return validateBoolean("ascending", value, writer)
  }

  fun validateBoolean(property: String, value: String?, writer: Appendable? = null): Pair<Boolean?, Boolean> {
    return when (value) {
      null -> empty
      "true" -> true.success()
      "false" -> false.success()
      else -> {
        writer?.appendLine("Could not parse $property boolean $value")
        fail
      }
    }
  }

  fun validateInteger(property: String, value: String?, writer: Appendable? = null): Pair<Int?, Boolean> {
    return try {
      value?.toInt().success()
    } catch (e: NumberFormatException) {
      writer?.appendLine("Could not parse $property integer $value")
      fail
    }
  }

  fun validateString(property: String?, value: String?, writer: Appendable? = null): Boolean {
    if (property != null && value != null) {
      return false
    }
    if (property == null) {
      writer?.appendLine("Placeholder $property is null")
      return true
    }
    if (value == null) {
      writer?.appendLine("Value $value of placeholder $property is null")
    }
    return true
  }

  fun validateLimit(value: String?, writer: Appendable? = null): Pair<Int?, Boolean> {
    return validateInteger("limit", value, writer)
  }

  fun validatePreview(value: String?, writer: Appendable? = null): Pair<Boolean?, Boolean> {
    return validateBoolean("preview", value, writer)
  }

  interface Model<T : ObjectWithId<*>> {
    fun validateSortByField(value: String?, writer: Appendable? = null): Pair<String?, Boolean>
    fun validateCreate(obj: T, writer: Appendable? = null): Boolean = true
    fun validateUpdate(obj: T, writer: Appendable? = null): Boolean = requireId(obj, writer)
  }

  object DepartmentValidation : Model<Department> {
    override fun validateSortByField(value: String?, writer: Appendable?): Pair<String?, Boolean> {
      return when (value) {
        null -> empty
        "name",
        -> value.success()
        else -> {
          writer?.appendLine("Could not sort departmenta by field $value")
          fail
        }
      }
    }

    override fun validateCreate(obj: Department, writer: Appendable?): Boolean = requireId(obj, writer)
  }

  object DocumentTemplateValidation : Model<DocumentTemplate> {
    override fun validateSortByField(value: String?, writer: Appendable?): Pair<String?, Boolean> {
      return when (value) {
        null -> empty
        "name"
        -> value.success()
        else -> {
          writer?.appendLine("Could not sort document templates by field $value")
          fail
        }
      }
    }
  }

  object EvaluationSchemeValidation : Model<EvaluationScheme> {
    override fun validateSortByField(value: String?, writer: Appendable?): Pair<String?, Boolean> {
      return when (value) {
        null -> empty
        "name",
        "description",
        "lastUpdatedUtc"
        -> value.success()
        else -> {
          writer?.appendLine("Could not sort evaluation schemes by field $value")
          fail
        }
      }
    }
  }

  object ThesisValidation : Model<Thesis> {
    override fun validateSortByField(value: String?, writer: Appendable?): Pair<String?, Boolean> {
      return when (value) {
        null -> empty
        "firstName",
        "lastName",
        "studentId",
        "supervisorId",
        "coSupervisorId",
        "email",
        "thesisType",
        "departmentId",
        "subject",
        "course",
        "title",
        "status.signUpUtc",
        "status.dueDateUtc",
        "status.extendedDueDateUtc",
        "status.submittedUtc",
        "status.presentationUtc",
        "status.gradedUtc",
        "status.reportCreatedUtc",
        -> value.success()
        else -> {
          writer?.appendLine("Could not sort theses by field $value")
          fail
        }
      }
    }
  }

  object UserValidation : Model<User> {
    override fun validateSortByField(value: String?, writer: Appendable?): Pair<String?, Boolean> {
      return when (value) {
        null -> empty
        "userName",
        "firstName",
        "email",
        "lastName",
        -> value.success()
        else -> {
          writer?.appendLine("Could not sort users by field $value")
          fail
        }
      }
    }
  }
}
