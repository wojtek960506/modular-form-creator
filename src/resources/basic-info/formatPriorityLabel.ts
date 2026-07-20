import { priorityOptions } from './basicInfoForm.types'

export function formatPriorityLabel(value: string) {
  if (!value.trim()) return 'Not provided'

  return priorityOptions.find((option) => option.value === value)?.label ?? value
}
