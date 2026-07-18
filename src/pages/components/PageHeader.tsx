import styled from 'styled-components'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Header>
      <Title>{title}</Title>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
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

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`
