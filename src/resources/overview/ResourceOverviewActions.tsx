import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { useResource } from '@resources/resource'
import { canProvisionResource } from '@resources/resourceCompletion'

interface ResourceOverviewActionsProps {
  isCompleting: boolean
  isUpdating: boolean
  onCompleteResource: () => void
  onUpdateResource: () => void
}

export function ResourceOverviewActions({
  isCompleting,
  isUpdating,
  onCompleteResource,
  onUpdateResource,
}: ResourceOverviewActionsProps) {
  const { clearDraft, draftChangeCounts, draftResource } = useResource()

  if (!draftResource) return null

  const resource = draftResource
  const unsavedChangesCount = draftChangeCounts.total

  return (
    <Actions>
      {resource.status === 'completed' ? (
        <>
          <Button
            type="button"
            disabled={unsavedChangesCount === 0 || isUpdating}
            onClick={onUpdateResource}
          >
            {isUpdating ? 'Updating...' : 'Update resource'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={unsavedChangesCount === 0 || isUpdating}
            onClick={() => clearDraft(String(resource.resourceId))}
          >
            Discard changes
          </Button>
        </>
      ) : (
        <Button
          type="button"
          state={canProvisionResource(resource) ? 'normal' : 'locked'}
          disabled={isCompleting}
          onClick={onCompleteResource}
        >
          {isCompleting ? 'Completing...' : 'Complete resource'}
        </Button>
      )}
    </Actions>
  )
}

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`
