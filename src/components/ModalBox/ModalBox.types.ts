export interface ModalBoxProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  showCloseButton?: boolean
  size?: 'sm' | 'md' | 'lg'
}
