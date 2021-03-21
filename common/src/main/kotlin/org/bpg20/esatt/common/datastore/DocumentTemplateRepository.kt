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
    /* Because of a bug in Morphia placeholders do not get updated when item.placeholders is an empty list.
       therefore the following workaround is needed: */
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
