package org.bpg20.esatt.common.datastore

import com.google.inject.Inject
import dev.morphia.query.FindOptions
import dev.morphia.query.Query
import dev.morphia.query.Sort
import dev.morphia.query.UpdateException
import dev.morphia.query.experimental.filters.Filters
import org.bpg20.esatt.common.model.ObjectWithId
import java.util.concurrent.CompletableFuture

abstract class Repository<TKey : Comparable<TKey>, T : ObjectWithId<TKey>> {

  @Inject
  protected lateinit var context: MongoContext

  abstract val tClass: Class<T>
  abstract val tKeyClass: Class<TKey>

  fun insertOne(item: T): CompletableFuture<T?> = CompletableFuture.supplyAsync { context.dataStore.save(item); item }
  fun updateOne(item: T): CompletableFuture<T?> = CompletableFuture.supplyAsync {
    try {
      context.dataStore.merge(item)
    } catch (e: UpdateException) {
      null
    }
  }

  /**
   * @param id The id of the object to get. May be of type TKey or String.
   */
  abstract fun getOne(id: Any): CompletableFuture<T>
  fun getOne(query: Query<T>) = CompletableFuture.supplyAsync { query.first() }

  @Throws(IllegalArgumentException::class)
  open fun getAll(
    ascending: Boolean? = null,
    field: String? = null,
    limit: Int? = null,
  ): Sequence<T> {
    val ascending = ascending ?: true
    val limit = limit ?: 0
    val sort = if (field == null) {
      if (ascending) {
        Sort.naturalAscending()
      } else {
        Sort.naturalDescending()
      }
    } else {
      if (ascending) {
        Sort.ascending(field)
      } else {
        Sort.descending(field)
      }
    }
    val fop = FindOptions()
      .sort(sort)
      .limit(limit)
    return asQuery().iterator(fop).asSequence()
  }

  fun asQuery(): Query<T> = context.dataStore.find(tClass)
  fun asQuery(id: TKey): Query<T> = asQuery().filter(Filters.eq("_id", id))
}
