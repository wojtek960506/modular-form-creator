import styled from 'styled-components'

export function ResourcesHeader() {
  return (
    <Header>
      <Title>Resources</Title>
      <Subtitle>
        Create a resource first, then we can build the rest of the flow on top of it.
      </Subtitle>
    </Header>
  )
}

const Header = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 2.75rem);
  color: ${({ theme }) => theme.colors.inkStrong};
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`
