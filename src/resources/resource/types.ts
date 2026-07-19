import type { UseQueryResult } from '@tanstack/react-query'
import type { Resource } from '@resources/api'
import type { ResourceDraftChangeCounts, ResourceDraftsContextValue } from '@resources/resource-drafts'

export interface ResourceContextValue {
  clearDraft: ResourceDraftsContextValue['clearDraft']
  draft: ReturnType<ResourceDraftsContextValue['getDraft']>
  draftChangeCounts: ResourceDraftChangeCounts
  draftResource: Resource | undefined
  hasDraftChanges: ResourceDraftsContextValue['hasDraftChanges']
  isCompleted: boolean
  resource: Resource | undefined
  resourceId: string | undefined
  resourceQuery: UseQueryResult<Resource, Error>
  updateBasicInfoDraft: ResourceDraftsContextValue['updateBasicInfoDraft']
  updateProjectDetailsDraft: ResourceDraftsContextValue['updateProjectDetailsDraft']
}
