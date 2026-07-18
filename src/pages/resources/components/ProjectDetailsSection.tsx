import type { Resource } from '@resources-api'
import {
  DefinitionList,
  Description,
  Section,
  SectionTitle,
  Term,
} from './ResourceDetailsSections.styles'

export function ProjectDetailsSection({ resource }: { resource: Resource }) {
  return (
    <Section>
      <SectionTitle>Project details</SectionTitle>
      <DefinitionList>
        <div>
          <Term>Project name</Term>
          <Description>{getValue(resource.projectDetails.projectName)}</Description>
        </div>
        <div>
          <Term>Budget</Term>
          <Description>{getValue(resource.projectDetails.budget)}</Description>
        </div>
        <div>
          <Term>Category</Term>
          <Description>{getValue(resource.projectDetails.category)}</Description>
        </div>
        <div>
          <Term>Options</Term>
          <Description>{getOptionsValue(resource.projectDetails.options)}</Description>
        </div>
      </DefinitionList>
    </Section>
  )
}

function getValue(value: string) {
  return value.trim() || 'Not provided'
}

function getOptionsValue(values: string[]) {
  return values.length > 0 ? values.join(', ') : 'Not provided'
}
