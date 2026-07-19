import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteResource } from '@resources/api'
import { invalidateResourcesQuery } from './queryClientHelpers'

interface UseDeleteResourceMutationOptions {
  onMutate?: (resourceId: string) => void
  onSettled?: () => void
}

export function useDeleteResourceMutation(options: UseDeleteResourceMutationOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteResource,
    onMutate: async (resourceId) => {
      options.onMutate?.(resourceId)
    },
    onSuccess: async () => {
      await invalidateResourcesQuery(queryClient)
    },
    onSettled: async () => {
      options.onSettled?.()
    },
  })
}
