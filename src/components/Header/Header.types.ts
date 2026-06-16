import type { NavItem } from '@/components/Navigation'

export interface HeaderProps {
  navItems?: NavItem[]
  activeNavItemId?: string
  onNavItemClick?: (item: NavItem) => void
  isAuthenticated?: boolean
  onSignIn?: () => void
  onJoinUs?: () => void
}
