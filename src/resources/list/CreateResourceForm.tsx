import { useState, type FormEvent } from 'react'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { Input } from '@design-system/components/Input'
import { getErrorMessage } from '@resources/api'
import { useCreateResourceMutation } from '@resources/queries'
import { FeedbackMessage } from '@shared/ui'

export function CreateResourceForm() {
  const [resourceName, setResourceName] = useState('')
  const createResourceMutation = useCreateResourceMutation({
    onSuccess: () => {
      setResourceName('')
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

      {createResourceMutation.isError && (
        <FeedbackMessage>{getErrorMessage(createResourceMutation.error)}</FeedbackMessage>
      )}
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
