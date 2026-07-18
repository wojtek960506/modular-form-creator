import styled from 'styled-components'
import { Card } from '@design-system/components/Card'
import type { Resource } from '@resources-api'
import { getCompletedModulesCount } from '@resources/resourceCompletion'

export function ResourceProgressPanel({ resource }: { resource: Resource }) {
  const completedModulesCount = getCompletedModulesCount(resource)

  return (
    <Card variant="outline">
      <ProgressCopy>
        <ProgressLabel>Module progress</ProgressLabel>
        <ProgressValue>{completedModulesCount} of 2 completed</ProgressValue>
      </ProgressCopy>
      <ProgressTrack aria-label={`${completedModulesCount} of 2 modules completed`}>
        <ProgressFill $completedModulesCount={completedModulesCount} />
      </ProgressTrack>
    </Card>
  )
}

const ProgressCopy = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

const ProgressLabel = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`

const ProgressValue = styled.p`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-weight: 700;
`

const ProgressTrack = styled.div`
  height: 0.5rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

const ProgressFill = styled.div<{ $completedModulesCount: number }>`
  width: ${({ $completedModulesCount }) => `${($completedModulesCount / 2) * 100}%`};
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.2s ease;
`
