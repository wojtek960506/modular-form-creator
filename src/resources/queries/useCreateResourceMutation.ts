import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createResource } from '@resources-api'
import { invalidateResourcesQuery } from './queryClientHelpers'

interface UseCreateResourceMutationOptions {
  onSuccess?: () => void
}

export function useCreateResourceMutation(options: UseCreateResourceMutationOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createResource,
    onSuccess: async () => {
      options.onSuccess?.()
      await invalidateResourcesQuery(queryClient)
    },
  })
}
