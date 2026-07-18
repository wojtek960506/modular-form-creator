import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5001',
})

export const resourcesQueryKey = ['resources'] as const
export const resourceQueryKey = (resourceId: string) => ['resources', resourceId] as const

export interface BasicInfo {
  resourceName: string
  owner: string
  email: string
  description: string
  priority: string
}

export interface ProjectDetails {
  projectName: string
  budget: string
  category: string
  options: string[]
}

export interface Resource {
  _id: string
  resourceId: number
  name: string
  status: 'draft' | 'completed'
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
  createdAt: string
  updatedAt: string
}

export interface ResourcesResponse {
  items: Resource[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}

export interface CreateResourceInput {
  resourceName: string
}

export async function getResources() {
  const response = await apiClient.get<ResourcesResponse>('/api/resources', {
    params: {
      page: 1,
      pageSize: 10,
      sortOrder: 'desc',
    },
  })

  return response.data
}

export async function getResource(resourceId: string) {
  const response = await apiClient.get<Resource>(`/api/resources/${resourceId}`)

  return response.data
}

export async function createResource(payload: CreateResourceInput) {
  const response = await apiClient.post<Resource>('/api/resources', payload)

  return response.data
}

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong.'
}
