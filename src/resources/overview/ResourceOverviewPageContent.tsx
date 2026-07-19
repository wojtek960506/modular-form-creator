import { getErrorMessage } from '@resources/api'
import { useProvisionResourceMutation, useReplaceResourceMutation } from '@resources/queries'
import { useResource } from '@resources/resource'
import { BackButton, FeedbackMessage, PageCard, StateMessage } from '@shared/ui'
import { ResourceOverviewContent } from './ResourceOverviewContent'

export function ResourceOverviewPageContent() {
  const { clearDraft, draftResource, resourceQuery } = useResource()
  const provisionResourceMutation = useProvisionResourceMutation()
  const updateResourceMutation = useReplaceResourceMutation({
    onSuccess: (resource) => {
      clearDraft(String(resource.resourceId))
    },
  })

  return (
    <PageCard>
      <BackButton />

      {resourceQuery.isLoading && <StateMessage>Loading resource...</StateMessage>}

      {resourceQuery.isError && (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      )}

      {provisionResourceMutation.isError && (
        <FeedbackMessage>
          {getErrorMessage(provisionResourceMutation.error)}
        </FeedbackMessage>
      )}

      {updateResourceMutation.isError && (
        <FeedbackMessage>
          {getErrorMessage(updateResourceMutation.error)}
        </FeedbackMessage>
      )}

      {draftResource && (
        <ResourceOverviewContent
          isCompleting={provisionResourceMutation.isPending}
          isUpdating={updateResourceMutation.isPending}
          onCompleteResource={() =>
            provisionResourceMutation.mutate(String(draftResource.resourceId))
          }
          onUpdateResource={() => updateResourceMutation.mutate(draftResource)}
        />
      )}
    </PageCard>
  )
}
