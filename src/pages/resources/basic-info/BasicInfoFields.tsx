import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Input } from '@design-system/components/Input'
import { Select } from '@design-system/components/Select'
import type { BasicInfo } from '@resources-api'
import { priorityOptions, type BasicInfoFormValues } from './basicInfoForm.types'

interface BasicInfoFieldsProps {
  editing: boolean
  fieldsLocked: boolean
  persistedBasicInfo?: BasicInfo
}

export function BasicInfoFields({
  editing,
  fieldsLocked,
  persistedBasicInfo,
}: BasicInfoFieldsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<BasicInfoFormValues>()

  function getModifiedHelperText(dirty: boolean) {
    return editing && dirty ? 'Modified' : undefined
  }

  function getUnsavedHelperText(value: string, persistedValue: string | undefined) {
    if (editing || persistedValue === undefined || value === persistedValue) {
      return undefined
    }

    return `Unsaved. Previous value: ${getPreviousValue(persistedValue)}`
  }

  return (
    <>
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
          <UnsavedField changed={hasUnsavedChange(field.value, persistedBasicInfo?.owner)}>
            <Input
              {...field}
              label="Owner"
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={
                getModifiedHelperText(fieldState.isDirty) ??
                getUnsavedHelperText(field.value, persistedBasicInfo?.owner)
              }
              error={errors.owner?.message}
            />
          </UnsavedField>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <UnsavedField changed={hasUnsavedChange(field.value, persistedBasicInfo?.email)}>
            <Input
              {...field}
              label="Email"
              type="email"
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={
                getModifiedHelperText(fieldState.isDirty) ??
                getUnsavedHelperText(field.value, persistedBasicInfo?.email)
              }
              error={errors.email?.message}
            />
          </UnsavedField>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <UnsavedField changed={hasUnsavedChange(field.value, persistedBasicInfo?.description)}>
            <Input
              {...field}
              label="Description"
              multiline
              rows={5}
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={
                getModifiedHelperText(fieldState.isDirty) ??
                getUnsavedHelperText(field.value, persistedBasicInfo?.description)
              }
              error={errors.description?.message}
            />
          </UnsavedField>
        )}
      />
      <Controller
        control={control}
        name="priority"
        render={({ field, fieldState }) => (
          <UnsavedField changed={hasUnsavedChange(field.value, persistedBasicInfo?.priority)}>
            <Select
              {...field}
              label="Priority"
              options={priorityOptions}
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={
                getModifiedHelperText(fieldState.isDirty) ??
                getUnsavedHelperText(field.value, persistedBasicInfo?.priority)
              }
              error={errors.priority?.message}
            />
          </UnsavedField>
        )}
      />
    </>
  )
}

interface UnsavedFieldProps {
  changed: boolean
  children: React.ReactNode
}

function UnsavedField({ changed, children }: UnsavedFieldProps) {
  return <UnsavedFieldFrame $changed={changed}>{children}</UnsavedFieldFrame>
}

function hasUnsavedChange(value: string, persistedValue: string | undefined) {
  return persistedValue !== undefined && value !== persistedValue
}

function getPreviousValue(value: string) {
  return value.trim() || 'Not provided'
}

const UnsavedFieldFrame = styled.div<{ $changed: boolean }>`
  border-left: 3px solid
    ${({ $changed, theme }) => ($changed ? theme.colors.warning : 'transparent')};
  padding-left: ${({ $changed, theme }) => ($changed ? theme.spacing.sm : '0')};
`
