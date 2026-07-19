import { CreateResourceForm, ResourcesHeader, ResourcesList } from '@resources/list'
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
