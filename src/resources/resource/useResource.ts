import { useContext } from 'react'
import { ResourceContext } from './context'

export function useResource() {
  const context = useContext(ResourceContext)

  if (!context) {
    throw new Error('useResource must be used within ResourceProvider')
  }

  return context
}
