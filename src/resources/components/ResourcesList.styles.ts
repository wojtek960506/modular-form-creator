import styled from 'styled-components'

export const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-height: 700px) {
    grid-template-rows: auto minmax(0, 1fr);
    min-height: 0;
  }
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
`

export const SectionMeta = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
`

export const List = styled.ul`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-height: 700px) {
    min-height: 0;
    overflow: auto;
  }
`

export const ResourceItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

export const ResourceItemLink = styled.a`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  color: inherit;
  text-decoration: none;
`

export const ResourceName = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.inkStrong};
`

export const ResourceMeta = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
`

export const StateMessage = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`

export const FeedbackMessage = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.warning};
`

export const EmptyState = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

export const EmptyStateTitle = styled.h3`
  font-size: 1.1rem;
`

export const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`
