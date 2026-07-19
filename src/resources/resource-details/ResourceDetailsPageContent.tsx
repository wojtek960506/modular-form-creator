import { useNavigate, useParams } from 'react-router-dom'
import { getErrorMessage } from '@resources/api'
import { BasicInfoSection } from '@resources/basic-info'
import { ProjectDetailsSection } from '@resources/project-details'
import { useResource } from '@resources/resource'
import { BackButton, FeedbackMessage, PageCard, StateMessage } from '@shared/ui'
import { ResourceDetailsHeader } from './ResourceDetailsHeader'

export function ResourceDetailsPageContent() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const { draft, draftChangeCounts, draftResource, resource, resourceQuery } = useResource()

  return (
    <PageCard>
      <BackButton onClick={() => navigate(`/resources/${resourceId}`)}>
        Back to overview
      </BackButton>

      {resourceQuery.isLoading && <StateMessage>Loading resource...</StateMessage>}

      {resourceQuery.isError && (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      )}

      {resource && draftResource && (
        <>
          <ResourceDetailsHeader
            resource={draftResource}
            unsavedChangesCount={draftChangeCounts.total}
          />
          <BasicInfoSection
            draftBasicInfo={draft?.basicInfo}
            resource={draftResource}
            persistedResource={resource}
            unsavedChangesCount={draftChangeCounts.basicInfo}
          />
          <ProjectDetailsSection
            draftProjectDetails={draft?.projectDetails}
            resource={draftResource}
            persistedResource={resource}
            unsavedChangesCount={draftChangeCounts.projectDetails}
          />
        </>
      )}
    </PageCard>
  )
}
