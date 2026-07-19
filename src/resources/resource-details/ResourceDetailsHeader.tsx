import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import { formatResourceStatusLabel } from '@resources/formatResourceStatusLabel'
import { useResource } from '@resources/resource'
import { formatUnsavedChangesLabel } from '@resources/shared'

export function ResourceDetailsHeader() {
  const { draftChangeCounts, draftResource } = useResource()

  if (!draftResource) return null

  const resource = draftResource
  const unsavedChangesCount = draftChangeCounts.total

  return (
    <Header>
      <Title>{resource.name}</Title>
      <Meta>
        <Badge variant={resource.status === 'completed' ? 'success' : 'info'}>
          {formatResourceStatusLabel(resource.status)}
        </Badge>
        {unsavedChangesCount > 0 && (
          <Badge variant="warning">{formatUnsavedChangesLabel(unsavedChangesCount)}</Badge>
        )}
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
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.inkMuted};
`
