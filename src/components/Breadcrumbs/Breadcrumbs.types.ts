export interface BreadcrumbItem {
  id: string
  label: string
  href: string
}

export interface BreadcrumbsProps {
  crumbs: BreadcrumbItem[]
  className?: string
}
