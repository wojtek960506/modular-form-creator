import { useNavigate } from 'react-router-dom'
import { Button } from '@design-system/components/Button'
import styled from 'styled-components'

const BackButtonBase = styled(Button).attrs({
  type: 'button',
  variant: 'ghost',
})`
  justify-self: start;
`

export function BackButton({ resourceId }: { resourceId?: string }) {
  const navigate = useNavigate()
  const label = resourceId ? 'Back to overview' : 'Back to resources'
  const target = resourceId ? `/resources/${resourceId}` : '/resources'

  return (
    <BackButtonBase onClick={() => navigate(target)}>
      {label}
    </BackButtonBase>
  )
}
