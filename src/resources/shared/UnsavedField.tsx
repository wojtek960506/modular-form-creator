import styled from 'styled-components'

interface UnsavedFieldProps {
  changed: boolean
  children: React.ReactNode
}

export function UnsavedField({ changed, children }: UnsavedFieldProps) {
  return <UnsavedFieldFrame $changed={changed}>{children}</UnsavedFieldFrame>
}

const UnsavedFieldFrame = styled.div<{ $changed: boolean }>`
  border-left: 3px solid
    ${({ $changed, theme }) => ($changed ? theme.colors.warning : 'transparent')};
  padding-left: ${({ $changed, theme }) => ($changed ? theme.spacing.sm : '0')};
`
