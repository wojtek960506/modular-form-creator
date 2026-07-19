import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import type { ProjectDetails, Resource } from '@resources-api'
import { formatFieldValue } from './formatFieldValue'
import { formatUnsavedChangesLabel } from './formatUnsavedChangesLabel'
import {
  DefinitionList,
  Description,
  Section,
  SectionTitle,
  Term,
  TermRow,
} from './ResourceDetailsSections.styles'

interface ProjectDetailsSectionProps {
  unsavedChangesCount?: number
  draftProjectDetails?: ProjectDetails
  persistedResource?: Resource
  resource: Resource
}

export function ProjectDetailsSection({
  unsavedChangesCount = 0,
  draftProjectDetails,
  persistedResource,
  resource,
}: ProjectDetailsSectionProps) {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Project details</SectionTitle>
        {unsavedChangesCount > 0 && (
          <Badge variant="warning">{formatUnsavedChangesLabel(unsavedChangesCount)}</Badge>
        )}
      </SectionHeader>
      <DefinitionList>
        <div>
          <FieldTerm
            changed={hasChanged(draftProjectDetails, persistedResource, 'projectName')}
            label="Project name"
          />
          <Description>{formatFieldValue(resource.projectDetails.projectName)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftProjectDetails, persistedResource, 'budget')}
            label="Budget"
          />
          <Description>{formatFieldValue(resource.projectDetails.budget)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftProjectDetails, persistedResource, 'category')}
            label="Category"
          />
          <Description>{formatFieldValue(resource.projectDetails.category)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftProjectDetails, persistedResource, 'options')}
            label="Options"
          />
          <Description>{getOptionsValue(resource.projectDetails.options)}</Description>
        </div>
      </DefinitionList>
    </Section>
  )
}

const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

interface FieldTermProps {
  changed: boolean
  label: string
}

function FieldTerm({ changed, label }: FieldTermProps) {
  return (
    <TermRow>
      <Term>{label}</Term>
      {changed && <Badge variant="warning">Unsaved</Badge>}
    </TermRow>
  )
}

function hasChanged(
  draftProjectDetails: ProjectDetails | undefined,
  persistedResource: Resource | undefined,
  key: keyof ProjectDetails,
) {
  if (!draftProjectDetails || !persistedResource) {
    return false
  }

  if (key === 'options') {
    return draftProjectDetails.options.join('\u0000') !== persistedResource.projectDetails.options.join('\u0000')
  }

  return draftProjectDetails[key] !== persistedResource.projectDetails[key]
}

function getOptionsValue(values: string[]) {
  return values.length > 0 ? values.join(', ') : 'Not provided'
}
