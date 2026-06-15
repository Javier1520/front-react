export interface UserProfile {
  firstName: string
  lastName: string
  username: string
  dateOfBirth?: string
  address?: string
  email: string
  isActive?: boolean
  avatarUrl?: string
  status?: string
}

export interface MyAccountListProps {
  profile: UserProfile
  onSave?: (updated: UserProfile) => void
  className?: string
}
