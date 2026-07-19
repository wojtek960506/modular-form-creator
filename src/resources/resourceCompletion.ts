import type { BasicInfo, ProjectDetails, Resource } from '@resources/api'

export function isBasicInfoComplete(basicInfo: BasicInfo) {
  return Boolean(
    basicInfo.resourceName.trim() &&
    basicInfo.owner.trim() &&
    basicInfo.email.trim() &&
    basicInfo.description.trim() &&
    basicInfo.priority.trim(),
  )
}

export function isProjectDetailsComplete(projectDetails: ProjectDetails) {
  return Boolean(
    projectDetails.projectName.trim() &&
    projectDetails.budget.trim() &&
    projectDetails.category.trim() &&
    projectDetails.options.length > 0,
  )
}

export function getCompletedModulesCount(resource: Resource) {
  return [
    isBasicInfoComplete(resource.basicInfo),
    isProjectDetailsComplete(resource.projectDetails),
  ].filter(Boolean).length
}

export function canProvisionResource(resource: Resource) {
  return (
    resource.status === 'draft' &&
    isBasicInfoComplete(resource.basicInfo) &&
    isProjectDetailsComplete(resource.projectDetails)
  )
}
