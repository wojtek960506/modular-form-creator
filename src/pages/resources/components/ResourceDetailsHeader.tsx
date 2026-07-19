import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import type { Resource } from '@resources-api'

interface ResourceDetailsHeaderProps {
  hasUnsavedChanges?: boolean
  resource: Resource
}

export function ResourceDetailsHeader({
  hasUnsavedChanges = false,
  resource,
}: ResourceDetailsHeaderProps) {
  return (
    <Header>
      <Title>{resource.name}</Title>
      <Meta>
        <Badge variant={resource.status === 'completed' ? 'success' : 'warning'}>
          {resource.status}
        </Badge>
        {hasUnsavedChanges ? <Badge variant="warning">Unsaved changes</Badge> : null}
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
