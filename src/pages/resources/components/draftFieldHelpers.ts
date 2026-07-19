export function getModifiedHelperText(editing: boolean, dirty: boolean) {
  return editing && dirty ? 'Modified' : undefined
}

export function hasUnsavedChange(value: string, persistedValue: string | undefined) {
  return persistedValue !== undefined && value !== persistedValue
}

export function hasUnsavedOptionsChange(value: string[], persistedValue: string[] | undefined) {
  return Boolean(persistedValue && !areSameOptions(value, persistedValue))
}

export function getUnsavedHelperText(
  editing: boolean,
  value: string,
  persistedValue: string | undefined,
) {
  if (editing || persistedValue === undefined || value === persistedValue) {
    return undefined
  }

  return `Unsaved. Previous value: ${getPreviousValue(persistedValue)}`
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

function areSameOptions(value: string[], persistedValue: string[]) {
  // Use a separator that is unlikely to appear in form values to compare array content safely.
  return value.join('\u0000') === persistedValue.join('\u0000')
}

function getPreviousValue(value: string) {
  return value.trim() || 'Not provided'
}

function getPreviousOptionsValue(value: string[]) {
  return value.length > 0 ? value.join(', ') : 'Not provided'
}
