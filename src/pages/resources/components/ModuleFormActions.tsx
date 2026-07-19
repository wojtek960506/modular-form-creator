import styled from 'styled-components'
import { Button } from '@design-system/components/Button'

interface ModuleFormActionsProps {
  editLabel: string
  editing: boolean
  isDirty: boolean
  isSubmitting: boolean
  onCancel: () => void
  onEdit: () => void
  saveLabel?: string
}

export function ModuleFormActions({
  editLabel,
  editing,
  isDirty,
  isSubmitting,
  onCancel,
  onEdit,
  saveLabel = 'Save changes',
}: ModuleFormActionsProps) {
  return (
    <Actions>
      {editing && (
        <>
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? 'Saving...' : saveLabel}
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </>
      )}

      {!editing && (
        <Button
          type="button"
          variant="secondary"
          onClick={onEdit}
        >
          {editLabel}
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
