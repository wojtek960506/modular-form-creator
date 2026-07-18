import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { Card } from '@design-system/components/Card'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { PageHeader } from '@pages/components/PageHeader'
import { ReadonlyField } from '@pages/components/ReadonlyField'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import { getErrorMessage, getResource, resourceQueryKey } from '@resources-api'
import { isBasicInfoComplete } from '@resources/resourceCompletion'

export function ProjectDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()

  const resourceQuery = useQuery({
    queryKey: resourceQueryKey(resourceId ?? ''),
    queryFn: () => getResource(resourceId ?? ''),
    enabled: Boolean(resourceId),
  })

  const resource = resourceQuery.data
  const locked = resource ? !isBasicInfoComplete(resource.basicInfo) : false

  return (
    <PageCard>
      <BackButton onClick={() => navigate(`/resources/${resourceId}`)}>
        Back to overview
      </BackButton>

      {resourceQuery.isLoading ? <StateMessage>Loading Project Details...</StateMessage> : null}

      {resourceQuery.isError ? (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      ) : null}

      {resource ? (
        <>
          <PageHeader title="Project Details" subtitle={resource.name} />

          {locked ? (
            <Card variant="outline">
              <LockedTitle>Project Details are locked</LockedTitle>
              <StateMessage>Complete Basic Info before opening this module.</StateMessage>
              <Button
                type="button"
                onClick={() => navigate(`/resources/${resource.resourceId}/basic-info`)}
              >
                Open Basic Info
              </Button>
            </Card>
          ) : (
            <Card variant="outline">
              <ReadonlyField label="Project name" value={resource.projectDetails.projectName} />
              <ReadonlyField label="Budget" value={resource.projectDetails.budget} />
              <ReadonlyField label="Category" value={resource.projectDetails.category} />
              <ReadonlyField
                label="Options"
                value={
                  resource.projectDetails.options.length > 0
                    ? resource.projectDetails.options.join(', ')
                    : undefined
                }
              />
            </Card>
          )}
        </>
      ) : null}
    </PageCard>
  )
}

const LockedTitle = styled.h2`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-size: 1.125rem;
`
