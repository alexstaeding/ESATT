package org.bpg20.esatt.common.serialization.typeadapter

import com.google.gson.TypeAdapter
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonToken
import com.google.gson.stream.JsonWriter
import java.time.Instant
import java.time.OffsetDateTime

object InstantAdapter : TypeAdapter<Instant>() {
  override fun write(writer: JsonWriter, value: Instant) {
    writer.value(value.toString())
  }

  override fun read(reader: JsonReader): Instant = OffsetDateTime.parse(reader.nextString()).toInstant()
}
