import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import type { Resource } from '@resources/api'
import { formatPriorityLabel } from '@resources/basic-info/formatPriorityLabel'
import {
  canProvisionResource,
  isBasicInfoComplete,
  isProjectDetailsComplete,
} from '@resources/resourceCompletion'
import { ResourceModuleCard } from './ResourceModuleCard'
import { ResourceOverviewHeader } from './ResourceOverviewHeader'
import { ResourceProgressPanel } from './ResourceProgressPanel'

interface ResourceOverviewContentProps {
  unsavedChangesCount: number
  basicInfoUnsavedChangesCount: number
  projectDetailsUnsavedChangesCount: number
  resource: Resource
  isCompleting: boolean
  isUpdating: boolean
  onOpenBasicInfo: () => void
  onOpenProjectDetails: () => void
  onOpenDetails: () => void
  onCompleteResource: () => void
  onDiscardChanges: () => void
  onUpdateResource: () => void
}

export function ResourceOverviewContent({
  unsavedChangesCount,
  basicInfoUnsavedChangesCount,
  projectDetailsUnsavedChangesCount,
  resource,
  isCompleting,
  isUpdating,
  onOpenBasicInfo,
  onOpenProjectDetails,
  onOpenDetails,
  onCompleteResource,
  onDiscardChanges,
  onUpdateResource,
}: ResourceOverviewContentProps) {
  const basicInfoComplete = isBasicInfoComplete(resource.basicInfo)
  const projectDetailsComplete = isProjectDetailsComplete(resource.projectDetails)

  return (
    <>
      <ResourceOverviewHeader
        resource={resource}
        unsavedChangesCount={unsavedChangesCount}
      />
      <ResourceProgressPanel resource={resource} onOpenDetails={onOpenDetails} />

      <ModulesGrid>
        <ResourceModuleCard
          title="Basic Info"
          description="Required identity and ownership information for this resource."
          status={basicInfoComplete ? 'complete' : 'incomplete'}
          summary={[
            `Owner: ${resource.basicInfo.owner || 'Not provided'}`,
            `Priority: ${
              resource.basicInfo.priority
                ? formatPriorityLabel(resource.basicInfo.priority)
                : 'Not provided'
            }`,
          ]}
          actionLabel={basicInfoComplete ? 'Review Basic Info' : 'Set Basic Info'}
          unsavedChangesCount={basicInfoUnsavedChangesCount}
          onOpen={onOpenBasicInfo}
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
          onOpen={onOpenProjectDetails}
        />
      </ModulesGrid>

      <Actions>
        {resource.status === 'completed' ? (
          <>
            <Button
              type="button"
              disabled={unsavedChangesCount === 0 || isUpdating}
              onClick={onUpdateResource}
            >
              {isUpdating ? 'Updating...' : 'Update resource'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={unsavedChangesCount === 0 || isUpdating}
              onClick={onDiscardChanges}
            >
              Discard changes
            </Button>
          </>
        ) : (
          <Button
            type="button"
            state={canProvisionResource(resource) ? 'normal' : 'locked'}
            disabled={isCompleting}
            onClick={onCompleteResource}
          >
            {isCompleting ? 'Completing...' : 'Complete resource'}
          </Button>
        )}
      </Actions>
    </>
  )
}

const ModulesGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`
