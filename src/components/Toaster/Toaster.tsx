import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Toaster.module.css'
import type { ToastOptions } from 'react-toastify'

export const ToasterProvider: React.FC = () => (
  <ToastContainer
    position="top-right"
    autoClose={3500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    theme="light"
    toastClassName={({ type } = {}) =>
      [
        styles.toast,
        type === 'success' && styles.success,
        type === 'error' && styles.error,
        type === 'info' && styles.info,
        type === 'warning' && styles.warning,
      ]
        .filter(Boolean)
        .join(' ')
    }
    className={styles.toastBody}
    progressClassName={styles.progress}
  />
)

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3500,
}

export const toastSuccess = (message: string, options?: ToastOptions) =>
  toast.success(message, { ...defaultOptions, ...options })

export const toastError = (message: string, options?: ToastOptions) =>
  toast.error(message, { ...defaultOptions, ...options })

export const toastInfo = (message: string, options?: ToastOptions) =>
  toast.info(message, { ...defaultOptions, ...options })

export const toastWarning = (message: string, options?: ToastOptions) =>
  toast.warning(message, { ...defaultOptions, ...options })

import React from 'react'

export default ToasterProvider
