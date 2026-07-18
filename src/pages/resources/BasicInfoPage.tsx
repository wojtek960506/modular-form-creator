import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Card } from '@design-system/components/Card'
import { BackButton } from '@pages/components/BackButton'
import { PageCard } from '@pages/components/PageCard'
import { PageHeader } from '@pages/components/PageHeader'
import { ReadonlyField } from '@pages/components/ReadonlyField'
import { FeedbackMessage, StateMessage } from '@pages/components/messages'
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
          <PageHeader title="Basic Info" subtitle={resourceQuery.data.name} />

          <Card variant="outline">
            <ReadonlyField label="Resource name" value={resourceQuery.data.basicInfo.resourceName} />
            <ReadonlyField label="Owner" value={resourceQuery.data.basicInfo.owner} />
            <ReadonlyField label="Email" value={resourceQuery.data.basicInfo.email} />
            <ReadonlyField label="Description" value={resourceQuery.data.basicInfo.description} />
            <ReadonlyField label="Priority" value={resourceQuery.data.basicInfo.priority} />
          </Card>
        </>
      ) : null}
    </PageCard>
  )
}
