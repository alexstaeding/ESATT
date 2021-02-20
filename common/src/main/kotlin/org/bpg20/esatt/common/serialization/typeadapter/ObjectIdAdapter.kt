package org.bpg20.esatt.common.serialization.typeadapter

import com.google.gson.TypeAdapter
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonToken
import com.google.gson.stream.JsonWriter
import org.bson.types.ObjectId

object ObjectIdAdapter : TypeAdapter<ObjectId>() {
  override fun write(writer: JsonWriter, value: ObjectId) {
    writer.value(value.toString())
  }

  override fun read(reader: JsonReader): ObjectId = ObjectId(reader.nextString())
}
