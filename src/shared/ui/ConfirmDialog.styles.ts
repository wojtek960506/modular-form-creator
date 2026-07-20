import { Button } from '@design-system/components/Button'
import styled from 'styled-components'

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(9, 12, 16, 0.48);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
  z-index: 30;
`

export const Panel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  width: min(480px, 100%);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.raised};
`

export const Header = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.inkStrong};
`

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.inkMuted};
  overflow-wrap: anywhere;
  word-break: break-word;
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const ConfirmButton = styled(Button)`
  color: ${({ theme }) => theme.colors.warning};

  &:not(:disabled):hover {
    border-color: ${({ theme }) => theme.colors.warning};
    background: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.warning};
  }
`
