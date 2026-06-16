import React, { useState } from 'react'
import { X } from 'lucide-react'
import styles from './Navigation.module.css'
import type { NavigationProps, NavItem } from './Navigation.types'
import { cn } from '@/lib/utils'

const Navigation: React.FC<NavigationProps> = ({
  items,
  activeItemId,
  onItemClick,
  className,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleClick = (item: NavItem) => {
    onItemClick?.(item)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className={cn(styles.nav, 'hidden sm:flex', className)} aria-label="Main navigation">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={cn(
              styles.navItem,
              activeItemId === item.id && styles.navItemActive,
            )}
            onClick={(e) => {
              e.preventDefault()
              handleClick(item)
            }}
            aria-current={activeItemId === item.id ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile: rendered by Header via openMobileMenu prop */}
      {/* Drawer overlay */}
      {mobileOpen && (
        <div
          className={styles.mobileDrawerOverlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      {mobileOpen && (
        <div className={styles.mobileDrawer} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className={styles.mobileDrawerHeader}>
            <div className={styles.mobileUserInfo}>
              <img
                src="https://i.pravatar.cc/44?img=5"
                alt="User"
                className={styles.mobileAvatar}
              />
              <div>
                <div className={styles.mobileUserName}>John_12</div>
                <div className={styles.mobileUserEmail}>John_12@gmail.com</div>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          <div className={styles.mobileNavList}>
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  styles.mobileNavItem,
                  activeItemId === item.id && styles.mobileNavItemActive,
                )}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(item)
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export { Navigation }
export type { NavigationProps }
