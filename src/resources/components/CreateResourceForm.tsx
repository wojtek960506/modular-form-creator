import { useState, type FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { createResource, getErrorMessage, resourcesQueryKey } from '../../resources.api'

export function CreateResourceForm() {
  const [resourceName, setResourceName] = useState('')
  const queryClient = useQueryClient()

  const createResourceMutation = useMutation({
    mutationFn: createResource,
    onSuccess: async () => {
      setResourceName('')
      await queryClient.invalidateQueries({ queryKey: resourcesQueryKey })
    },
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = resourceName.trim()

    if (!trimmedName) {
      return
    }

    createResourceMutation.mutate({ resourceName: trimmedName })
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <FieldGroup>
          <Label htmlFor="resourceName">Resource name</Label>
          <Input
            id="resourceName"
            name="resourceName"
            value={resourceName}
            onChange={(event) => setResourceName(event.target.value)}
            placeholder="e.g. Customer onboarding"
          />
        </FieldGroup>

        <PrimaryButton
          type="submit"
          disabled={createResourceMutation.isPending || resourceName.trim().length === 0}
        >
          {createResourceMutation.isPending ? 'Creating...' : 'Create resource'}
        </PrimaryButton>
      </Form>

      {createResourceMutation.isError ? (
        <FeedbackMessage>{getErrorMessage(createResourceMutation.error)}</FeedbackMessage>
      ) : null}
    </FormWrapper>
  )
}

const FormWrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`

const FieldGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkStrong};
`

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.inkStrong};
  font: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.inkMuted};
  }
`

const PrimaryButton = styled.button`
  justify-self: start;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const FeedbackMessage = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.warning};
`
