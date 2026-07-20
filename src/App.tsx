import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { BasicInfoPage } from '@resources/pages/BasicInfoPage'
import { ProjectDetailsPage } from '@resources/pages/ProjectDetailsPage'
import { ResourceDetailsPage } from '@resources/pages/ResourceDetailsPage'
import { ResourceOverviewPage } from '@resources/pages/ResourceOverviewPage'
import { ResourcesPage } from '@resources/pages/ResourcesPage'
import { ResourceDraftsProvider } from '@resources/resource-drafts'

function App() {
  return (
    <AppShell>
      <ResourceDraftsProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/resources" replace />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:resourceId" element={<ResourceOverviewPage />} />
          <Route path="/resources/:resourceId/details" element={<ResourceDetailsPage />} />
          <Route path="/resources/:resourceId/basic-info" element={<BasicInfoPage />} />
          <Route path="/resources/:resourceId/project-details" element={<ProjectDetailsPage />} />
        </Routes>
      </ResourceDraftsProvider>
    </AppShell>
  )
}

const AppShell = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.xl};
  min-width: 24rem;
  justify-content: center;
  overflow-x: auto;
  overflow-y: auto;
`

export default App
