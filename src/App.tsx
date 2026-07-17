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
  align-items: center;
  justify-content: center;
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
`

export default App
