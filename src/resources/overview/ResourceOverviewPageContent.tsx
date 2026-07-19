import { useNavigate } from 'react-router-dom'
import { getErrorMessage } from '@resources/api'
import { useProvisionResourceMutation, useReplaceResourceMutation } from '@resources/queries'
import { useResource } from '@resources/resource'
import { BackButton, FeedbackMessage, PageCard, StateMessage } from '@shared/ui'
import { ResourceOverviewContent } from './ResourceOverviewContent'

export function ResourceOverviewPageContent() {
  const navigate = useNavigate()
  const { clearDraft, draftChangeCounts, draftResource, resourceQuery } = useResource()
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
          resource={draftResource}
          unsavedChangesCount={draftChangeCounts.total}
          basicInfoUnsavedChangesCount={draftChangeCounts.basicInfo}
          projectDetailsUnsavedChangesCount={draftChangeCounts.projectDetails}
          isCompleting={provisionResourceMutation.isPending}
          isUpdating={updateResourceMutation.isPending}
          onOpenBasicInfo={() => navigate(`/resources/${draftResource.resourceId}/basic-info`)}
          onOpenProjectDetails={() => navigate(
            `/resources/${draftResource.resourceId}/project-details`
          )}
          onOpenDetails={() => navigate(`/resources/${draftResource.resourceId}/details`)}
          onCompleteResource={() => provisionResourceMutation.mutate(
            String(draftResource.resourceId
          ))}
          onDiscardChanges={() => clearDraft(String(draftResource.resourceId))}
          onUpdateResource={() => updateResourceMutation.mutate(draftResource)}
        />
      )}
    </PageCard>
  )
}
