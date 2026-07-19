import { useQuery } from '@tanstack/react-query'
import { getResource, resourceQueryKey } from '@resources-api'

export function useResourceQuery(resourceId: string | undefined) {
  return useQuery({
    queryKey: resourceQueryKey(resourceId ?? ''),
    queryFn: () => getResource(resourceId ?? ''),
    enabled: Boolean(resourceId),
  })
}
