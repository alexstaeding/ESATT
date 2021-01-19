package org.bpg20.esatt.common.serialization.typeadapter

import com.google.gson.TypeAdapter
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonToken
import com.google.gson.stream.JsonWriter
import org.bson.types.ObjectId

object ObjectIdAdapter : TypeAdapter<ObjectId>() {
  override fun write(writer: JsonWriter, value: ObjectId?) {
    if (value == null) {
      writer.nullValue()
    } else {
      writer.value(value.toString())
    }
  }

  override fun read(reader: JsonReader): ObjectId? {
    return if (reader.peek() == JsonToken.NULL) {
      reader.nextNull()
      null
    } else {
      ObjectId(reader.nextString())
    }
  }
}
