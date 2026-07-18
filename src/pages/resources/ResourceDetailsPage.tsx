import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
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
    <PageCard>
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
    </PageCard>
  )
}

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
