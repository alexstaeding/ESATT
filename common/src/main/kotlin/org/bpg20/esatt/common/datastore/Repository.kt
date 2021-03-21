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

package org.bpg20.esatt.common.datastore

import com.google.inject.Inject
import dev.morphia.query.FindOptions
import dev.morphia.query.Projection
import dev.morphia.query.Query
import dev.morphia.query.Sort
import dev.morphia.query.experimental.filters.Filters
import org.bpg20.esatt.common.model.ObjectWithId

abstract class Repository<TKey : Comparable<TKey>, T : ObjectWithId<TKey>> {

  @Inject
  protected lateinit var context: MongoContext

  abstract val tClass: Class<T>
  abstract val tKeyClass: Class<TKey>

  @Throws(IllegalArgumentException::class)
  abstract fun Any.asTKey(): TKey

  open fun Projection.preview() {
  }

  open fun insertOne(item: T): T? = context.dataStore.save(item)
  open fun updateOne(item: T): T? = context.dataStore.merge(item)

  /**
   * @param id The id of the object to get. May be of type TKey or String.
   */
  open fun getOne(id: Any): T? = asQuery(id).first()
  open fun getOne(query: Query<T>): T? = query.first()

  @Throws(IllegalArgumentException::class)
  open fun getAll(
    ascending: Boolean? = null,
    field: String? = null,
    limit: Int? = null,
    preview: Boolean? = null,
    search: String? = null,
  ): Sequence<T> {
    val ascending = ascending ?: true
    val limit = limit ?: 0
    val preview = preview ?: false
    val sort = if (field == null && search == null) {
      if (ascending) {
        Sort.naturalAscending()
      } else {
        Sort.naturalDescending()
      }
    } else if (field != null) {
      if (ascending) {
        Sort.ascending(field)
      } else {
        Sort.descending(field)
      }
    } else {
      null
    }
    val fop = FindOptions()
      .limit(limit)
      .apply { if (preview) projection().preview() }
    if (sort != null) {
      fop.sort(sort)
    }
    val result = asQuery()
    if (search != null) {
      result.filter(Filters.text(search))
    }
    return result.iterator(fop).asSequence()
  }

  fun asQuery(): Query<T> = context.dataStore.find(tClass)
  fun asQuery(id: Any): Query<T> = asQuery().filter(Filters.eq("_id", id.asTKey()))
}
