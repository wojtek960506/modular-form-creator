import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import { SectionTitle, Term, TermRow } from './ResourceDetailsSections.styles'

interface ResourceDetailsSectionHeaderProps {
  title: string
  unsavedChangesLabel?: string
}

interface ResourceDetailsFieldTermProps {
  changed: boolean
  label: string
}

export function ResourceDetailsSectionHeader({
  title,
  unsavedChangesLabel,
}: ResourceDetailsSectionHeaderProps) {
  return (
    <SectionHeader>
      <SectionTitle>{title}</SectionTitle>
      {unsavedChangesLabel && <Badge variant="warning">{unsavedChangesLabel}</Badge>}
    </SectionHeader>
  )
}

export function ResourceDetailsFieldTerm({
  changed,
  label,
}: ResourceDetailsFieldTermProps) {
  return (
    <TermRow>
      <Term>{label}</Term>
      {changed && <Badge variant="warning">Unsaved</Badge>}
    </TermRow>
  )
}

const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`
