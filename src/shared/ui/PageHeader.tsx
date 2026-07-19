import styled from 'styled-components'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  meta?: ReactNode
  title: string
  subtitle?: string
}

export function PageHeader({ meta, title, subtitle }: PageHeaderProps) {
  return (
    <Header>
      <TitleRow>
        <Title>{title}</Title>
      </TitleRow>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {meta && <Meta>{meta}</Meta>}
    </Header>
  )
}

const Header = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.inkStrong};
`

const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`
