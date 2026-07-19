import { useParams } from 'react-router-dom'
import { BasicInfoPageContent } from '@resources/basic-info'
import { ResourceProvider } from '@resources/resource'

export function BasicInfoPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  return (
    <ResourceProvider resourceId={resourceId}>
      <BasicInfoPageContent />
    </ResourceProvider>
  )
}
