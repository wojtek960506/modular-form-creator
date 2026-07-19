import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { Badge } from '@design-system/components/Badge'
import { Card } from '@design-system/components/Card'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { PageHeader } from '@pages/components/PageHeader'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import { getErrorMessage } from '@resources-api'
import { useResourceQuery, useUpdateProjectDetailsMutation } from '@resources/queries'
import { isBasicInfoComplete } from '@resources/resourceCompletion'
import { ProjectDetailsForm, type ProjectDetailsPayload } from './project-details'
import { useResourceDrafts } from './resource-drafts'

export function ProjectDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const { getDraftChangeCounts, getDraftResource, updateProjectDetailsDraft } = useResourceDrafts()

  const resourceQuery = useResourceQuery(resourceId)
  const updateProjectDetailsMutation = useUpdateProjectDetailsMutation(resourceId)

  const resource = resourceQuery.data
  const draftResource = resource ? getDraftResource(resource) : undefined
  const draftChangeCounts = resource
    ? getDraftChangeCounts(resource)
    : { basicInfo: 0, projectDetails: 0, total: 0 }
  const isCompleted = resource?.status === 'completed'
  const locked = draftResource
    ? draftResource.status === 'draft' && !isBasicInfoComplete(draftResource.basicInfo)
    : false

  async function submitProjectDetails(values: ProjectDetailsPayload) {
    if (isCompleted && resourceId) {
      updateProjectDetailsDraft(resourceId, values)
      return
    }

    return updateProjectDetailsMutation.mutateAsync(values)
  }

  return (
    <PageCard>
      <BackButton onClick={() => navigate(`/resources/${resourceId}`)}>
        Back to overview
      </BackButton>

      {resourceQuery.isLoading && <StateMessage>Loading Project Details...</StateMessage>}

      {resourceQuery.isError && (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      )}

      {updateProjectDetailsMutation.isError && (
        <FeedbackMessage>{getErrorMessage(updateProjectDetailsMutation.error)}</FeedbackMessage>
      )}

      {draftResource && (
        <>
          <PageHeader
            title="Project Details"
            subtitle={draftResource.name}
            meta={
              draftChangeCounts.total > 0 ? (
                <>
                  <Badge variant="warning">
                    {draftChangeCounts.projectDetails} unsaved here
                  </Badge>
                  <Badge variant="warning">
                    {draftChangeCounts.total} unsaved in total
                  </Badge>
                </>
              ) : undefined
            }
          />

          {locked ? (
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
          ) : (
            <ProjectDetailsForm
              key={draftResource.updatedAt}
              disabled={false}
              isSubmitting={updateProjectDetailsMutation.isPending}
              projectDetails={draftResource.projectDetails}
              onSubmit={submitProjectDetails}
              persistedProjectDetails={isCompleted ? resource?.projectDetails : undefined}
              saveLabel={isCompleted ? 'Save draft changes' : 'Save changes'}
              startInEditMode={!isCompleted}
            />
          )}
        </>
      )}
    </PageCard>
  )
}

const LockedTitle = styled.h2`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-size: 1.125rem;
`
