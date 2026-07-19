import { useParams } from 'react-router-dom'
import { ProjectDetailsPageContent } from '@resources/project-details'
import { ResourceProvider } from '@resources/resource'

export function ProjectDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  return (
    <ResourceProvider resourceId={resourceId}>
      <ProjectDetailsPageContent />
    </ResourceProvider>
  )
}
