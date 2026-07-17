import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import {
  getErrorMessage,
  getResources,
  resourcesQueryKey,
  type Resource,
} from '../../resources.api'

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

const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
`

const SectionMeta = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
`

const List = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;
`

const ResourceItem = styled.li`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

const ResourceName = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.inkStrong};
`

const ResourceMeta = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
`

const StateMessage = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`

const FeedbackMessage = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.warning};
`

const EmptyState = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

const EmptyStateTitle = styled.h3`
  font-size: 1.1rem;
`

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`
