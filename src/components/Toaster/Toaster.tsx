import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
    toastClassName={() =>
      'relative flex p-3 min-h-10 rounded-xl justify-between overflow-hidden cursor-pointer shadow-lg'
    }
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
