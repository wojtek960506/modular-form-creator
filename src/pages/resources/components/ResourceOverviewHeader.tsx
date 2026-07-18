import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import type { Resource } from '@resources-api'

export function ResourceOverviewHeader({ resource }: { resource: Resource }) {
  return (
    <Header>
      <Title>{resource.name}</Title>
      <HeaderMeta>
        <Badge variant={resource.status === 'completed' ? 'success' : 'info'}>
          {resource.status}
        </Badge>
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
