import { useContext } from 'react'
import { ResourceDraftsContext } from './context'

export function useResourceDrafts() {
  const context = useContext(ResourceDraftsContext)

  if (!context) {
    throw new Error('useResourceDrafts must be used within ResourceDraftsProvider')
  }

  return context
}
