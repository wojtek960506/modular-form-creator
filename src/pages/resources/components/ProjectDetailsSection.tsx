import { Badge } from '@design-system/components/Badge'
import type { ProjectDetails, Resource } from '@resources-api'
import {
  DefinitionList,
  Description,
  Section,
  SectionTitle,
  Term,
  TermRow,
} from './ResourceDetailsSections.styles'

interface ProjectDetailsSectionProps {
  draftProjectDetails?: ProjectDetails
  persistedResource?: Resource
  resource: Resource
}

export function ProjectDetailsSection({
  draftProjectDetails,
  persistedResource,
  resource,
}: ProjectDetailsSectionProps) {
  return (
    <Section>
      <SectionTitle>Project details</SectionTitle>
      <DefinitionList>
        <div>
          <FieldTerm
            changed={hasChanged(draftProjectDetails, persistedResource, 'projectName')}
            label="Project name"
          />
          <Description>{getValue(resource.projectDetails.projectName)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftProjectDetails, persistedResource, 'budget')}
            label="Budget"
          />
          <Description>{getValue(resource.projectDetails.budget)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftProjectDetails, persistedResource, 'category')}
            label="Category"
          />
          <Description>{getValue(resource.projectDetails.category)}</Description>
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

interface FieldTermProps {
  changed: boolean
  label: string
}

function FieldTerm({ changed, label }: FieldTermProps) {
  return (
    <TermRow>
      <Term>{label}</Term>
      {changed ? <Badge variant="warning">Unsaved</Badge> : null}
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

function getValue(value: string) {
  return value.trim() || 'Not provided'
}

function getOptionsValue(values: string[]) {
  return values.length > 0 ? values.join(', ') : 'Not provided'
}
