import { useState } from 'react'
import { getErrorMessage } from '@resources/api'
import { useDeleteResourceMutation, useResourcesQuery } from '@resources/queries'
import { FeedbackMessage, StateMessage } from '@shared/ui'
import {
  EmptyState,
  EmptyStateText,
  EmptyStateTitle,
  List,
  Section,
  SectionHeader,
  SectionMeta,
  SectionTitle,
} from './ResourcesList.styles'
import { ResourcesListItem } from './ResourcesListItem'

export function ResourcesList() {
  const [deletingResourceId, setDeletingResourceId] = useState<string | null>(null)
  const resourcesQuery = useResourcesQuery()
  const deleteResourceMutation = useDeleteResourceMutation({
    onMutate: (resourceId) => {
      setDeletingResourceId(resourceId)
    },
    onSettled: () => {
      setDeletingResourceId(null)
    },
  })

  const resources = resourcesQuery.data?.items ?? []
  const emptyStateVisible = !resourcesQuery.isLoading && resources.length === 0

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
              isDeleting={deletingResourceId === String(resource.resourceId)}
              onDelete={() => deleteResourceMutation.mutate(String(resource.resourceId))}
            />
          ))}
        </List>
      )}
    </Section>
  )
}
