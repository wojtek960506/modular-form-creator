import { useNavigate } from 'react-router-dom'
import { useResource } from '@resources/resource'
import { ResourceOverviewActions } from './ResourceOverviewActions'
import { ResourceOverviewHeader } from './ResourceOverviewHeader'
import { ResourceOverviewModules } from './ResourceOverviewModules'
import { ResourceProgressPanel } from './ResourceProgressPanel'

interface ResourceOverviewContentProps {
  isCompleting: boolean
  isUpdating: boolean
  onCompleteResource: () => void
  onUpdateResource: () => void
}

export function ResourceOverviewContent({
  isCompleting,
  isUpdating,
  onCompleteResource,
  onUpdateResource,
}: ResourceOverviewContentProps) {
  const navigate = useNavigate()
  const { draftChangeCounts, draftResource } = useResource()

  if (!draftResource) return null

  const resource = draftResource
  const unsavedChangesCount = draftChangeCounts.total

  return (
    <>
      <ResourceOverviewHeader
        resource={resource}
        unsavedChangesCount={unsavedChangesCount}
      />
      <ResourceProgressPanel
        resource={resource}
        onOpenDetails={() => navigate(`/resources/${resource.resourceId}/details`)}
      />

      <ResourceOverviewModules />

      <ResourceOverviewActions
        isCompleting={isCompleting}
        isUpdating={isUpdating}
        onCompleteResource={onCompleteResource}
        onUpdateResource={onUpdateResource}
      />
    </>
  )
}
