import type { SelectOption } from '@design-system/components/Select'
import type { ProjectDetails } from '@resources-api'

export const PROJECT_CATEGORIES = ['internal', 'external', 'vendor'] as const
export const TEAM_MEMBER_OPTIONS = [
  'FE devs',
  'BE devs',
  'Designer',
  'Data Eng',
  'Product Owner',
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]
export type TeamMemberOption = (typeof TEAM_MEMBER_OPTIONS)[number]
export type ProjectDetailsPayload = ProjectDetails

export type ProjectDetailsFormValues = Omit<ProjectDetailsPayload, 'category'> & {
  category: ProjectCategory | ''
}

export const categoryOptions: SelectOption[] = [
  { value: '', label: 'Select a category' },
  { value: 'internal', label: 'Internal' },
  { value: 'external', label: 'External' },
  { value: 'vendor', label: 'Vendor' },
]

export const teamMemberOptions = [...TEAM_MEMBER_OPTIONS]
