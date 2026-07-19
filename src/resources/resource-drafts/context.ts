import { createContext } from 'react'
import type { ResourceDraftsContextValue } from './types'

export const ResourceDraftsContext = createContext<ResourceDraftsContextValue | null>(null)
