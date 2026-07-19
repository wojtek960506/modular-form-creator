import type { BasicInfo, ProjectDetails, Resource } from '@resources/api'
import type { ResourceDraftChangeCounts } from './draftChangeCounts'

export interface ResourceDraft {
  basicInfo?: BasicInfo
  projectDetails?: ProjectDetails
}

export interface ResourceDraftsContextValue {
  clearDraft: (resourceId: string) => void
  getDraft: (resourceId: string) => ResourceDraft | undefined
  getDraftChangeCounts: (resource: Resource) => ResourceDraftChangeCounts
  getDraftResource: (resource: Resource) => Resource
  hasDraftChanges: (resourceId: string) => boolean
  updateBasicInfoDraft: (resourceId: string, basicInfo: BasicInfo) => void
  updateProjectDetailsDraft: (resourceId: string, projectDetails: ProjectDetails) => void
}
