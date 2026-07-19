import { useParams } from 'react-router-dom'
import { ResourceOverviewPageContent } from '@resources/overview'
import { ResourceProvider } from '@resources/resource'

export function ResourceOverviewPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  return (
    <ResourceProvider resourceId={resourceId}>
      <ResourceOverviewPageContent />
    </ResourceProvider>
  )
}
