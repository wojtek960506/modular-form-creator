import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import { getErrorMessage } from '@resources-api'
import {
  useProvisionResourceMutation,
  useReplaceResourceMutation,
  useResourceQuery,
} from '@resources/queries'
import { ResourceOverviewContent } from './components/ResourceOverviewContent'
import { useResourceDrafts } from './resource-drafts'

export function ResourceOverviewPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const { clearDraft, getDraftChangeCounts, getDraftResource } = useResourceDrafts()

  const resourceQuery = useResourceQuery(resourceId)
  const provisionResourceMutation = useProvisionResourceMutation()
  const updateResourceMutation = useReplaceResourceMutation({
    onSuccess: (resource) => {
      clearDraft(String(resource.resourceId))
    },
  })

  const resource = resourceQuery.data
  const draftResource = resource ? getDraftResource(resource) : undefined
  const draftChangeCounts = resource
    ? getDraftChangeCounts(resource)
    : { basicInfo: 0, projectDetails: 0, total: 0 }

  return (
    <PageCard>
      <BackButton onClick={() => navigate('/resources')}>
        Back to resources
      </BackButton>

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
          onOpenProjectDetails={() => navigate(`/resources/${draftResource.resourceId}/project-details`)}
          onOpenDetails={() => navigate(`/resources/${draftResource.resourceId}/details`)}
          onCompleteResource={() => provisionResourceMutation.mutate(String(draftResource.resourceId))}
          onDiscardChanges={() => clearDraft(String(draftResource.resourceId))}
          onUpdateResource={() => updateResourceMutation.mutate(draftResource)}
        />
      )}
    </PageCard>
  )
}
