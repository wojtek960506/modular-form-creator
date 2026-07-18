import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { PageHeader } from '@pages/components/PageHeader'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import {
  getErrorMessage,
  getResource,
  resourceQueryKey,
  updateBasicInfo,
} from '@resources-api'
import { BasicInfoForm, type BasicInfoPayload } from './basic-info'

export function BasicInfoPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const resourceQuery = useQuery({
    queryKey: resourceQueryKey(resourceId ?? ''),
    queryFn: () => getResource(resourceId ?? ''),
    enabled: Boolean(resourceId),
  })
  const updateBasicInfoMutation = useMutation({
    mutationFn: (values: BasicInfoPayload) => updateBasicInfo(resourceId ?? '', values),
    onSuccess: async (resource) => {
      await queryClient.setQueryData(resourceQueryKey(String(resource.resourceId)), resource)
    },
  })

  const resource = resourceQuery.data
  const formLocked = resource?.status === 'completed'

  return (
    <PageCard>
      <BackButton onClick={() => navigate(`/resources/${resourceId}`)}>
        Back to overview
      </BackButton>

      {resourceQuery.isLoading && <StateMessage>Loading Basic Info...</StateMessage>}

      {resourceQuery.isError && (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      )}

      {updateBasicInfoMutation.isError && (
        <FeedbackMessage>{getErrorMessage(updateBasicInfoMutation.error)}</FeedbackMessage>
      )}

      {formLocked && (
        <FeedbackMessage>
          Completed resources cannot be updated through module PATCH endpoints.
        </FeedbackMessage>
      )}

      {resource && (
        <>
          <PageHeader title="Basic Info" subtitle={resource.name} />
          <BasicInfoForm
            basicInfo={resource.basicInfo}
            disabled={formLocked}
            isSubmitting={updateBasicInfoMutation.isPending}
            onSubmit={(values) => updateBasicInfoMutation.mutate(values)}
          />
        </>
      )}
    </PageCard>
  )
}
