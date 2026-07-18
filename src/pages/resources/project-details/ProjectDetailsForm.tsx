import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Card } from '@design-system/components/Card'
import type { ProjectDetails, Resource } from '@resources-api'
import { ModuleFormActions } from '../components/ModuleFormActions'
import { ProjectDetailsFields } from './ProjectDetailsFields'
import { projectDetailsSchema } from './projectDetailsForm.schema'
import {
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type ProjectDetailsFormValues,
  type ProjectDetailsPayload,
} from './projectDetailsForm.types'

interface ProjectDetailsFormProps {
  disabled: boolean
  isSubmitting: boolean
  onSubmit: (values: ProjectDetailsPayload) => Promise<Resource>
  projectDetails: ProjectDetails
}

export function ProjectDetailsForm({
  disabled,
  isSubmitting,
  onSubmit,
  projectDetails,
}: ProjectDetailsFormProps) {
  const [editing, setEditing] = useState(false)
  const form = useForm<ProjectDetailsFormValues, unknown, ProjectDetailsPayload>({
    resolver: zodResolver(projectDetailsSchema),
    defaultValues: toProjectDetailsFormValues(projectDetails),
  })
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = form

  useEffect(() => {
    reset(toProjectDetailsFormValues(projectDetails))
  }, [projectDetails, reset])

  const fieldsLocked = disabled || !editing

  async function submitForm(values: ProjectDetailsPayload) {
    await onSubmit(values)
    setEditing(false)
  }

  function cancelEditing() {
    reset(toProjectDetailsFormValues(projectDetails))
    setEditing(false)
  }

  return (
    <Card variant="outline">
      <FormProvider {...form}>
        <Form onSubmit={handleSubmit(submitForm)}>
          <ProjectDetailsFields editing={editing} fieldsLocked={fieldsLocked} />

          {!disabled && (
            <ModuleFormActions
              disabled={disabled}
              editLabel="Edit Project Details"
              editing={editing}
              isDirty={isDirty}
              isSubmitting={isSubmitting}
              onCancel={cancelEditing}
              onEdit={() => setEditing(true)}
            />
          )}
        </Form>
      </FormProvider>
    </Card>
  )
}

function isProjectCategory(value: string): value is ProjectCategory {
  return PROJECT_CATEGORIES.includes(value as ProjectCategory)
}

function toProjectDetailsFormValues(projectDetails: ProjectDetails): ProjectDetailsFormValues {
  return {
    ...projectDetails,
    category: isProjectCategory(projectDetails.category) ? projectDetails.category : '',
  }
}

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`
