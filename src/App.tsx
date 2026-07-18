import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { ResourceDetailsPage } from '@pages/resources/ResourceDetailsPage'
import { ResourcesPage } from '@pages/resources/ResourcesPage'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/resources" replace />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:resourceId" element={<ResourceDetailsPage />} />
      </Routes>
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

export default App
