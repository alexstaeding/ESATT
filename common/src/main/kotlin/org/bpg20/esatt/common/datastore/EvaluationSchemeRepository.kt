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

import dev.morphia.query.Projection
import org.bpg20.esatt.common.model.EvaluationScheme

class EvaluationSchemeRepository : ObjectIdRepository<EvaluationScheme>() {
  override val tClass: Class<EvaluationScheme> = EvaluationScheme::class.java

  override fun Projection.preview() {
    exclude(
      EvaluationScheme::criteria.name,
    )
  }
}
