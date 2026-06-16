export interface NavItem {
  id: string
  label: string
  href: string
}

export interface NavigationProps {
  items: NavItem[]
  activeItemId?: string
  onItemClick?: (item: NavItem) => void
  className?: string
}
