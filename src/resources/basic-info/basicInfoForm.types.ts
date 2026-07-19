import type { SelectOption } from '@design-system/components/Select'

export const PRIORITIES = ['low', 'medium', 'high'] as const

export type Priority = (typeof PRIORITIES)[number]

export type BasicInfoPayload = {
  resourceName: string
  owner: string
  email: string
  description: string
  priority: Priority
}

export type BasicInfoFormValues = Omit<BasicInfoPayload, 'priority'> & {
  priority: Priority | ''
}

export const priorityOptions: SelectOption[] = [
  { value: '', label: 'Select priority' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]
