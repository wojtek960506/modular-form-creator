import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { BasicInfoPage } from '@pages/resources/BasicInfoPage'
import { ProjectDetailsPage } from '@pages/resources/ProjectDetailsPage'
import { ResourceDetailsPage } from '@pages/resources/ResourceDetailsPage'
import { ResourceOverviewPage } from '@pages/resources/ResourceOverviewPage'
import { ResourcesPage } from '@pages/resources/ResourcesPage'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/resources" replace />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:resourceId" element={<ResourceOverviewPage />} />
        <Route path="/resources/:resourceId/details" element={<ResourceDetailsPage />} />
        <Route path="/resources/:resourceId/basic-info" element={<BasicInfoPage />} />
        <Route path="/resources/:resourceId/project-details" element={<ProjectDetailsPage />} />
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
