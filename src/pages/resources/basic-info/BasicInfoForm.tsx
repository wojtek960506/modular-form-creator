import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { Card } from '@design-system/components/Card'
import { Input } from '@design-system/components/Input'
import { Select } from '@design-system/components/Select'
import type { BasicInfo } from '@resources-api'
import { basicInfoSchema } from './basicInfoForm.schema'
import {
  PRIORITIES,
  priorityOptions,
  type BasicInfoFormValues,
  type BasicInfoPayload,
  type Priority,
} from './basicInfoForm.types'

interface BasicInfoFormProps {
  basicInfo: BasicInfo
  disabled: boolean
  isSubmitting: boolean
  onSubmit: (values: BasicInfoPayload) => void
}

export function BasicInfoForm({
  basicInfo,
  disabled,
  isSubmitting,
  onSubmit,
}: BasicInfoFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BasicInfoFormValues, unknown, BasicInfoPayload>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: toBasicInfoFormValues(basicInfo),
  })

  useEffect(() => {
    reset(toBasicInfoFormValues(basicInfo))
  }, [basicInfo, reset])

  return (
    <Card variant="outline">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="resourceName"
          render={({ field }) => (
            <Input
              {...field}
              label="Resource name"
              state="locked"
              error={errors.resourceName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="owner"
          render={({ field }) => (
            <Input
              {...field}
              label="Owner"
              state={disabled ? 'locked' : 'normal'}
              error={errors.owner?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              type="email"
              state={disabled ? 'locked' : 'normal'}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Input
              {...field}
              label="Description"
              multiline
              rows={5}
              state={disabled ? 'locked' : 'normal'}
              error={errors.description?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <Select
              {...field}
              label="Priority"
              options={priorityOptions}
              state={disabled ? 'locked' : 'normal'}
              error={errors.priority?.message}
            />
          )}
        />

        <Button type="submit" disabled={isSubmitting || disabled}>
          {isSubmitting ? 'Saving...' : 'Save Basic Info'}
        </Button>
      </Form>
    </Card>
  )
}

function isPriority(value: string): value is Priority {
  return PRIORITIES.includes(value as Priority)
}

function toBasicInfoFormValues(basicInfo: BasicInfo): BasicInfoFormValues {
  return {
    ...basicInfo,
    priority: isPriority(basicInfo.priority) ? basicInfo.priority : '',
  }
}

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`
