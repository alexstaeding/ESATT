package org.bpg20.esatt.common.datastore

import com.google.inject.Inject
import com.google.inject.Singleton
import com.mongodb.client.MongoClients
import dev.morphia.Datastore
import dev.morphia.Morphia
import org.bpg20.esatt.common.config.Config
import org.bpg20.esatt.common.model.Department
import org.bpg20.esatt.common.model.EvaluationScheme
import org.bpg20.esatt.common.model.Thesis
import org.bpg20.esatt.common.model.User

@Singleton
class MongoContext @Inject constructor(
  config: Config,
) {

  val dataStore: Datastore = Morphia.createDatastore(MongoClients.create(config.mongodbConnection!!), "esatt")

  init {
    dataStore.ensureIndexes()
    dataStore.mapper.map(
      Department::class.java,
      EvaluationScheme::class.java,
      Thesis::class.java,
      User::class.java,
    )
  }
}
