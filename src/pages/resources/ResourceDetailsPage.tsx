import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { BackButton } from '@pages/components/BackButton'
import { getErrorMessage, getResource, resourceQueryKey } from '@resources-api'
import { BasicInfoSection } from './components/BasicInfoSection'
import { ProjectDetailsSection } from './components/ProjectDetailsSection'
import { ResourceDetailsHeader } from './components/ResourceDetailsHeader'

export function ResourceDetailsPage() {
  const { resourceId } = useParams<{ resourceId: string }>()
  const navigate = useNavigate()

  const resourceQuery = useQuery({
    queryKey: resourceQueryKey(resourceId ?? ''),
    queryFn: () => getResource(resourceId ?? ''),
    enabled: Boolean(resourceId),
  })

  return (
    <ContentCard>
      <BackButton onClick={() => navigate(`/resources/${resourceId}`)}>
        Back to overview
      </BackButton>

      {resourceQuery.isLoading ? <StateMessage>Loading resource...</StateMessage> : null}

      {resourceQuery.isError ? (
        <FeedbackMessage>{getErrorMessage(resourceQuery.error)}</FeedbackMessage>
      ) : null}

      {resourceQuery.data ? (
        <>
          <ResourceDetailsHeader resource={resourceQuery.data} />
          <BasicInfoSection resource={resourceQuery.data} />
          <ProjectDetailsSection resource={resourceQuery.data} />
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
