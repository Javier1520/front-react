import React, { useEffect, useState } from 'react'
import { User, LogOut, Moon, Sun } from 'lucide-react'
import styles from './MiniProfile.module.css'
import type { MiniProfileProps } from './MiniProfile.types'
import { cn } from '@/lib/utils'

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'

const Toggle: React.FC<{
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ checked, onChange }) => (
  <label
    style={{
      position: 'relative',
      display: 'inline-block',
      width: 40,
      height: 22,
      cursor: 'pointer',
      flexShrink: 0,
    }}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
    />
    <span
      style={{
        position: 'absolute',
        inset: 0,
        background: checked ? '#6366f1' : '#cbd5e1',
        borderRadius: 22,
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Icon inside track */}
      <span
        style={{
          position: 'absolute',
          left: checked ? 6 : 'auto',
          right: checked ? 'auto' : 6,
          display: 'flex',
          alignItems: 'center',
          color: checked ? 'white' : '#f59e0b',
          transition: 'all 0.2s',
        }}
      >
        {checked ? <Moon size={10} /> : <Sun size={10} />}
      </span>
      {/* Thumb */}
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: checked ? 21 : 3,
          width: 16,
          height: 16,
          background: 'white',
          borderRadius: '50%',
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}
      />
    </span>
  </label>
)
// ─────────────────────────────────────────────────────────────────────────────

const MiniProfile: React.FC<MiniProfileProps> = ({
  avatarUrl,
  firstName,
  lastName,
  email,
  onMyAccountClick,
  onSignOutClick,
  isNightMode: controlledIsNightMode,
  onNightModeToggle,
  className,
}) => {
  const [localNightMode, setLocalNightMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = document.documentElement.getAttribute('data-theme')
      return saved === 'dark'
    }
    return false
  })

  const isNight = controlledIsNightMode !== undefined ? controlledIsNightMode : localNightMode

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    if (controlledIsNightMode === undefined) {
      setLocalNightMode(checked)
      if (checked) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
    onNightModeToggle?.(checked)
  }

  useEffect(() => {
    if (controlledIsNightMode !== undefined) {
      if (controlledIsNightMode) {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }
  }, [controlledIsNightMode])

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.header}>
        <img
          src={avatarUrl || DEFAULT_AVATAR}
          alt={`${firstName} ${lastName}`}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <span className={styles.name}>{firstName} {lastName}</span>
          <span className={styles.email}>{email}</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.menu}>
        <button
          type="button"
          onClick={onMyAccountClick}
          className={styles.menuItem}
        >
          <User size={16} />
          <span>My Account</span>
        </button>

        <div className={styles.toggleRow}>
          <div className={styles.toggleLabel}>
            {isNight ? <Moon size={16} /> : <Sun size={16} />}
            <span>Night Mode</span>
          </div>
          <Toggle
            checked={isNight}
            onChange={handleToggleChange}
          />
        </div>

        <div className={styles.divider} />

        <button
          type="button"
          onClick={onSignOutClick}
          className={styles.signOutBtn}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default MiniProfile