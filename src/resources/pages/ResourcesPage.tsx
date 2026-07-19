import { CreateResourceForm } from '@resources/components/CreateResourceForm'
import { ResourcesHeader } from '@resources/components/ResourcesHeader'
import { ResourcesList } from '@resources/components/ResourcesList'
import { PageCard } from '@shared/ui'

export function ResourcesPage() {
  return (
    <PageCard $scrollLayout>
      <ResourcesHeader />
      <CreateResourceForm />
      <ResourcesList />
    </PageCard>
  )
}
