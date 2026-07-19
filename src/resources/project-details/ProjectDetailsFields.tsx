import { Controller, useFormContext } from 'react-hook-form'
import { CheckboxGroup } from '@design-system/components/CheckboxGroup'
import { Input } from '@design-system/components/Input'
import { Select } from '@design-system/components/Select'
import type { ProjectDetails } from '@resources/api'
import {
  getModifiedHelperText,
  getUnsavedHelperText,
  getUnsavedOptionsHelperText,
  hasUnsavedChange,
  hasUnsavedOptionsChange,
  UnsavedField,
} from '@resources/shared'
import {
  categoryOptions,
  teamMemberOptions,
  type ProjectDetailsFormValues,
} from './projectDetailsForm.types'

interface ProjectDetailsFieldsProps {
  editing: boolean
  fieldsLocked: boolean
  persistedProjectDetails?: ProjectDetails
}

export function ProjectDetailsFields({
  editing,
  fieldsLocked,
  persistedProjectDetails,
}: ProjectDetailsFieldsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectDetailsFormValues>()

  function getCategoryLabel(value: string) {
    return categoryOptions.find((option) => option.value === value)?.label ?? value
  }

  return (
    <>
      <Controller
        control={control}
        name="projectName"
        render={({ field, fieldState }) => (
          <UnsavedField
            changed={hasUnsavedChange(field.value, persistedProjectDetails?.projectName)}
          >
            <Input
              {...field}
              label="Project name"
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={
                getModifiedHelperText(editing, fieldState.isDirty) ??
                getUnsavedHelperText(editing, field.value, persistedProjectDetails?.projectName)
              }
              error={errors.projectName?.message}
            />
          </UnsavedField>
        )}
      />
      <Controller
        control={control}
        name="budget"
        render={({ field, fieldState }) => (
          <UnsavedField changed={hasUnsavedChange(field.value, persistedProjectDetails?.budget)}>
            <Input
              {...field}
              label="Budget"
              inputMode="numeric"
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={
                getModifiedHelperText(editing, fieldState.isDirty) ??
                getUnsavedHelperText(editing, field.value, persistedProjectDetails?.budget)
              }
              error={errors.budget?.message}
            />
          </UnsavedField>
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field, fieldState }) => (
          <UnsavedField
            changed={hasUnsavedChange(field.value, persistedProjectDetails?.category)}
          >
            <Select
              {...field}
              label="Category"
              options={categoryOptions}
              state={fieldsLocked ? 'disabled' : 'normal'}
              helperText={
                getModifiedHelperText(editing, fieldState.isDirty) ??
                getUnsavedHelperText(
                  editing,
                  field.value,
                  persistedProjectDetails?.category,
                  getCategoryLabel,
                )
              }
              error={errors.category?.message}
            />
          </UnsavedField>
        )}
      />
      <Controller
        control={control}
        name="options"
        render={({ field, fieldState }) => (
          <UnsavedField
            changed={hasUnsavedOptionsChange(field.value, persistedProjectDetails?.options)}
          >
            <CheckboxGroup
              label="Options"
              options={teamMemberOptions}
              value={field.value}
              onChange={field.onChange}
              disabled={fieldsLocked}
              helper={
                getModifiedHelperText(editing, fieldState.isDirty) ??
                getUnsavedOptionsHelperText(
                  editing,
                  field.value,
                  persistedProjectDetails?.options,
                )
              }
              error={errors.options?.message}
            />
          </UnsavedField>
        )}
      />
    </>
  )
}
