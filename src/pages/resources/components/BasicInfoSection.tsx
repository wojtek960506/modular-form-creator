import type { Resource } from '@resources-api'
import {
  DefinitionList,
  Description,
  Section,
  SectionTitle,
  Term,
} from './ResourceDetailsSections.styles'

export function BasicInfoSection({ resource }: { resource: Resource }) {
  return (
    <Section>
      <SectionTitle>Basic info</SectionTitle>
      <DefinitionList>
        <div>
          <Term>Resource name</Term>
          <Description>{getValue(resource.basicInfo.resourceName)}</Description>
        </div>
        <div>
          <Term>Owner</Term>
          <Description>{getValue(resource.basicInfo.owner)}</Description>
        </div>
        <div>
          <Term>Email</Term>
          <Description>{getValue(resource.basicInfo.email)}</Description>
        </div>
        <div>
          <Term>Description</Term>
          <Description>{getValue(resource.basicInfo.description)}</Description>
        </div>
        <div>
          <Term>Priority</Term>
          <Description>{getValue(resource.basicInfo.priority)}</Description>
        </div>
      </DefinitionList>
    </Section>
  )
}

function getValue(value: string) {
  return value.trim() || 'Not provided'
}
