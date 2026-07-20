import styled from 'styled-components'
import { Button } from '@design-system/components/Button'
import { getPaginationItems } from './getPaginationItems'

interface ResourcesPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ResourcesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ResourcesPaginationProps) {
  if (totalPages <= 1) return null

  const items = getPaginationItems(currentPage, totalPages)

  return (
    <PaginationNav aria-label="Resources pagination">
      <PaginationButton
        type="button"
        variant="ghost"
        size="small"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        {'<'}
      </PaginationButton>

      <PaginationItems>
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <PaginationEllipsis key={`ellipsis-${index}`} aria-hidden="true">
              ...
            </PaginationEllipsis>
          ) : (
            <PaginationButton
              key={item}
              type="button"
              variant="ghost"
              size="small"
              onClick={() => onPageChange(item)}
              aria-current={item === currentPage ? 'page' : undefined}
              $active={item === currentPage}
            >
              {item}
            </PaginationButton>
          ),
        )}
      </PaginationItems>

      <PaginationButton
        type="button"
        variant="ghost"
        size="small"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        {'>'}
      </PaginationButton>
    </PaginationNav>
  )
}

const PaginationNav = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
`

const PaginationItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const PaginationEllipsis = styled.span`
  min-width: 2rem;
  padding: ${({ theme }) => theme.spacing.xs};
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
`

const PaginationButton = styled(Button)<{ $active?: boolean }>`
  min-width: 2rem;
  padding-inline: ${({ theme }) => theme.spacing.xs};
  justify-content: center;
  color: ${({ $active, theme }) => ($active ? theme.colors.inkStrong : theme.colors.inkMuted)};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
  text-underline-offset: 0.2rem;
`
