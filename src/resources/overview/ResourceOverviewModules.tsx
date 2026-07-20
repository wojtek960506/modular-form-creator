import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { formatPriorityLabel } from '@resources/basic-info/formatPriorityLabel'
import { useResource } from '@resources/resource'
import {
  isBasicInfoComplete,
  isProjectDetailsComplete,
} from '@resources/resourceCompletion'
import { ResourceModuleCard } from './ResourceModuleCard'

export function ResourceOverviewModules() {
  const navigate = useNavigate()
  const { draftChangeCounts, draftResource } = useResource()

  if (!draftResource) {
    return null
  }

  const resource = draftResource
  const basicInfoUnsavedChangesCount = draftChangeCounts.basicInfo
  const projectDetailsUnsavedChangesCount = draftChangeCounts.projectDetails
  const basicInfoComplete = isBasicInfoComplete(resource.basicInfo)
  const projectDetailsComplete = isProjectDetailsComplete(resource.projectDetails)

  return (
    <ModulesGrid>
      <ResourceModuleCard
        title="Basic Info"
        description="Required identity and ownership information for this resource."
        status={basicInfoComplete ? 'complete' : 'incomplete'}
        summary={[
          `Owner: ${resource.basicInfo.owner || 'Not provided'}`,
          `Priority: ${formatPriorityLabel(resource.basicInfo.priority)}`,
        ]}
        actionLabel={basicInfoComplete ? 'Review Basic Info' : 'Set Basic Info'}
        unsavedChangesCount={basicInfoUnsavedChangesCount}
        onOpen={() => navigate(`/resources/${resource.resourceId}/basic-info`)}
      />

      <ResourceModuleCard
        title="Project Details"
        description="Project scope, budget, category, and assigned team options."
        status={projectDetailsComplete ? 'complete' : 'incomplete'}
        summary={[
          `Project: ${resource.projectDetails.projectName || 'Not provided'}`,
          `Options: ${
            resource.projectDetails.options.length > 0
              ? resource.projectDetails.options.join(', ')
              : 'Not provided'
          }`,
        ]}
        actionLabel={
          basicInfoComplete
            ? (projectDetailsComplete ? 'Review Project Details' : 'Set Project Details')
            : 'Complete Basic Info first'
        }
        locked={!basicInfoComplete}
        unsavedChangesCount={projectDetailsUnsavedChangesCount}
        onOpen={() => navigate(`/resources/${resource.resourceId}/project-details`)}
      />
    </ModulesGrid>
  )
}

const ModulesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`
