import styled from 'styled-components'

export const Header = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const HeaderTitle = styled.h1`
  color: ${({ theme }) => theme.colors.inkStrong};
  overflow-wrap: anywhere;
  word-break: break-word;
`

export const HeaderTitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const HeaderMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.inkMuted};
`

export const HeaderSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  overflow-wrap: anywhere;
  word-break: break-word;
`
