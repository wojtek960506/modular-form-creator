import { useMutation, useQueryClient } from '@tanstack/react-query'
import { provisionResource } from '@resources/api'
import { setResourceQueryData } from './queryClientHelpers'

export function useProvisionResourceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: provisionResource,
    onSuccess: async (resource) => {
      await setResourceQueryData(queryClient, resource)
    },
  })
}
