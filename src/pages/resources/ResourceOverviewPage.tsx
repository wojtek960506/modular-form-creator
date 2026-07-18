import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import { Button } from '@design-system/components/Button'
import { Card } from '@design-system/components/Card'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import {
  getErrorMessage,
  getResource,
  provisionResource,
  resourceQueryKey,
  type Resource,
} from '@resources-api'
import {
  canProvisionResource,
  getCompletedModulesCount,
  isBasicInfoComplete,
  isProjectDetailsComplete,
} from '@resources/resourceCompletion'

export function ResourceOverviewPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const resourceQuery = useQuery({
    queryKey: resourceQueryKey(resourceId ?? ''),
    queryFn: () => getResource(resourceId ?? ''),
    enabled: Boolean(resourceId),
  })

  const provisionResourceMutation = useMutation({
    mutationFn: provisionResource,
    onSuccess: async (resource) => {
      await queryClient.setQueryData(resourceQueryKey(String(resource.resourceId)), resource)
    },
  })

  const resource = resourceQuery.data

  return (
    <PageCard>
      <BackButton onClick={() => navigate('/resources')}>
        Back to resources
      </BackButton>

      {resourceQuery.isLoading ? <StateMessage>Loading resource...</StateMessage> : null}

      {resourceQuery.isError ? (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      ) : null}

      {provisionResourceMutation.isError ? (
        <FeedbackMessage>
          {getErrorMessage(provisionResourceMutation.error)}
        </FeedbackMessage>
      ) : null}

      {resource ? (
        <>
          <OverviewHeader resource={resource} />
          <ProgressPanel resource={resource} />

          <ModulesGrid>
            <ModuleCard
              title="Basic Info"
              description="Required identity and ownership information for this resource."
              status={isBasicInfoComplete(resource.basicInfo) ? 'complete' : 'incomplete'}
              summary={[
                `Owner: ${resource.basicInfo.owner || 'Not provided'}`,
                `Priority: ${resource.basicInfo.priority || 'Not provided'}`,
              ]}
              actionLabel={isBasicInfoComplete(resource.basicInfo) ? 'Review Basic Info' : 'Open Basic Info'}
              onOpen={() => navigate(`/resources/${resource.resourceId}/basic-info`)}
            />

            <ModuleCard
              title="Project Details"
              description="Project scope, budget, category, and assigned team options."
              status={isProjectDetailsComplete(resource.projectDetails) ? 'complete' : 'incomplete'}
              summary={[
                `Project: ${resource.projectDetails.projectName || 'Not provided'}`,
                `Options: ${
                  resource.projectDetails.options.length > 0
                    ? resource.projectDetails.options.join(', ')
                    : 'Not provided'
                }`,
              ]}
              actionLabel={
                isBasicInfoComplete(resource.basicInfo)
                  ? 'Open Project Details'
                  : 'Complete Basic Info first'
              }
              locked={!isBasicInfoComplete(resource.basicInfo)}
              onOpen={() => navigate(`/resources/${resource.resourceId}/project-details`)}
            />
          </ModulesGrid>

          <Actions>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(`/resources/${resource.resourceId}/details`)}
            >
              View details
            </Button>
            <Button
              type="button"
              state={canProvisionResource(resource) ? 'normal' : 'locked'}
              disabled={provisionResourceMutation.isPending}
              onClick={() => provisionResourceMutation.mutate(String(resource.resourceId))}
            >
              {provisionResourceMutation.isPending ? 'Completing...' : 'Complete resource'}
            </Button>
          </Actions>
        </>
      ) : null}
    </PageCard>
  )
}

function OverviewHeader({ resource }: { resource: Resource }) {
  return (
    <Header>
      <Title>{resource.name}</Title>
      <HeaderMeta>
        <span>#{resource.resourceId}</span>
        <Badge variant={resource.status === 'completed' ? 'success' : 'warning'}>
          {resource.status}
        </Badge>
      </HeaderMeta>
    </Header>
  )
}

function ProgressPanel({ resource }: { resource: Resource }) {
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

function ModuleCard({
  title,
  description,
  status,
  summary,
  actionLabel,
  locked,
  onOpen,
}: {
  title: string
  description: string
  status: 'complete' | 'incomplete'
  summary: string[]
  actionLabel: string
  locked?: boolean
  onOpen: () => void
}) {
  return (
    <Card variant="outline">
      <ModuleHeader>
        <ModuleTitle>{title}</ModuleTitle>
        <Badge variant={status === 'complete' ? 'success' : 'neutral'}>
          {status === 'complete' ? 'Complete' : 'Incomplete'}
        </Badge>
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

const ModulesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

const ModuleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
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

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`
