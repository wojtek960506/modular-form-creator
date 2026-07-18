import { useState, type FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { Input } from '@design-system/components/Input'
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
        <Input
          id="resourceName"
          name="resourceName"
          label="Resource name"
          value={resourceName}
          onChange={(event) => setResourceName(event.target.value)}
          placeholder="e.g. Customer onboarding"
        />

        <Button
          type="submit"
          fullWidth
          disabled={createResourceMutation.isPending || resourceName.trim().length === 0}
        >
          {createResourceMutation.isPending ? 'Creating...' : 'Create resource'}
        </Button>
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

const FeedbackMessage = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.warning};
`
