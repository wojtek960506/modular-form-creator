import { useQuery } from '@tanstack/react-query'
import {
  getErrorMessage,
  getResources,
  resourcesQueryKey,
  type Resource,
} from '../../resources.api'
import {
  EmptyState,
  EmptyStateText,
  EmptyStateTitle,
  FeedbackMessage,
  List,
  ResourceItem,
  ResourceMeta,
  ResourceName,
  Section,
  SectionHeader,
  SectionMeta,
  SectionTitle,
  StateMessage,
} from './ResourcesList.styles'

export function ResourcesList() {
  const resourcesQuery = useQuery({
    queryKey: resourcesQueryKey,
    queryFn: getResources,
  })

  const resources = resourcesQuery.data?.items ?? []
  const emptyStateVisible = !resourcesQuery.isLoading && resources.length === 0

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Current items</SectionTitle>
        {resourcesQuery.data ? (
          <SectionMeta>{resourcesQuery.data.pagination.totalItems} total</SectionMeta>
        ) : null}
      </SectionHeader>

      {resourcesQuery.isError ? (
        <FeedbackMessage>{getErrorMessage(resourcesQuery.error)}</FeedbackMessage>
      ) : null}

      {resourcesQuery.isLoading ? <StateMessage>Loading resources...</StateMessage> : null}

      {emptyStateVisible ? (
        <EmptyState>
          <EmptyStateTitle>No resources yet</EmptyStateTitle>
          <EmptyStateText>Create your first resource to populate the list.</EmptyStateText>
        </EmptyState>
      ) : null}

      {!resourcesQuery.isLoading && resources.length > 0 ? (
        <List>
          {resources.map((resource) => (
            <ResourcesListItem key={resource._id} resource={resource} />
          ))}
        </List>
      ) : null}
    </Section>
  )
}

function ResourcesListItem({ resource }: { resource: Resource }) {
  return (
    <ResourceItem>
      <ResourceName>{resource.name}</ResourceName>
      <ResourceMeta>#{resource.resourceId} · {resource.status}</ResourceMeta>
    </ResourceItem>
  )
}
