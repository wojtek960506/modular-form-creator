import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5001',
})

export const resourcesQueryKeyBase = ['resources'] as const
export const DEFAULT_RESOURCES_PAGE_SIZE = 15
export const resourcesQueryKey = (page: number, pageSize = DEFAULT_RESOURCES_PAGE_SIZE) =>
  [...resourcesQueryKeyBase, page, pageSize] as const
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

export interface ReplaceResourceInput {
  name: string
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
}

export async function getResources(page: number, pageSize = DEFAULT_RESOURCES_PAGE_SIZE) {
  const response = await apiClient.get<ResourcesResponse>('/api/resources', {
    params: {
      page,
      pageSize,
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

export async function deleteResource(resourceId: string) {
  const response = await apiClient.delete<Resource>(`/api/resources/${resourceId}`)

  return response.data
}

export async function provisionResource(resourceId: string) {
  const response = await apiClient.patch<Resource>(`/api/resources/${resourceId}/provisioning`)

  return response.data
}

export async function updateBasicInfo(resourceId: string, payload: BasicInfo) {
  const response = await apiClient.patch<Resource>(`/api/resources/${resourceId}/basic-info`, payload)

  return response.data
}

export async function updateProjectDetails(resourceId: string, payload: ProjectDetails) {
  const response = await apiClient.patch<Resource>(`/api/resources/${resourceId}/project-details`, payload)

  return response.data
}

export async function replaceResource(resourceId: string, payload: ReplaceResourceInput) {
  const response = await apiClient.put<Resource>(`/api/resources/${resourceId}`, payload)

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
