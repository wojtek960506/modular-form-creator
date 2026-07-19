export function formatUnsavedChangesLabel(count: number) {
  return `${count} unsaved ${count === 1 ? 'change' : 'changes'}`
}
