package org.bpg20.esatt.common.serialization.typeadapter

import com.google.gson.TypeAdapter
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonToken
import com.google.gson.stream.JsonWriter
import java.time.Instant
import java.time.OffsetDateTime

object InstantAdapter : TypeAdapter<Instant>() {
  override fun write(writer: JsonWriter, value: Instant?) {
    if (value == null) {
      writer.nullValue()
    } else {
      writer.value(value.toString())
    }
  }

  override fun read(reader: JsonReader): Instant? {
    return if (reader.peek() == JsonToken.NULL) {
      reader.nextNull()
      null
    } else {
      OffsetDateTime.parse(reader.nextString()).toInstant()
    }
  }
}
