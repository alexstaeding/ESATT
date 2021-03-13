package org.bpg20.esatt.common.datastore

import com.google.inject.Singleton
import com.mongodb.client.MongoClients
import dev.morphia.Datastore
import dev.morphia.Morphia
import org.bpg20.esatt.common.model.Department
import org.bpg20.esatt.common.model.EvaluationScheme
import org.bpg20.esatt.common.model.Thesis
import org.bpg20.esatt.common.model.User

@Singleton
class MongoContext {

  val dataStore: Datastore

  init {
    dataStore = Morphia.createDatastore(MongoClients.create("mongodb://localhost:27017"), "esatt")
    dataStore.mapper.map(
      Department::class.java,
      EvaluationScheme::class.java,
      Thesis::class.java,
      User::class.java,
    )
    dataStore.ensureIndexes()
  }
}
