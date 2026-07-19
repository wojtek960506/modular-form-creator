import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import { Button } from '@design-system/components/Button'
import { Card } from '@design-system/components/Card'

interface ResourceModuleCardProps {
  title: string
  description: string
  status: 'complete' | 'incomplete'
  summary: string[]
  actionLabel: string
  unsavedChangesCount?: number
  locked?: boolean
  onOpen: () => void
}

export function ResourceModuleCard({
  title,
  description,
  status,
  summary,
  actionLabel,
  unsavedChangesCount = 0,
  locked,
  onOpen,
}: ResourceModuleCardProps) {
  return (
    <Card variant="outline">
      <ModuleHeader>
        <ModuleTitle>{title}</ModuleTitle>
        <ModuleBadges>
          <Badge variant={status === 'complete' ? 'success' : 'neutral'}>
            {status === 'complete' ? 'Complete' : 'Incomplete'}
          </Badge>
          {unsavedChangesCount > 0 && (
            <Badge variant="warning">{unsavedChangesCount} unsaved</Badge>
          )}
        </ModuleBadges>
      </ModuleHeader>
      <ModuleDescription>{description}</ModuleDescription>
      <SummaryList>
        {summary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </SummaryList>
      <Button
        type="button"
        variant="primary"
        state={locked ? 'locked' : 'normal'}
        onClick={onOpen}
      >
        {actionLabel}
      </Button>
    </Card>
  )
}

const ModuleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ModuleBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};
`

const ModuleTitle = styled.h2`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-size: 1.125rem;
`

const ModuleDescription = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`

const SummaryList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.inkMuted};
`
