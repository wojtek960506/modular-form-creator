import styled from 'styled-components'
import { Button } from '@design-system/components/Button'

interface ModuleFormActionsProps {
  disabled: boolean
  editLabel: string
  editing: boolean
  isDirty: boolean
  isSubmitting: boolean
  onCancel: () => void
  onEdit: () => void
}

export function ModuleFormActions({
  disabled,
  editLabel,
  editing,
  isDirty,
  isSubmitting,
  onCancel,
  onEdit,
}: ModuleFormActionsProps) {
  return (
    <Actions>
      {editing && (
        <>
          <Button type="submit" disabled={isSubmitting || disabled || !isDirty}>
            {isSubmitting ? 'Saving...' : 'Save changes'}
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
          disabled={disabled}
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
