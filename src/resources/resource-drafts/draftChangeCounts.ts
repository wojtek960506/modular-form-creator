import type { BasicInfo, ProjectDetails, Resource } from '@resources-api'
import type { ResourceDraft } from './types'

export interface ResourceDraftChangeCounts {
  basicInfo: number
  projectDetails: number
  total: number
}

const BASIC_INFO_KEYS: Array<keyof BasicInfo> = [
  'resourceName',
  'owner',
  'email',
  'description',
  'priority',
]

const PROJECT_DETAILS_KEYS: Array<keyof ProjectDetails> = [
  'projectName',
  'budget',
  'category',
  'options',
]

export function getResourceDraftChangeCounts(
  resource: Resource,
  draft: ResourceDraft | undefined,
): ResourceDraftChangeCounts {
  if (resource.status !== 'completed' || !draft) {
    return {
      basicInfo: 0,
      projectDetails: 0,
      total: 0,
    }
  }

  const basicInfo = draft.basicInfo
    ? BASIC_INFO_KEYS.filter((key) => draft.basicInfo?.[key] !== resource.basicInfo[key]).length
    : 0
  const projectDetails = draft.projectDetails
    ? PROJECT_DETAILS_KEYS.filter((key) => {
        if (key === 'options') {
          return !areSameOptions(draft.projectDetails?.options ?? [], resource.projectDetails.options)
        }

        return draft.projectDetails?.[key] !== resource.projectDetails[key]
      }).length
    : 0

  return {
    basicInfo,
    projectDetails,
    total: basicInfo + projectDetails,
  }
}

function areSameOptions(value: string[], persistedValue: string[]) {
  // Use a separator that is unlikely to appear in form values to compare array content safely.
  return value.join('\u0000') === persistedValue.join('\u0000')
}
