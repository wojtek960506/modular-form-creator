import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Card } from '@design-system/components/Card'
import type { BasicInfo, Resource } from '@resources-api'
import { BasicInfoFields } from './BasicInfoFields'
import { BasicInfoFormActions } from './BasicInfoFormActions'
import { basicInfoSchema } from './basicInfoForm.schema'
import {
  PRIORITIES,
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
  const form = useForm<BasicInfoFormValues, unknown, BasicInfoPayload>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: toBasicInfoFormValues(basicInfo),
  })
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = form

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

  return (
    <Card variant="outline">
      <FormProvider {...form}>
        <Form onSubmit={handleSubmit(submitForm)}>
          <BasicInfoFields editing={editing} fieldsLocked={fieldsLocked} />

          <BasicInfoFormActions
            disabled={disabled}
            editing={editing}
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            onCancel={cancelEditing}
            onEdit={() => setEditing(true)}
          />
        </Form>
      </FormProvider>
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
