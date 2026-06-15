import React, { useState } from 'react'
import { Twitter, Facebook, Youtube } from 'lucide-react'
import styles from './Footer.module.css'
import type { FooterProps, FooterColumn, FooterLink } from './Footer.types'

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'User guides', href: '/guides' },
      { label: 'Webinars', href: '/webinars' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Contacts us', href: '/contacts' },
    ],
  },
]

const DEFAULT_PRIVACY: FooterLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

const Footer: React.FC<FooterProps> = ({
  columns = DEFAULT_COLUMNS,
  privacyLinks = DEFAULT_PRIVACY,
}) => {
  const [email, setEmail] = useState('')
  const [lang, setLang] = useState('English')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.inner}>
        <div className={styles.topSection}>
          {/* Logo */}
          <div className={styles.logoBlock}>
            <a href="/" className={styles.logo} aria-label="Learn — go to homepage">
              <span className={styles.logoIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L1 5l7 4 7-4-7-4z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 9l7 4 7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className={styles.logoText}>learn</span>
            </a>
          </div>

          {/* Nav columns */}
          <nav className={styles.navColumns} aria-label="Footer navigation">
            {columns.map((col) => (
              <div key={col.title} className={styles.column}>
                <h3 className={styles.columnTitle}>{col.title}</h3>
                <ul className={styles.columnLinks} role="list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.columnLink}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Subscribe */}
          <div className={styles.subscribeBlock}>
            <h3 className={styles.subscribeTitle}>Subscribe to our newsletter</h3>
            <p className={styles.subscribeDesc}>
              For product announcements and exclusive insights
            </p>
            <form className={styles.subscribeForm} onSubmit={handleSubscribe} aria-label="Newsletter subscription">
              <input
                id="footer-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.subscribeInput}
                aria-label="Email address"
                required
              />
              <button
                id="footer-subscribe-btn"
                type="submit"
                className={styles.subscribeBtn}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottomSection}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} Learn, Inc.
        </span>

        <div className={styles.privacyLinks}>
          {privacyLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.privacyLink}>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.bottomRight}>
          {/* Language selector */}
          <select
            id="footer-lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className={styles.langSelect}
            aria-label="Select language"
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="German">Deutsch</option>
          </select>

          {/* Social Icons */}
          <div className={styles.socialIcons} aria-label="Social media links">
            <a href="https://twitter.com" className={styles.socialIcon} aria-label="Twitter" target="_blank" rel="noreferrer">
              <Twitter size={18} />
            </a>
            <a href="https://facebook.com" className={styles.socialIcon} aria-label="Facebook" target="_blank" rel="noreferrer">
              <Facebook size={18} />
            </a>
            <a href="https://youtube.com" className={styles.socialIcon} aria-label="YouTube" target="_blank" rel="noreferrer">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
