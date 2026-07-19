import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import {
  getErrorMessage,
  getResource,
  provisionResource,
  replaceResource,
  resourceQueryKey,
} from '@resources-api'
import { ResourceOverviewContent } from './components/ResourceOverviewContent'
import { useResourceDrafts } from './resource-drafts'

export function ResourceOverviewPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { clearDraft, getDraftResource, hasDraftChanges } = useResourceDrafts()

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
  const updateResourceMutation = useMutation({
    mutationFn: (resource: NonNullable<typeof resourceQuery.data>) =>
      replaceResource(String(resource.resourceId), {
        name: resource.name,
        basicInfo: resource.basicInfo,
        projectDetails: resource.projectDetails,
      }),
    onSuccess: async (resource) => {
      clearDraft(String(resource.resourceId))
      await queryClient.setQueryData(resourceQueryKey(String(resource.resourceId)), resource)
    },
  })

  const resource = resourceQuery.data
  const draftResource = resource ? getDraftResource(resource) : undefined
  const hasBufferedChanges = resource ? hasDraftChanges(String(resource.resourceId)) : false

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

      {updateResourceMutation.isError ? (
        <FeedbackMessage>
          {getErrorMessage(updateResourceMutation.error)}
        </FeedbackMessage>
      ) : null}

      {draftResource ? (
        <ResourceOverviewContent
          resource={draftResource}
          hasBufferedChanges={hasBufferedChanges}
          isCompleting={provisionResourceMutation.isPending}
          isUpdating={updateResourceMutation.isPending}
          onOpenBasicInfo={() => navigate(`/resources/${draftResource.resourceId}/basic-info`)}
          onOpenProjectDetails={() => navigate(`/resources/${draftResource.resourceId}/project-details`)}
          onOpenDetails={() => navigate(`/resources/${draftResource.resourceId}/details`)}
          onCompleteResource={() => provisionResourceMutation.mutate(String(draftResource.resourceId))}
          onUpdateResource={() => updateResourceMutation.mutate(draftResource)}
        />
      ) : null}
    </PageCard>
  )
}
