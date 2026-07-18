import { z } from 'zod'
import {
  PRIORITIES,
  type BasicInfoFormValues,
  type BasicInfoPayload,
  type Priority,
} from './basicInfoForm.types'

const prioritySchema = z
  .union([z.enum(PRIORITIES), z.literal('')])
  .refine((value): value is Priority => value !== '', 'Priority is required')

export const basicInfoSchema: z.ZodType<BasicInfoPayload, BasicInfoFormValues> = z.object({
  resourceName: z.string().trim().min(1, 'Resource name is required'),
  owner: z.string().trim().min(1, 'Owner is required'),
  email: z.email('Email must be a valid email format'),
  description: z.string().trim().min(1, 'Description is required'),
  priority: prioritySchema,
})
