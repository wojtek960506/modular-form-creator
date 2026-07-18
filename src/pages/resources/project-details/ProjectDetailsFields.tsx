import { Controller, useFormContext } from 'react-hook-form'
import { CheckboxGroup } from '@design-system/components/CheckboxGroup'
import { Input } from '@design-system/components/Input'
import { Select } from '@design-system/components/Select'
import {
  categoryOptions,
  teamMemberOptions,
  type ProjectDetailsFormValues,
} from './projectDetailsForm.types'

interface ProjectDetailsFieldsProps {
  editing: boolean
  fieldsLocked: boolean
}

export function ProjectDetailsFields({ editing, fieldsLocked }: ProjectDetailsFieldsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectDetailsFormValues>()

  function getModifiedHelperText(dirty: boolean) {
    return editing && dirty ? 'Modified' : undefined
  }

  return (
    <>
      <Controller
        control={control}
        name="projectName"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Project name"
            state={fieldsLocked ? 'disabled' : 'normal'}
            helperText={getModifiedHelperText(fieldState.isDirty)}
            error={errors.projectName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="budget"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Budget"
            inputMode="numeric"
            state={fieldsLocked ? 'disabled' : 'normal'}
            helperText={getModifiedHelperText(fieldState.isDirty)}
            error={errors.budget?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field, fieldState }) => (
          <Select
            {...field}
            label="Category"
            options={categoryOptions}
            state={fieldsLocked ? 'disabled' : 'normal'}
            helperText={getModifiedHelperText(fieldState.isDirty)}
            error={errors.category?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="options"
        render={({ field, fieldState }) => (
          <CheckboxGroup
            label="Options"
            options={teamMemberOptions}
            value={field.value}
            onChange={field.onChange}
            disabled={fieldsLocked}
            helper={getModifiedHelperText(fieldState.isDirty)}
            error={errors.options?.message}
          />
        )}
      />
    </>
  )
}
