import { useMemo, type ReactNode } from 'react'
import { useResourceQuery } from '@resources/queries'
import { useResourceDrafts } from '@resources/resource-drafts'
import { ResourceContext } from './context'
import type { ResourceContextValue } from './types'

interface ResourceProviderProps {
  children: ReactNode
  resourceId: string | undefined
}

const emptyDraftChangeCounts = {
  basicInfo: 0,
  projectDetails: 0,
  total: 0,
}

export function ResourceProvider({ children, resourceId }: ResourceProviderProps) {
  const resourceQuery = useResourceQuery(resourceId)
  const {
    clearDraft,
    getDraft,
    getDraftChangeCounts,
    getDraftResource,
    hasDraftChanges,
    updateBasicInfoDraft,
    updateProjectDetailsDraft,
  } = useResourceDrafts()

  const resource = resourceQuery.data
  const draft = resourceId ? getDraft(resourceId) : undefined
  const draftResource = resource ? getDraftResource(resource) : undefined
  const draftChangeCounts = resource ? getDraftChangeCounts(resource) : emptyDraftChangeCounts
  const isCompleted = resource?.status === 'completed'

  const value = useMemo<ResourceContextValue>(
    () => ({
      clearDraft,
      draft,
      draftChangeCounts,
      draftResource,
      hasDraftChanges,
      isCompleted,
      resource,
      resourceId,
      resourceQuery,
      updateBasicInfoDraft,
      updateProjectDetailsDraft,
    }),
    [
      clearDraft,
      draft,
      draftChangeCounts,
      draftResource,
      hasDraftChanges,
      isCompleted,
      resource,
      resourceId,
      resourceQuery,
      updateBasicInfoDraft,
      updateProjectDetailsDraft,
    ],
  )

  return <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>
}
