import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import { Button } from '@design-system/components/Button'
import { Card } from '@design-system/components/Card'
import { getErrorMessage } from '@resources/api'
import { useUpdateProjectDetailsMutation } from '@resources/queries'
import { useResource } from '@resources/resource'
import { isBasicInfoComplete, isProjectDetailsComplete } from '@resources/resourceCompletion'
import { BackButton, FeedbackMessage, PageCard, PageHeader, StateMessage } from '@shared/ui'
import { ProjectDetailsForm } from './ProjectDetailsForm'
import type { ProjectDetailsPayload } from './projectDetailsForm.types'

const LockedTitle = styled.h2`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-size: 1.125rem;
`

export function ProjectDetailsPageContent() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const {
    draftChangeCounts,
    draftResource,
    isCompleted,
    resource,
    resourceQuery,
    updateProjectDetailsDraft,
  } = useResource()
  const updateProjectDetailsMutation = useUpdateProjectDetailsMutation(resourceId)
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
              startInEditMode={!isProjectDetailsComplete(draftResource.projectDetails)}
            />
          )}
        </>
      )}
    </PageCard>
  )
}
