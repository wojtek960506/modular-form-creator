import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@design-system/components/Input'
import { Select } from '@design-system/components/Select'
import { priorityOptions, type BasicInfoFormValues } from './basicInfoForm.types'

interface BasicInfoFieldsProps {
  editing: boolean
  fieldsLocked: boolean
}

export function BasicInfoFields({ editing, fieldsLocked }: BasicInfoFieldsProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<BasicInfoFormValues>()

  function getModifiedHelperText(dirty: boolean) {
    return editing && dirty ? 'Modified' : undefined
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
    </>
  )
}
