import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { Card } from '@design-system/components/Card'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { PageHeader } from '@pages/components/PageHeader'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import {
  getErrorMessage,
  getResource,
  resourceQueryKey,
  updateProjectDetails,
} from '@resources-api'
import { isBasicInfoComplete } from '@resources/resourceCompletion'
import { ProjectDetailsForm, type ProjectDetailsPayload } from './project-details'
import { useResourceDrafts } from './resource-drafts'

export function ProjectDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { getDraftResource, updateProjectDetailsDraft } = useResourceDrafts()

  const resourceQuery = useQuery({
    queryKey: resourceQueryKey(resourceId ?? ''),
    queryFn: () => getResource(resourceId ?? ''),
    enabled: Boolean(resourceId),
  })
  const updateProjectDetailsMutation = useMutation({
    mutationFn: (values: ProjectDetailsPayload) => updateProjectDetails(resourceId ?? '', values),
    onSuccess: async (resource) => {
      await queryClient.setQueryData(resourceQueryKey(String(resource.resourceId)), resource)
    },
  })

  const resource = resourceQuery.data
  const draftResource = resource ? getDraftResource(resource) : undefined
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

      {resourceQuery.isLoading ? <StateMessage>Loading Project Details...</StateMessage> : null}

      {resourceQuery.isError ? (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      ) : null}

      {updateProjectDetailsMutation.isError ? (
        <FeedbackMessage>{getErrorMessage(updateProjectDetailsMutation.error)}</FeedbackMessage>
      ) : null}

      {draftResource ? (
        <>
          <PageHeader title="Project Details" subtitle={draftResource.name} />

          {locked ? (
            <Card variant="outline">
              <LockedTitle>Project Details are locked</LockedTitle>
              <StateMessage>Complete Basic Info before opening this module.</StateMessage>
              <Button
                type="button"
                onClick={() => navigate(`/resources/${draftResource.resourceId}/basic-info`)}
              >
                Open Basic Info
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
              saveLabel={isCompleted ? 'Save draft changes' : undefined}
            />
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
