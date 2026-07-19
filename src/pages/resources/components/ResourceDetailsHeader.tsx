import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import type { Resource } from '@resources-api'

interface ResourceDetailsHeaderProps {
  unsavedChangesCount?: number
  resource: Resource
}

export function ResourceDetailsHeader({
  unsavedChangesCount = 0,
  resource,
}: ResourceDetailsHeaderProps) {
  return (
    <Header>
      <Title>{resource.name}</Title>
      <Meta>
        <Badge variant={resource.status === 'completed' ? 'success' : 'info'}>
          {resource.status}
        </Badge>
        {unsavedChangesCount > 0 && (
          <Badge variant="warning">{unsavedChangesCount} unsaved changes</Badge>
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
