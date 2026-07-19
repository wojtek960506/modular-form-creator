import { useNavigate, useParams } from 'react-router-dom'
import { getErrorMessage } from '@resources/api'
import { BasicInfoSection } from '@resources/components/BasicInfoSection'
import { ProjectDetailsSection } from '@resources/components/ProjectDetailsSection'
import { ResourceDetailsHeader } from '@resources/components/ResourceDetailsHeader'
import { useResourceQuery } from '@resources/queries'
import { useResourceDrafts } from '@resources/resource-drafts'
import { BackButton, FeedbackMessage, PageCard, StateMessage } from '@shared/ui'

export function ResourceDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()
  const { getDraft, getDraftChangeCounts, getDraftResource } = useResourceDrafts()

  const resourceQuery = useResourceQuery(resourceId)
  const resource = resourceQuery.data
  const draftResource = resource ? getDraftResource(resource) : undefined
  const draftChangeCounts = resource
    ? getDraftChangeCounts(resource)
    : { basicInfo: 0, projectDetails: 0, total: 0 }

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
            draftBasicInfo={getDraft(String(resource.resourceId))?.basicInfo}
            resource={draftResource}
            persistedResource={resource}
            unsavedChangesCount={draftChangeCounts.basicInfo}
          />
          <ProjectDetailsSection
            draftProjectDetails={getDraft(String(resource.resourceId))?.projectDetails}
            resource={draftResource}
            persistedResource={resource}
            unsavedChangesCount={draftChangeCounts.projectDetails}
          />
        </>
      )}
    </PageCard>
  )
}
