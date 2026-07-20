import { useQuery } from '@tanstack/react-query'
import { getResources, resourcesQueryKey } from '@resources/api'

export function useResourcesQuery(page: number) {
  return useQuery({
    queryKey: resourcesQueryKey(page),
    queryFn: () => getResources(page),
  })
}
