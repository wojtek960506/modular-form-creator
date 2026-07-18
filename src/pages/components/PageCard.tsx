import styled, { css } from 'styled-components'

interface PageCardProps {
  $scrollLayout?: boolean
}

export const PageCard = styled.div<PageCardProps>`
  width: min(100%, 720px);
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  align-content: start;

  ${({ $scrollLayout, theme }) =>
    $scrollLayout
      ? css`
          @media (min-height: 700px) {
            grid-template-rows: auto auto minmax(0, 1fr);
            min-height: calc(100vh - ${theme.spacing.xl} * 2);
            max-height: calc(100vh - ${theme.spacing.xl} * 2);
            overflow: hidden;
          }
        `
      : null}
`
