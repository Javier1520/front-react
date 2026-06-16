import React from 'react'
import styles from './Button.module.css'
import type { ButtonProps } from './Button.types'
import { cn } from '@/lib/utils'

const variantClass = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
  important: styles.btnImportant,
}

const sizeClass = {
  sm: styles.btnSm,
  md: '',
  lg: styles.btnLg,
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  className,
  id,
}) => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        styles.btn,
        variantClass[variant],
        sizeClass[size],
        className,
      )}
    >
      {isLoading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      <span>{label}</span>
    </button>
  )
}

export default Button
