import type { ReactNode } from 'react'
import styled from 'styled-components'

interface ReadonlyFieldProps {
  label: string
  value?: ReactNode
}

export function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <FieldValue>{isEmptyValue(value) ? 'Not provided' : value}</FieldValue>
    </Field>
  )
}

function isEmptyValue(value: ReactNode) {
  return value === undefined || value === null || value === ''
}

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

const FieldLabel = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
`

const FieldValue = styled.p`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-weight: 600;
`
