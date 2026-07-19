import { useParams } from 'react-router-dom'
import { Badge } from '@design-system/components/Badge'
import { getErrorMessage } from '@resources/api'
import { useUpdateBasicInfoMutation } from '@resources/queries'
import { useResource } from '@resources/resource'
import { isBasicInfoComplete } from '@resources/resourceCompletion'
import { BackButton, FeedbackMessage, PageCard, PageHeader, StateMessage } from '@shared/ui'
import { BasicInfoForm } from './BasicInfoForm'
import type { BasicInfoPayload } from './basicInfoForm.types'

export function BasicInfoPageContent() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const {
    draftChangeCounts,
    draftResource,
    isCompleted,
    resource,
    resourceQuery,
    updateBasicInfoDraft,
  } = useResource()
  const updateBasicInfoMutation = useUpdateBasicInfoMutation(resourceId)

  async function submitBasicInfo(values: BasicInfoPayload) {
    if (isCompleted && resourceId) {
      updateBasicInfoDraft(resourceId, values)
      return
    }

    return updateBasicInfoMutation.mutateAsync(values)
  }

  return (
    <PageCard>
      <BackButton resourceId={resourceId} />

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
            startInEditMode={!isBasicInfoComplete(draftResource.basicInfo)}
          />
        </>
      )}
    </PageCard>
  )
}
