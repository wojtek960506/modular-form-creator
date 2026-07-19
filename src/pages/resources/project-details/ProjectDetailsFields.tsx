import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { CheckboxGroup } from '@design-system/components/CheckboxGroup'
import { Input } from '@design-system/components/Input'
import { Select } from '@design-system/components/Select'
import type { ProjectDetails } from '@resources-api'
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

  function getModifiedHelperText(dirty: boolean) {
    return editing && dirty ? 'Modified' : undefined
  }

  function getUnsavedHelperText(value: string, persistedValue: string | undefined) {
    if (editing || persistedValue === undefined || value === persistedValue) {
      return undefined
    }

    return `Unsaved. Previous value: ${getPreviousValue(persistedValue)}`
  }

  function getUnsavedOptionsHelperText(value: string[], persistedValue: string[] | undefined) {
    if (editing || !persistedValue || areSameOptions(value, persistedValue)) {
      return undefined
    }

    return `Unsaved. Previous value: ${getPreviousOptionsValue(persistedValue)}`
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
                getModifiedHelperText(fieldState.isDirty) ??
                getUnsavedHelperText(field.value, persistedProjectDetails?.projectName)
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
                getModifiedHelperText(fieldState.isDirty) ??
                getUnsavedHelperText(field.value, persistedProjectDetails?.budget)
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
                getModifiedHelperText(fieldState.isDirty) ??
                getUnsavedHelperText(field.value, persistedProjectDetails?.category)
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
                getModifiedHelperText(fieldState.isDirty) ??
                getUnsavedOptionsHelperText(field.value, persistedProjectDetails?.options)
              }
              error={errors.options?.message}
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

function hasUnsavedOptionsChange(value: string[], persistedValue: string[] | undefined) {
  return Boolean(persistedValue && !areSameOptions(value, persistedValue))
}

function areSameOptions(value: string[], persistedValue: string[]) {
  return value.join('\u0000') === persistedValue.join('\u0000')
}

function getPreviousValue(value: string) {
  return value.trim() || 'Not provided'
}

function getPreviousOptionsValue(value: string[]) {
  return value.length > 0 ? value.join(', ') : 'Not provided'
}

const UnsavedFieldFrame = styled.div<{ $changed: boolean }>`
  border-left: 3px solid
    ${({ $changed, theme }) => ($changed ? theme.colors.warning : 'transparent')};
  padding-left: ${({ $changed, theme }) => ($changed ? theme.spacing.sm : '0')};
`
