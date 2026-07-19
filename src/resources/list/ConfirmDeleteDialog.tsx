import type { Resource } from '@resources/api'
import { useDeleteResourceMutation } from '@resources/queries'
import { ConfirmDialog } from '@shared/ui'

interface ConfirmDeleteDialogProps {
  resource: Resource | null
  onClose: () => void
}

export function ConfirmDeleteDialog({ resource, onClose }: ConfirmDeleteDialogProps) {
  const deleteResourceMutation = useDeleteResourceMutation({
    onSettled: () => {
      onClose()
    },
  })

  return (
    <ConfirmDialog
      title="Delete resource?"
      description={resource ? `This will permanently delete "${resource.name}".` : ''}
      isOpen={resource !== null}
      isConfirming={deleteResourceMutation.isPending}
      confirmLabel="Delete"
      onClose={onClose}
      onConfirm={() => {
        if (resource) {
          deleteResourceMutation.mutate(String(resource.resourceId))
        }
      }}
    />
  )
}
