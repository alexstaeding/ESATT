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
import com.google.inject.Singleton
import com.mongodb.client.MongoClients
import dev.morphia.Datastore
import dev.morphia.Morphia
import org.bpg20.esatt.common.Config
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
    dataStore.mapper.map(
      Department::class.java,
      EvaluationScheme::class.java,
      Thesis::class.java,
      User::class.java,
    )
    dataStore.ensureIndexes()
  }
}
