import { createContext } from 'react'
import type { ResourceContextValue } from './types'

export const ResourceContext = createContext<ResourceContextValue | null>(null)
