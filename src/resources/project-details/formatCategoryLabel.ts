import { categoryOptions } from './projectDetailsForm.types'

export function formatCategoryLabel(value: string) {
  return categoryOptions.find((option) => option.value === value)?.label ?? value
}
