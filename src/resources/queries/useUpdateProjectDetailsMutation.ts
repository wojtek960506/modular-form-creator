import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProjectDetails, type ProjectDetails } from '@resources/api'
import { setResourceQueryData } from './queryClientHelpers'

export function useUpdateProjectDetailsMutation(resourceId: string | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: ProjectDetails) => updateProjectDetails(resourceId ?? '', values),
    onSuccess: async (resource) => {
      await setResourceQueryData(queryClient, resource)
    },
  })
}
