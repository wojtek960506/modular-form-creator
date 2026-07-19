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
  const { draftResource } = useResource()

  if (!draftResource) return null

  return (
    <>
      <ResourceOverviewHeader />
      <ResourceProgressPanel />

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
