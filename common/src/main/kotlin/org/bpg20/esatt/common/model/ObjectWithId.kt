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

import dev.morphia.annotations.Id
import dev.morphia.annotations.PrePersist
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import org.bpg20.esatt.common.serializer.InstantSerializer
import org.bpg20.esatt.common.serializer.ObjectIdSerializer
import org.bson.types.ObjectId
import java.time.Instant
import java.time.OffsetDateTime
import java.time.ZoneOffset

@Serializable
sealed class ObjectWithId<TKey : Comparable<TKey>> {

  abstract fun getId(): TKey? // not an abstract var because of a bug in kotlinx serialization

  @Serializable(InstantSerializer::class)
  var lastUpdatedUtc: Instant? = null

  @PrePersist
  fun prePersist() {
    lastUpdatedUtc = OffsetDateTime.now(ZoneOffset.UTC).toInstant()
  }

  @Serializable
  open class ObjectWithObjectId : ObjectWithId<ObjectId>() {
    @Id
    @Serializable(ObjectIdSerializer::class)
    private var id: ObjectId? = null
    override fun getId(): ObjectId? = id
  }

  @Serializable
  open class ObjectWithIntId : ObjectWithId<Int>() {
    @Id
    private var id: Int? = null
    override fun getId(): Int? = id
  }
}
