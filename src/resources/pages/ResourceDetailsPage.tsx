import { useParams } from 'react-router-dom'
import { ResourceDetailsPageContent } from '@resources/resource-details'
import { ResourceProvider } from '@resources/resource'

export function ResourceDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  return (
    <ResourceProvider resourceId={resourceId}>
      <ResourceDetailsPageContent />
    </ResourceProvider>
  )
}
