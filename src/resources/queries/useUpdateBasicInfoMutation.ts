import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBasicInfo, type BasicInfo } from '@resources/api'
import { setResourceQueryData } from './queryClientHelpers'

export function useUpdateBasicInfoMutation(resourceId: string | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (values: BasicInfo) => updateBasicInfo(resourceId ?? '', values),
    onSuccess: async (resource) => {
      await setResourceQueryData(queryClient, resource)
    },
  })
}
