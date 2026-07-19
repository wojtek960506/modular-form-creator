import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import type { BasicInfo, Resource } from '@resources-api'
import {
  DefinitionList,
  Description,
  Section,
  SectionTitle,
  Term,
  TermRow,
} from './ResourceDetailsSections.styles'

interface BasicInfoSectionProps {
  unsavedChangesCount?: number
  draftBasicInfo?: BasicInfo
  persistedResource?: Resource
  resource: Resource
}

export function BasicInfoSection({
  unsavedChangesCount = 0,
  draftBasicInfo,
  persistedResource,
  resource,
}: BasicInfoSectionProps) {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Basic info</SectionTitle>
        {unsavedChangesCount > 0 && (
          <Badge variant="warning">{unsavedChangesCount} unsaved changes</Badge>
        )}
      </SectionHeader>
      <DefinitionList>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'resourceName')}
            label="Resource name"
          />
          <Description>{getValue(resource.basicInfo.resourceName)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'owner')}
            label="Owner"
          />
          <Description>{getValue(resource.basicInfo.owner)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'email')}
            label="Email"
          />
          <Description>{getValue(resource.basicInfo.email)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'description')}
            label="Description"
          />
          <Description>{getValue(resource.basicInfo.description)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'priority')}
            label="Priority"
          />
          <Description>{getValue(resource.basicInfo.priority)}</Description>
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
  draftBasicInfo: BasicInfo | undefined,
  persistedResource: Resource | undefined,
  key: keyof BasicInfo,
) {
  if (!draftBasicInfo || !persistedResource) {
    return false
  }

  return draftBasicInfo[key] !== persistedResource.basicInfo[key]
}

function getValue(value: string) {
  return value.trim() || 'Not provided'
}
