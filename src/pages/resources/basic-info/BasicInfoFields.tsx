import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@design-system/components/Input'
import { Select } from '@design-system/components/Select'
import type { BasicInfo } from '@resources-api'
import {
  getModifiedHelperText,
  getUnsavedHelperText,
  hasUnsavedChange,
} from '../components/draftFieldHelpers'
import { UnsavedField } from '../components/UnsavedField'
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

  function getPriorityLabel(value: string) {
    return priorityOptions.find((option) => option.value === value)?.label ?? value
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
                getModifiedHelperText(editing, fieldState.isDirty) ??
                getUnsavedHelperText(editing, field.value, persistedBasicInfo?.owner)
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
                getModifiedHelperText(editing, fieldState.isDirty) ??
                getUnsavedHelperText(editing, field.value, persistedBasicInfo?.email)
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
                getModifiedHelperText(editing, fieldState.isDirty) ??
                getUnsavedHelperText(editing, field.value, persistedBasicInfo?.description)
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
                getModifiedHelperText(editing, fieldState.isDirty) ??
                getUnsavedHelperText(
                  editing,
                  field.value,
                  persistedBasicInfo?.priority,
                  getPriorityLabel,
                )
              }
              error={errors.priority?.message}
            />
          </UnsavedField>
        )}
      />
    </>
  )
}
