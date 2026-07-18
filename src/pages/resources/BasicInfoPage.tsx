import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from '@design-system/components/Card'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { getErrorMessage, getResource, resourceQueryKey } from '@resources-api'

export function BasicInfoPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()

  const resourceQuery = useQuery({
    queryKey: resourceQueryKey(resourceId ?? ''),
    queryFn: () => getResource(resourceId ?? ''),
    enabled: Boolean(resourceId),
  })

  return (
    <PageCard>
      <BackButton onClick={() => navigate(`/resources/${resourceId}`)}>
        Back to overview
      </BackButton>

      {resourceQuery.isLoading ? <StateMessage>Loading Basic Info...</StateMessage> : null}

      {resourceQuery.isError ? (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      ) : null}

      {resourceQuery.data ? (
        <>
          <Header>
            <Title>Basic Info</Title>
            <Subtitle>{resourceQuery.data.name}</Subtitle>
          </Header>

          <Card variant="outline">
            <Field>
              <FieldLabel>Resource name</FieldLabel>
              <FieldValue>{resourceQuery.data.basicInfo.resourceName || 'Not provided'}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Owner</FieldLabel>
              <FieldValue>{resourceQuery.data.basicInfo.owner || 'Not provided'}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldValue>{resourceQuery.data.basicInfo.email || 'Not provided'}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldValue>{resourceQuery.data.basicInfo.description || 'Not provided'}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>Priority</FieldLabel>
              <FieldValue>{resourceQuery.data.basicInfo.priority || 'Not provided'}</FieldValue>
            </Field>
          </Card>
        </>
      ) : null}
    </PageCard>
  )
}

const Header = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.inkStrong};
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

const FieldLabel = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
`

const FieldValue = styled.p`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-weight: 600;
`

const StateMessage = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`

const FeedbackMessage = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.warning};
`
