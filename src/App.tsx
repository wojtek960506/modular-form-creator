import styled from 'styled-components'
import { CreateResourceForm } from './resources/components/CreateResourceForm'
import { ResourcesHeader } from './resources/components/ResourcesHeader'
import { ResourcesList } from './resources/components/ResourcesList'

function App() {
  return (
    <AppShell>
      <ContentCard>
        <ResourcesHeader />
        <CreateResourceForm />
        <ResourcesList />
      </ContentCard>
    </AppShell>
  )
}

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  padding: ${({ theme }) => theme.spacing.xl};
  justify-content: center;

  @media (min-height: 700px) {
    align-items: stretch;
    overflow: hidden;
  }
`

const ContentCard = styled.div`
  width: min(100%, 720px);
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (min-height: 700px) {
    grid-template-rows: auto auto minmax(0, 1fr);
    min-height: calc(100vh - ${({ theme }) => theme.spacing.xl} * 2);
    max-height: calc(100vh - ${({ theme }) => theme.spacing.xl} * 2);
    overflow: hidden;
  }
`

export default App
