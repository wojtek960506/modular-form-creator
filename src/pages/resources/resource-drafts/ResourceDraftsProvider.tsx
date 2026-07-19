import { useMemo, useState, type ReactNode } from 'react'
import type { Resource } from '@resources-api'
import { ResourceDraftsContext } from './context'
import type { ResourceDraft, ResourceDraftsContextValue } from './types'

interface ResourceDraftsProviderProps {
  children: ReactNode
}

export function ResourceDraftsProvider({
  children,
}: ResourceDraftsProviderProps) {
  const [drafts, setDrafts] = useState<Record<string, ResourceDraft>>({})

  const value = useMemo<ResourceDraftsContextValue>(() => {
    function updateDraft(resourceId: string, draft: ResourceDraft) {
      setDrafts((currentDrafts) => ({
        ...currentDrafts,
        [resourceId]: {
          ...currentDrafts[resourceId],
          ...draft,
        },
      }))
    }

    return {
      clearDraft: (resourceId) => {
        setDrafts((currentDrafts) => {
          const remainingDrafts = { ...currentDrafts }
          delete remainingDrafts[resourceId]

          return remainingDrafts
        })
      },
      getDraft: (resourceId) => drafts[resourceId],
      getDraftResource: (resource: Resource) => {
        if (resource.status !== 'completed') {
          return resource
        }

        const draft = drafts[String(resource.resourceId)]

        if (!draft) {
          return resource
        }

        return {
          ...resource,
          basicInfo: draft.basicInfo ?? resource.basicInfo,
          projectDetails: draft.projectDetails ?? resource.projectDetails,
        }
      },
      hasDraftChanges: (resourceId) => {
        const draft = drafts[resourceId]

        return Boolean(draft?.basicInfo || draft?.projectDetails)
      },
      updateBasicInfoDraft: (resourceId, basicInfo) => {
        updateDraft(resourceId, { basicInfo })
      },
      updateProjectDetailsDraft: (resourceId, projectDetails) => {
        updateDraft(resourceId, { projectDetails })
      },
    }
  }, [drafts])

  return (
    <ResourceDraftsContext.Provider value={value}>
      {children}
    </ResourceDraftsContext.Provider>
  )
}
