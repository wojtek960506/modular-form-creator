import { categoryOptions } from './projectDetailsForm.types'

export function formatCategoryLabel(value: string) {
  if (!value.trim()) return 'Not provided'

  return categoryOptions.find((option) => option.value === value)?.label ?? value
}
