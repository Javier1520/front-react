export type JoinUsRole = 'Student' | 'Trainer'

export interface JoinUsBoxProps {
  role: JoinUsRole
  description?: string
  imageUrl?: string
  onJoin?: (role: JoinUsRole) => void
  className?: string
}
