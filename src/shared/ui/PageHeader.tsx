import type { ReactNode } from 'react'
import {
  Header,
  HeaderMeta,
  HeaderSubtitle,
  HeaderTitle,
  HeaderTitleRow,
} from './PageHeader.styles'

interface PageHeaderProps {
  meta?: ReactNode
  title: string
  subtitle?: string
}

export function PageHeader({ meta, title, subtitle }: PageHeaderProps) {
  return (
    <Header>
      <HeaderTitleRow>
        <HeaderTitle>{title}</HeaderTitle>
      </HeaderTitleRow>
      {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
      {meta && <HeaderMeta>{meta}</HeaderMeta>}
    </Header>
  )
}
