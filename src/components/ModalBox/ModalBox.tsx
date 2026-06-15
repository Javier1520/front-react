import React, { useEffect } from 'react'
import ReactModal from 'react-modal'
import { X } from 'lucide-react'
import styles from './ModalBox.module.css'
import type { ModalBoxProps } from './ModalBox.types'
import { cn } from '@/lib/utils'

// Set app element for accessibility
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#root')
}

const ModalBox: React.FC<ModalBoxProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = 'md',
}) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const sizeClass = size === 'sm' ? styles.modalSm : size === 'lg' ? styles.modalLg : ''

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={cn(styles.modal, sizeClass)}
      closeTimeoutMS={200}
      aria={{ labelledby: title ? 'modal-title' : undefined, describedby: 'modal-body' }}
    >
      {(title || showCloseButton) && (
        <div className={styles.modalHeader}>
          {title && <h2 id="modal-title" className={styles.modalTitle}>{title}</h2>}
          {showCloseButton && (
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close modal"
              id="modal-close-btn"
            >
              <X size={20} />
            </button>
          )}
        </div>
      )}
      <div id="modal-body" className={styles.modalBody}>
        {children}
      </div>
    </ReactModal>
  )
}

export default ModalBox
