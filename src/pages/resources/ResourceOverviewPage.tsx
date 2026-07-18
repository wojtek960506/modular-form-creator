import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import {
  getErrorMessage,
  getResource,
  provisionResource,
  resourceQueryKey,
} from '@resources-api'
import { ResourceOverviewContent } from './components/ResourceOverviewContent'

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
        <ResourceOverviewContent
          resource={resource}
          isCompleting={provisionResourceMutation.isPending}
          onOpenBasicInfo={() => navigate(`/resources/${resource.resourceId}/basic-info`)}
          onOpenProjectDetails={() => navigate(`/resources/${resource.resourceId}/project-details`)}
          onOpenDetails={() => navigate(`/resources/${resource.resourceId}/details`)}
          onCompleteResource={() => provisionResourceMutation.mutate(String(resource.resourceId))}
        />
      ) : null}
    </PageCard>
  )
}
