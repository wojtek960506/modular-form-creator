import { priorityOptions } from './basicInfoForm.types'

export function formatPriorityLabel(value: string) {
  return priorityOptions.find((option) => option.value === value)?.label ?? value
}
