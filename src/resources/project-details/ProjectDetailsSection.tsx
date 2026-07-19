import type { ProjectDetails } from '@resources/api'
import { useResource } from '@resources/resource'
import {
  DefinitionList,
  Description,
  Section,
} from '@resources/resource-details/ResourceDetailsSections.styles'
import {
  ResourceDetailsFieldTerm,
  ResourceDetailsSectionHeader,
} from '@resources/resource-details'
import {
  areSameOptions,
  formatFieldValue,
  formatOptionsValue,
  formatUnsavedChangesLabel,
} from '@resources/shared'
import { formatCategoryLabel } from './formatCategoryLabel'

export function ProjectDetailsSection() {
  const { draft, draftChangeCounts, draftResource, resource } = useResource()

  if (!draftResource || !resource) return null

  const draftProjectDetails = draft?.projectDetails
  const unsavedChangesCount = draftChangeCounts.projectDetails

  return (
    <Section>
      <ResourceDetailsSectionHeader
        title="Project details"
        unsavedChangesLabel={
          unsavedChangesCount > 0 ? formatUnsavedChangesLabel(unsavedChangesCount) : undefined
        }
      />
      <DefinitionList>
        <div>
          <ResourceDetailsFieldTerm
            changed={hasChanged(draftProjectDetails, resource.projectDetails, 'projectName')}
            label="Project name"
          />
          <Description>{formatFieldValue(draftResource.projectDetails.projectName)}</Description>
        </div>
        <div>
          <ResourceDetailsFieldTerm
            changed={hasChanged(draftProjectDetails, resource.projectDetails, 'budget')}
            label="Budget"
          />
          <Description>{formatFieldValue(draftResource.projectDetails.budget)}</Description>
        </div>
        <div>
          <ResourceDetailsFieldTerm
            changed={hasChanged(draftProjectDetails, resource.projectDetails, 'category')}
            label="Category"
          />
          <Description>{formatCategoryLabel(draftResource.projectDetails.category)}</Description>
        </div>
        <div>
          <ResourceDetailsFieldTerm
            changed={hasChanged(draftProjectDetails, resource.projectDetails, 'options')}
            label="Options"
          />
          <Description>{formatOptionsValue(draftResource.projectDetails.options)}</Description>
        </div>
      </DefinitionList>
    </Section>
  )
}

function hasChanged(
  draftProjectDetails: ProjectDetails | undefined,
  persistedProjectDetails: ProjectDetails,
  key: keyof ProjectDetails,
) {
  if (!draftProjectDetails) {
    return false
  }

  if (key === 'options') {
    return !areSameOptions(draftProjectDetails.options, persistedProjectDetails.options)
  }

  return draftProjectDetails[key] !== persistedProjectDetails[key]
}
