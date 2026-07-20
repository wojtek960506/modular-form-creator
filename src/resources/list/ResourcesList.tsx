import { useState } from 'react'
import type { Resource } from '@resources/api'
import { getErrorMessage } from '@resources/api'
import { useResourcesQuery } from '@resources/queries'
import { FeedbackMessage, StateMessage } from '@shared/ui'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'
import { ResourcesPagination } from './ResourcesPagination'
import {
  EmptyState,
  EmptyStateText,
  EmptyStateTitle,
  List,
  Section,
  SectionBody,
  SectionHeader,
  SectionMeta,
  SectionTitle,
} from './ResourcesList.styles'
import { ResourcesListItem } from './ResourcesListItem'

export function ResourcesList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [resourcePendingDeletion, setResourcePendingDeletion] = useState<Resource | null>(null)
  const resourcesQuery = useResourcesQuery(currentPage)

  const resources = resourcesQuery.data?.items ?? []
  const emptyStateVisible =
    !resourcesQuery.isLoading && (resourcesQuery.data?.pagination.totalItems ?? 0) === 0
  const totalPages = resourcesQuery.data?.pagination.totalPages ?? 0

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Current items</SectionTitle>
        {resourcesQuery.data && (
          <SectionMeta>{resourcesQuery.data.pagination.totalItems} total</SectionMeta>
        )}
      </SectionHeader>

      {resourcesQuery.isError && (
        <FeedbackMessage>{getErrorMessage(resourcesQuery.error)}</FeedbackMessage>
      )}

      {resourcesQuery.isLoading && <StateMessage>Loading resources...</StateMessage>}

      <SectionBody>
        {emptyStateVisible && (
          <EmptyState>
            <EmptyStateTitle>No resources yet</EmptyStateTitle>
            <EmptyStateText>Create your first resource to populate the list.</EmptyStateText>
          </EmptyState>
        )}

        {!resourcesQuery.isLoading && resources.length > 0 && (
          <List>
            {resources.map((resource) => (
              <ResourcesListItem
                key={resource._id}
                resource={resource}
                onDelete={() => setResourcePendingDeletion(resource)}
              />
            ))}
          </List>
        )}
      </SectionBody>

      <ResourcesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmDeleteDialog
        resource={resourcePendingDeletion}
        onClose={() => setResourcePendingDeletion(null)}
      />
    </Section>
  )
}
