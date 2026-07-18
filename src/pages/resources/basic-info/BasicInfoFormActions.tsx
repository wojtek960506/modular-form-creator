import styled from 'styled-components'
import { Button } from '@design-system/components/Button'

interface BasicInfoFormActionsProps {
  disabled: boolean
  editing: boolean
  isDirty: boolean
  isSubmitting: boolean
  onCancel: () => void
  onEdit: () => void
}

export function BasicInfoFormActions({
  disabled,
  editing,
  isDirty,
  isSubmitting,
  onCancel,
  onEdit,
}: BasicInfoFormActionsProps) {
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
          Edit Basic Info
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
