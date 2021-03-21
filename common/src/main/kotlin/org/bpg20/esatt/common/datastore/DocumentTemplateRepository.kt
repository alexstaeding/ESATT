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
import dev.morphia.query.experimental.updates.UpdateOperators
import org.bpg20.esatt.common.model.DocumentTemplate
import org.slf4j.Logger

class DocumentTemplateRepository @Inject constructor(
  private val logger: Logger,
) : ObjectIdRepository<DocumentTemplate>() {
  override val tClass: Class<DocumentTemplate> = DocumentTemplate::class.java

  override fun insertOne(item: DocumentTemplate): DocumentTemplate? {
    item.placeholders = extractPlaceholders(item)
    return super.insertOne(item)
  }

  override fun updateOne(item: DocumentTemplate): DocumentTemplate? {
    item.placeholders = extractPlaceholders(item)
    val updated = super.updateOne(item)
    // Because of a bug in Morphia, placeholders do not get updated when item.placeholders is an empty list.
    // therefore the following workaround is needed:
    if (updated?.placeholders != item.placeholders) {
      val result = asQuery(item.getId()!!)
        .update(UpdateOperators.set(DocumentTemplate::placeholders.name, item.placeholders))
        .execute()
      if (!result.wasAcknowledged() || result.modifiedCount != 1L) {
        logger.error("Failed to set placeholders for document template ${item.getId()}")
      }
    }
    return super.updateOne(item)
  }

  private fun extractPlaceholders(docTemplate: DocumentTemplate): List<String> {
    val texTemplate: String = docTemplate.texTemplate ?: return emptyList()
    val format = Regex("@[\\w.-]+@")
    return format.findAll(texTemplate).map { it.value.substring(1 until it.value.length - 1) }.toList().distinct()
  }
}
