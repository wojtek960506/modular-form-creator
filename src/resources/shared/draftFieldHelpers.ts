export function getModifiedHelperText(editing: boolean, dirty: boolean) {
  return editing && dirty ? 'Modified' : undefined
}

export function hasUnsavedChange(value: string, persistedValue: string | undefined) {
  return persistedValue !== undefined && value !== persistedValue
}

export function hasUnsavedOptionsChange(value: string[], persistedValue: string[] | undefined) {
  return Boolean(persistedValue && !areSameOptions(value, persistedValue))
}

export function areSameOptions(value: string[], persistedValue: string[]) {
  // Use a separator that is unlikely to appear in form values to compare array content safely.
  return value.join('\u0000') === persistedValue.join('\u0000')
}

export function formatOptionsValue(value: string[]) {
  return value.length > 0 ? value.join(', ') : 'Not provided'
}

export function getUnsavedHelperText(
  editing: boolean,
  value: string,
  persistedValue: string | undefined,
  formatValue: (value: string) => string = getPreviousValue,
) {
  if (editing || persistedValue === undefined || value === persistedValue) {
    return undefined
  }

  return `Unsaved. Previous value: ${formatValue(persistedValue)}`
}

export function getUnsavedOptionsHelperText(
  editing: boolean,
  value: string[],
  persistedValue: string[] | undefined,
) {
  if (editing || !persistedValue || areSameOptions(value, persistedValue)) {
    return undefined
  }

  return `Unsaved. Previous value: ${getPreviousOptionsValue(persistedValue)}`
}

function getPreviousValue(value: string) {
  return value.trim() || 'Not provided'
}

function getPreviousOptionsValue(value: string[]) {
  return formatOptionsValue(value)
}
