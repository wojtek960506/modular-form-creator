import type { BasicInfo } from '@resources/api'
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
import { formatFieldValue, formatUnsavedChangesLabel } from '@resources/shared'
import { formatPriorityLabel } from './formatPriorityLabel'

export function BasicInfoSection() {
  const { draft, draftChangeCounts, draftResource, resource } = useResource()

  if (!draftResource || !resource) return null

  const draftBasicInfo = draft?.basicInfo
  const unsavedChangesCount = draftChangeCounts.basicInfo

  return (
    <Section>
      <ResourceDetailsSectionHeader
        title="Basic info"
        unsavedChangesLabel={
          unsavedChangesCount > 0 ? formatUnsavedChangesLabel(unsavedChangesCount) : undefined
        }
      />
      <DefinitionList>
        <div>
          <ResourceDetailsFieldTerm
            changed={hasChanged(draftBasicInfo, resource.basicInfo, 'resourceName')}
            label="Resource name"
          />
          <Description>{formatFieldValue(draftResource.basicInfo.resourceName)}</Description>
        </div>
        <div>
          <ResourceDetailsFieldTerm
            changed={hasChanged(draftBasicInfo, resource.basicInfo, 'owner')}
            label="Owner"
          />
          <Description>{formatFieldValue(draftResource.basicInfo.owner)}</Description>
        </div>
        <div>
          <ResourceDetailsFieldTerm
            changed={hasChanged(draftBasicInfo, resource.basicInfo, 'email')}
            label="Email"
          />
          <Description>{formatFieldValue(draftResource.basicInfo.email)}</Description>
        </div>
        <div>
          <ResourceDetailsFieldTerm
            changed={hasChanged(draftBasicInfo, resource.basicInfo, 'description')}
            label="Description"
          />
          <Description>{formatFieldValue(draftResource.basicInfo.description)}</Description>
        </div>
        <div>
          <ResourceDetailsFieldTerm
            changed={hasChanged(draftBasicInfo, resource.basicInfo, 'priority')}
            label="Priority"
          />
          <Description>{formatPriorityLabel(draftResource.basicInfo.priority)}</Description>
        </div>
      </DefinitionList>
    </Section>
  )
}

function hasChanged(
  draftBasicInfo: BasicInfo | undefined,
  persistedBasicInfo: BasicInfo,
  key: keyof BasicInfo,
) {
  if (!draftBasicInfo) {
    return false
  }

  return draftBasicInfo[key] !== persistedBasicInfo[key]
}
