import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { PageCard } from '@shared/ui'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <PageCard>
      <Content>
        <Title>Page not found</Title>
        <Description>
          The page you are looking for does not exist or is no longer available.
        </Description>
        <Button type="button" onClick={() => navigate('/resources')}>
          Go to resources
        </Button>
      </Content>
    </PageCard>
  )
}

const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  justify-items: start;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.inkStrong};
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`
