import { useEffect } from 'react'
import { Button } from '@design-system/components/Button'
import {
  Actions,
  ConfirmButton,
  Description,
  Header,
  Overlay,
  Panel,
  Title,
} from './ConfirmDialog.styles'

interface ConfirmDialogProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
  isConfirming?: boolean
}

export function ConfirmDialog({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isConfirming = false,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen || isConfirming) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isConfirming, isOpen, onClose])

  return (
    <Overlay
      $isOpen={isOpen}
      onClick={() => {
        if (!isConfirming) {
          onClose()
        }
      }}
      aria-hidden={!isOpen}
    >
      <Panel
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Header>

        <Actions>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isConfirming}>
            {cancelLabel}
          </Button>
          <ConfirmButton type="button" variant="secondary" onClick={onConfirm} disabled={isConfirming}>
            {isConfirming ? 'Deleting...' : confirmLabel}
          </ConfirmButton>
        </Actions>
      </Panel>
    </Overlay>
  )
}
