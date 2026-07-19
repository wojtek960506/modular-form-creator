import type { QueryClient } from '@tanstack/react-query'
import { resourceQueryKey, resourcesQueryKey, type Resource } from '@resources-api'

export async function invalidateResourcesQuery(queryClient: QueryClient) {
  await queryClient.invalidateQueries({ queryKey: resourcesQueryKey })
}

export async function setResourceQueryData(queryClient: QueryClient, resource: Resource) {
  await queryClient.setQueryData(resourceQueryKey(String(resource.resourceId)), resource)
}
