import { z } from 'zod'
import type { ProjectDetails } from '@resources-api'
import {
  PROJECT_CATEGORIES,
  TEAM_MEMBER_OPTIONS,
  type ProjectCategory,
  type ProjectDetailsFormValues,
} from './projectDetailsForm.types'

const categorySchema = z.union([z.enum(PROJECT_CATEGORIES), z.literal('')]).refine(
  (value): value is ProjectCategory => value !== '',
  'Category is required',
)

export const projectDetailsSchema: z.ZodType<ProjectDetails, ProjectDetailsFormValues> = z.object({
  projectName: z.string().trim().min(1, 'Project name is required'),
  budget: z.string().trim().min(1, 'Budget is required'),
  category: categorySchema,
  options: z.array(z.enum(TEAM_MEMBER_OPTIONS)).min(1, 'Select at least one option'),
})
