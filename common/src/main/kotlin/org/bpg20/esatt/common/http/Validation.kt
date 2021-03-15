package org.bpg20.esatt.common.http

import org.bpg20.esatt.common.model.Department
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
