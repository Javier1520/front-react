import React, { useState } from 'react'
import { MoreHorizontal, X } from 'lucide-react'
import styles from './Header.module.css'
import type { HeaderProps } from './Header.types'
import { cn } from '@/lib/utils'
import Button from '@/components/Button'
import type { NavItem } from '@/components/Navigation'

const DEFAULT_NAV: NavItem[] = [
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'about', label: 'About Us', href: '/about' },
]

const Header: React.FC<HeaderProps> = ({
  navItems = DEFAULT_NAV,
  activeNavItemId,
  onNavItemClick,
  isAuthenticated = false,
  onSignIn,
  onJoinUs,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (item: NavItem) => {
    onNavItemClick?.(item)
    setMobileOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="/" className={styles.logo} aria-label="Learn — go to homepage">
          <span className={styles.logoIcon} aria-hidden="true">
            <svg className={styles.logoIconSvg} viewBox="0 0 16 16">
              <path d="M8 1L1 5l7 4 7-4-7-4zM1 9l7 4 7-4M1 13l7 4 7-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className={styles.logoText}>learn</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={cn(styles.navArea)} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                'text-sm font-medium text-slate-500 hover:text-brand-500 transition-colors mx-4 relative',
                'after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-brand-500 after:rounded-full after:transition-all',
                activeNavItemId === item.id
                  ? 'text-brand-500 font-semibold after:w-full'
                  : 'after:w-0 hover:after:w-full'
              )}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item)
              }}
              aria-current={activeNavItemId === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          {!isAuthenticated && (
            <>
              <Button
                id="header-sign-in"
                label="Sign In"
                variant="secondary"
                size="sm"
                onClick={onSignIn}
              />
              <Button
                id="header-join-us"
                label="Join Us"
                variant="primary"
                size="sm"
                onClick={onJoinUs}
              />
            </>
          )}
        </div>

        {/* Mobile trigger (three dots) */}
        <button
          className={styles.menuTrigger}
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          id="header-mobile-menu-trigger"
        >
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className={styles.mobileDrawer} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className={styles.mobileDrawerTop}>
            <div className={styles.mobileUserInfo}>
              <img
                src="https://i.pravatar.cc/44?img=5"
                alt="John_12 avatar"
                className={styles.mobileAvatar}
              />
              <div>
                <div className={styles.mobileName}>John_12</div>
                <div className={styles.mobileEmail}>John_12@gmail.com</div>
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
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  styles.mobileNavItem,
                  activeNavItemId === item.id && styles.mobileNavItemActive,
                )}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item)
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {!isAuthenticated && (
            <div className={styles.mobileActions}>
              <Button
                id="header-mobile-sign-in"
                label="Sign In"
                variant="secondary"
                onClick={onSignIn}
              />
              <Button
                id="header-mobile-join-us"
                label="Join Us"
                variant="primary"
                onClick={onJoinUs}
              />
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
