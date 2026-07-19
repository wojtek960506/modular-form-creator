import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { Card } from '@design-system/components/Card'
import { useResource } from '@resources/resource'
import { StateMessage } from '@shared/ui'

const LockedTitle = styled.h2`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-size: 1.125rem;
`

export function LockedProjectDetailsCard() {
  const navigate = useNavigate()
  const { draftResource } = useResource()

  if (!draftResource) return null

  return (
    <Card variant="outline">
      <LockedTitle>Project Details are locked</LockedTitle>
      <StateMessage>Complete Basic Info before opening this module.</StateMessage>
      <Button
        type="button"
        onClick={() => navigate(`/resources/${draftResource.resourceId}/basic-info`)}
      >
        Set Basic Info
      </Button>
    </Card>
  )
}
