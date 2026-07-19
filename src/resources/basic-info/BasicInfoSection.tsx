import styled from 'styled-components'
import { Badge } from '@design-system/components/Badge'
import type { BasicInfo, Resource } from '@resources/api'
import {
  DefinitionList,
  Description,
  Section,
  SectionTitle,
  Term,
  TermRow,
} from '@resources/resource-details/ResourceDetailsSections.styles'
import { formatFieldValue, formatUnsavedChangesLabel } from '@resources/shared'

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
          <Badge variant="warning">{formatUnsavedChangesLabel(unsavedChangesCount)}</Badge>
        )}
      </SectionHeader>
      <DefinitionList>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'resourceName')}
            label="Resource name"
          />
          <Description>{formatFieldValue(resource.basicInfo.resourceName)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'owner')}
            label="Owner"
          />
          <Description>{formatFieldValue(resource.basicInfo.owner)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'email')}
            label="Email"
          />
          <Description>{formatFieldValue(resource.basicInfo.email)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'description')}
            label="Description"
          />
          <Description>{formatFieldValue(resource.basicInfo.description)}</Description>
        </div>
        <div>
          <FieldTerm
            changed={hasChanged(draftBasicInfo, persistedResource, 'priority')}
            label="Priority"
          />
          <Description>{formatFieldValue(resource.basicInfo.priority)}</Description>
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
