export interface MiniProfileProps {
  avatarUrl?: string
  firstName: string
  lastName: string
  email: string
  onMyAccountClick?: () => void
  onSignOutClick?: () => void
  isNightMode?: boolean
  onNightModeToggle?: (isNightMode: boolean) => void
  className?: string
}
