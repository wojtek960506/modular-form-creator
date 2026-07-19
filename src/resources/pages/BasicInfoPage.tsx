import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { PageHeader } from '@pages/components/PageHeader'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import { Badge } from '@design-system/components/Badge'
import { getErrorMessage } from '@resources/api'
import { BasicInfoForm, type BasicInfoPayload } from '@resources/basic-info'
import { useResourceQuery, useUpdateBasicInfoMutation } from '@resources/queries'
import { useResourceDrafts } from '@resources/resource-drafts'

export function BasicInfoPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const { getDraftChangeCounts, getDraftResource, updateBasicInfoDraft } = useResourceDrafts()

  const resourceQuery = useResourceQuery(resourceId)
  const updateBasicInfoMutation = useUpdateBasicInfoMutation(resourceId)

  const resource = resourceQuery.data
  const draftResource = resource ? getDraftResource(resource) : undefined
  const draftChangeCounts = resource
    ? getDraftChangeCounts(resource)
    : { basicInfo: 0, projectDetails: 0, total: 0 }
  const isCompleted = resource?.status === 'completed'

  async function submitBasicInfo(values: BasicInfoPayload) {
    if (isCompleted && resourceId) {
      updateBasicInfoDraft(resourceId, values)
      return
    }

    return updateBasicInfoMutation.mutateAsync(values)
  }

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

      {draftResource && (
        <>
          <PageHeader
            title="Basic Info"
            subtitle={draftResource.name}
            meta={
              draftChangeCounts.total > 0 ? (
                <>
                  <Badge variant="warning">
                    {draftChangeCounts.basicInfo} unsaved here
                  </Badge>
                  <Badge variant="warning">
                    {draftChangeCounts.total} unsaved in total
                  </Badge>
                </>
              ) : undefined
            }
          />
          <BasicInfoForm
            key={draftResource.updatedAt}
            basicInfo={draftResource.basicInfo}
            disabled={false}
            isSubmitting={updateBasicInfoMutation.isPending}
            onSubmit={submitBasicInfo}
            persistedBasicInfo={isCompleted ? resource?.basicInfo : undefined}
            saveLabel={isCompleted ? 'Save draft changes' : 'Save changes'}
            startInEditMode={!isCompleted}
          />
        </>
      )}
    </PageCard>
  )
}
