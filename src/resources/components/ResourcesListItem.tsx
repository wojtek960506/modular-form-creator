import { Link } from 'react-router-dom'
import { Badge } from '@design-system/components/Badge'
import { Button } from '@design-system/components/Button'
import type { Resource } from '@resources-api'
import { formatResourceStatusLabel } from '@resources/formatResourceStatusLabel'
import {
  DeleteButton,
  ResourceItem,
  ResourceItemActions,
  ResourceItemBody,
  ResourceItemContent,
  ResourceItemLink,
  ResourceName,
} from './ResourcesList.styles'

interface ResourcesListItemProps {
  resource: Resource
  isDeleting: boolean
  onDelete: () => void
}

export function ResourcesListItem({
  resource,
  isDeleting,
  onDelete,
}: ResourcesListItemProps) {
  return (
    <ResourceItem>
      <ResourceItemBody>
        <ResourceItemContent>
          <ResourceItemLink as={Link} to={`/resources/${resource.resourceId}`}>
            <ResourceName>{resource.name}</ResourceName>
            <Badge variant={resource.status === 'completed' ? 'success' : 'info'}>
              {formatResourceStatusLabel(resource.status)}
            </Badge>
          </ResourceItemLink>
        </ResourceItemContent>

        <ResourceItemActions>
          <DeleteButton
            as={Button}
            type="button"
            variant="ghost"
            size="small"
            disabled={isDeleting}
            onClick={onDelete}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </DeleteButton>
        </ResourceItemActions>
      </ResourceItemBody>
    </ResourceItem>
  )
}
