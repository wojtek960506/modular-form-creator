import { Badge } from '@design-system/components/Badge'
import { formatResourceStatusLabel } from '@resources/formatResourceStatusLabel'
import { useResource } from '@resources/resource'
import { formatUnsavedChangesLabel } from '@resources/shared'
import { Header, HeaderMeta, HeaderTitle } from '@shared/ui/PageHeader.styles'

export function ResourceDetailsHeader() {
  const { draftChangeCounts, draftResource } = useResource()

  if (!draftResource) return null

  const resource = draftResource
  const unsavedChangesCount = draftChangeCounts.total

  return (
    <Header>
      <HeaderTitle>{resource.name}</HeaderTitle>
      <HeaderMeta>
        <Badge variant={resource.status === 'completed' ? 'success' : 'info'}>
          {formatResourceStatusLabel(resource.status)}
        </Badge>
        {unsavedChangesCount > 0 && (
          <Badge variant="warning">{formatUnsavedChangesLabel(unsavedChangesCount)}</Badge>
        )}
      </HeaderMeta>
    </Header>
  )
}
