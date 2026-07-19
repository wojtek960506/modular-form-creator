import styled from 'styled-components'

export const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-size: 1.125rem;
`

export const DefinitionList = styled.dl`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

export const Term = styled.dt`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
`

export const TermRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const Description = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.inkStrong};
  font-weight: 600;
  overflow-wrap: anywhere;
  word-break: break-word;
`
