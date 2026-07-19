import { useQuery } from '@tanstack/react-query'
import { getResources, resourcesQueryKey } from '@resources/api'

export function useResourcesQuery() {
  return useQuery({
    queryKey: resourcesQueryKey,
    queryFn: getResources,
  })
}
