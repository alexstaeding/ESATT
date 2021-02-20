package org.bpg20.esatt.common.serialization

import com.google.gson.ExclusionStrategy
import com.google.gson.FieldAttributes
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.inject.Inject
import com.google.inject.Singleton
import org.bpg20.esatt.common.model.Department
import org.bpg20.esatt.common.model.EvaluationScheme
import org.bpg20.esatt.common.model.ObjectWithId
import org.bpg20.esatt.common.model.Thesis
import org.bpg20.esatt.common.model.User
import org.bpg20.esatt.common.serialization.typeadapter.InstantAdapter
import org.bpg20.esatt.common.serialization.typeadapter.ObjectIdAdapter
import org.bson.types.ObjectId
import org.slf4j.Logger
import java.time.Instant
import javax.servlet.http.HttpServletResponse

@Singleton
class SerializationService {

  @Inject
  private lateinit var logger: Logger

  private class FieldNameExclusionStrategy(val fieldNamePredicate: (String) -> Boolean) : ExclusionStrategy {
    override fun shouldSkipField(field: FieldAttributes): Boolean = fieldNamePredicate(field.name)
    override fun shouldSkipClass(clazz: Class<*>): Boolean = false
  }

  /**
   * Functions that decide whether a given fieldName should be excluded in the "preview" version of the object
   */
  private object PreviewExclusions {
    fun evaluationScheme(fieldName: String): Boolean = when (fieldName) {
      "criteria",
      -> true
      else -> false
    }

    fun thesis(fieldName: String): Boolean = when (fieldName) {
      "notes",
      -> true
      else -> false
    }
  }

  /**
   * A collection of [Gson] instances used for serializing/deserializing objects to/from a JSON String
   */
  private object Gsons {

    /**
     * The base Gson serializer that excludes nothing
     */
    val baseGson: Gson = GsonBuilder()
      .registerTypeAdapter(Instant::class.java, InstantAdapter.nullSafe())
      .registerTypeAdapter(ObjectId::class.java, ObjectIdAdapter.nullSafe())
      .create()

    fun createChildGson(exclusionStrategy: ExclusionStrategy): Gson {
      return baseGson.newBuilder()
        .setExclusionStrategies(exclusionStrategy)
        .create()
    }

    object Preview {
      val department: Gson = baseGson
      val evaluationScheme: Gson = createChildGson(FieldNameExclusionStrategy(PreviewExclusions::evaluationScheme))
      val thesis: Gson = createChildGson(FieldNameExclusionStrategy(PreviewExclusions::thesis))
      val user: Gson = baseGson
    }
  }

  inner class Serializer<T : ObjectWithId<*>>(val clazz: Class<T>, val previewGson: Gson) {
    fun fromJson(json: String): T? {
      return try {
        Gsons.baseGson.fromJson(json, clazz)
      } catch (e: Exception) {
        logger.error("Unable to serialize json $json", e)
        null
      }
    }

    fun toJsonFull(obj: T?): String = Gsons.baseGson.toJson(obj)
    fun toJsonPreview(obj: T?): String = previewGson.toJson(obj)
  }

  private fun <T : ObjectWithId<*>> Serializer<T>.pairWithClass() = Pair(clazz, this)

  private val serializers: Map<Class<out ObjectWithId<*>>, Serializer<out ObjectWithId<*>>> = mapOf(
    Serializer(Department::class.java, Gsons.Preview.department).pairWithClass(),
    Serializer(EvaluationScheme::class.java, Gsons.Preview.evaluationScheme).pairWithClass(),
    Serializer(Thesis::class.java, Gsons.Preview.thesis).pairWithClass(),
    Serializer(User::class.java, Gsons.Preview.user).pairWithClass(),
  )

  /**
   * Attempts to find and return a [Serializer] for the provided [modelClass].
   *
   * If a [Serializer] is not found, prints an error to the provided [response], sets a 500 status and returns null
   */
  fun <T : ObjectWithId<*>> getSerializer(modelClass: Class<T>, response: HttpServletResponse): Serializer<T>? {
    return (serializers[modelClass] as? Serializer<T>) ?: run {
      response.status = 500
      response.writer.append("Could not find serializer for ${modelClass.canonicalName}")
      null
    }
  }
}
