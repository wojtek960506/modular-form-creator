import styled from 'styled-components'
import type { Resource } from '@resources-api'

export function ResourceDetailsHeader({ resource }: { resource: Resource }) {
  return (
    <Header>
      <Title>{resource.name}</Title>
      <Meta>
        <span>#{resource.resourceId}</span>
        <StatusBadge $status={resource.status}>{resource.status}</StatusBadge>
      </Meta>
    </Header>
  )
}

const Header = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.inkStrong};
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.inkMuted};
`

const StatusBadge = styled.span<{ $status: 'draft' | 'completed' }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $status }) =>
    $status === 'completed' ? theme.colors.primary : theme.colors.surfaceAlt};
  color: ${({ theme, $status }) =>
    $status === 'completed' ? theme.colors.surface : theme.colors.inkStrong};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: capitalize;
`
