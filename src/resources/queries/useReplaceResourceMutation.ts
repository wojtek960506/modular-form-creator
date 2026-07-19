import { useMutation, useQueryClient } from '@tanstack/react-query'
import { replaceResource, type Resource } from '@resources-api'
import { setResourceQueryData } from './queryClientHelpers'

interface UseReplaceResourceMutationOptions {
  onSuccess?: (resource: Resource) => void
}

export function useReplaceResourceMutation(options: UseReplaceResourceMutationOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (resource: Resource) =>
      replaceResource(String(resource.resourceId), {
        name: resource.name,
        basicInfo: resource.basicInfo,
        projectDetails: resource.projectDetails,
      }),
    onSuccess: async (resource) => {
      options.onSuccess?.(resource)
      await setResourceQueryData(queryClient, resource)
    },
  })
}
