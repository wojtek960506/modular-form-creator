import type { Resource } from '@resources/api'

export function formatResourceStatusLabel(status: Resource['status']) {
  return status.charAt(0).toUpperCase() + status.slice(1)
}
