import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { Card } from '@design-system/components/Card'
import { BackButton } from '@pages/components/BackButton'
import { getErrorMessage, getResource, resourceQueryKey } from '@resources-api'
import { isBasicInfoComplete } from '@resources/resourceCompletion'

export function ProjectDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()

  const resourceQuery = useQuery({
    queryKey: resourceQueryKey(resourceId ?? ''),
    queryFn: () => getResource(resourceId ?? ''),
    enabled: Boolean(resourceId),
  })

  const resource = resourceQuery.data
  const locked = resource ? !isBasicInfoComplete(resource.basicInfo) : false

  return (
    <ContentCard>
      <BackButton onClick={() => navigate(`/resources/${resourceId}`)}>
        Back to overview
      </BackButton>

      {resourceQuery.isLoading ? <StateMessage>Loading Project Details...</StateMessage> : null}

      {resourceQuery.isError ? (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      ) : null}

      {resource ? (
        <>
          <Header>
            <Title>Project Details</Title>
            <Subtitle>{resource.name}</Subtitle>
          </Header>

          {locked ? (
            <ModuleCard variant="outline">
              <LockedTitle>Project Details are locked</LockedTitle>
              <StateMessage>Complete Basic Info before opening this module.</StateMessage>
              <Button
                type="button"
                onClick={() => navigate(`/resources/${resource.resourceId}/basic-info`)}
              >
                Open Basic Info
              </Button>
            </ModuleCard>
          ) : (
            <ModuleCard variant="outline">
              <Field>
                <FieldLabel>Project name</FieldLabel>
                <FieldValue>{resource.projectDetails.projectName || 'Not provided'}</FieldValue>
              </Field>
              <Field>
                <FieldLabel>Budget</FieldLabel>
                <FieldValue>{resource.projectDetails.budget || 'Not provided'}</FieldValue>
              </Field>
              <Field>
                <FieldLabel>Category</FieldLabel>
                <FieldValue>{resource.projectDetails.category || 'Not provided'}</FieldValue>
              </Field>
              <Field>
                <FieldLabel>Options</FieldLabel>
                <FieldValue>
                  {resource.projectDetails.options.length > 0
                    ? resource.projectDetails.options.join(', ')
                    : 'Not provided'}
                </FieldValue>
              </Field>
            </ModuleCard>
          )}
        </>
      ) : null}
    </ContentCard>
  )
}

const ContentCard = styled.div`
  width: min(100%, 720px);
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
  align-content: start;
`

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

const ModuleCard = styled(Card)`
  align-content: start;
`

const LockedTitle = styled.h2`
  color: ${({ theme }) => theme.colors.inkStrong};
  font-size: 1.125rem;
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
