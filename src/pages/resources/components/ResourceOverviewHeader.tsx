import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import type { Resource } from '@resources-api'

interface ResourceOverviewHeaderProps {
  hasUnsavedChanges?: boolean
  resource: Resource
}

export function ResourceOverviewHeader({
  hasUnsavedChanges = false,
  resource,
}: ResourceOverviewHeaderProps) {
  return (
    <Header>
      <Title>{resource.name}</Title>
      <HeaderMeta>
        <Badge variant={resource.status === 'completed' ? 'success' : 'info'}>
          {resource.status}
        </Badge>
        {hasUnsavedChanges ? <Badge variant="warning">Unsaved changes</Badge> : null}
      </HeaderMeta>
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

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.inkMuted};
`
