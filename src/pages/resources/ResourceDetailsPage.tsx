import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
import { getErrorMessage } from '@resources-api'
import { useResourceQuery } from '@resources/queries'
import { BasicInfoSection } from './components/BasicInfoSection'
import { ProjectDetailsSection } from './components/ProjectDetailsSection'
import { ResourceDetailsHeader } from './components/ResourceDetailsHeader'
import { useResourceDrafts } from './resource-drafts'

export function ResourceDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const { getDraft, getDraftResource, hasDraftChanges } = useResourceDrafts()

  const resourceQuery = useResourceQuery(resourceId)

  return (
    <PageCard>
      <BackButton onClick={() => navigate(`/resources/${resourceId}`)}>
        Back to overview
      </BackButton>

      {resourceQuery.isLoading ? <StateMessage>Loading resource...</StateMessage> : null}

      {resourceQuery.isError ? (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      ) : null}

      {resourceQuery.data ? (
        <>
          <ResourceDetailsHeader
            resource={getDraftResource(resourceQuery.data)}
            hasUnsavedChanges={hasDraftChanges(String(resourceQuery.data.resourceId))}
          />
          <BasicInfoSection
            draftBasicInfo={getDraft(String(resourceQuery.data.resourceId))?.basicInfo}
            resource={getDraftResource(resourceQuery.data)}
            persistedResource={resourceQuery.data}
          />
          <ProjectDetailsSection
            draftProjectDetails={getDraft(String(resourceQuery.data.resourceId))?.projectDetails}
            resource={getDraftResource(resourceQuery.data)}
            persistedResource={resourceQuery.data}
          />
        </>
      ) : null}
    </PageCard>
  )
}
