import { useParams } from 'react-router-dom'
import { getErrorMessage } from '@resources/api'
import { BasicInfoSection } from '@resources/basic-info'
import { ProjectDetailsSection } from '@resources/project-details'
import { useResource } from '@resources/resource'
import { BackButton, FeedbackMessage, PageCard, StateMessage } from '@shared/ui'
import { ResourceDetailsHeader } from './ResourceDetailsHeader'

export function ResourceDetailsPageContent() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const { draftResource, resource, resourceQuery } = useResource()

  return (
    <PageCard>
      <BackButton resourceId={resourceId} />

      {resourceQuery.isLoading && <StateMessage>Loading resource...</StateMessage>}

      {resourceQuery.isError && (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      )}

      {resource && draftResource && (
        <>
          <ResourceDetailsHeader />
          <BasicInfoSection />
          <ProjectDetailsSection />
        </>
      )}
    </PageCard>
  )
}
