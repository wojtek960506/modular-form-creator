import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { Card } from '@design-system/components/Card'
import { Input } from '@design-system/components/Input'
import { Select } from '@design-system/components/Select'
import type { BasicInfo, Resource } from '@resources-api'
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
  onSubmit: (values: BasicInfoPayload) => Promise<Resource>
}

export function BasicInfoForm({
  basicInfo,
  disabled,
  isSubmitting,
  onSubmit,
}: BasicInfoFormProps) {
  const [editing, setEditing] = useState(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<BasicInfoFormValues, unknown, BasicInfoPayload>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: toBasicInfoFormValues(basicInfo),
  })

  useEffect(() => {
    reset(toBasicInfoFormValues(basicInfo))
  }, [basicInfo, reset])

  const fieldsLocked = disabled || !editing

  async function submitForm(values: BasicInfoPayload) {
    await onSubmit(values)
    setEditing(false)
  }

  function cancelEditing() {
    reset(toBasicInfoFormValues(basicInfo))
    setEditing(false)
  }

  function getModifiedHelperText(dirty: boolean) {
    return editing && dirty ? 'Modified' : undefined
  }

  return (
    <Card variant="outline">
      <Form onSubmit={handleSubmit(submitForm)}>
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
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Owner"
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={getModifiedHelperText(fieldState.isDirty)}
              error={errors.owner?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Email"
              type="email"
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={getModifiedHelperText(fieldState.isDirty)}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              label="Description"
              multiline
              rows={5}
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={getModifiedHelperText(fieldState.isDirty)}
              error={errors.description?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="priority"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              label="Priority"
              options={priorityOptions}
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={getModifiedHelperText(fieldState.isDirty)}
              error={errors.priority?.message}
            />
          )}
        />

        <Actions>
          {editing && (
            <>
              <Button type="submit" disabled={isSubmitting || disabled || !isDirty}>
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={isSubmitting}
                onClick={cancelEditing}
              >
                Cancel
              </Button>
            </>
          )}
          
          {!editing && (
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              onClick={() => setEditing(true)}
            >
              Edit Basic Info
            </Button>
          )}
        </Actions>
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

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`
