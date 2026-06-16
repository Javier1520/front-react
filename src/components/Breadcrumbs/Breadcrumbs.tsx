import React from 'react'
import { ChevronRight } from 'lucide-react'
import styles from './Breadcrumbs.module.css'
import type { BreadcrumbsProps } from './Breadcrumbs.types'
import { cn } from '@/lib/utils'

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn(styles.breadcrumbs, className)}>
      <ol role="list" style={{ display: 'flex', alignItems: 'center', gap: 0, listStyle: 'none', margin: 0, padding: 0 }}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <li key={crumb.id} className={styles.item}>
              {!isLast ? (
                <>
                  <a
                    href={crumb.href}
                    className={styles.link}
                    onClick={(e) => e.preventDefault()}
                    aria-label={crumb.label}
                  >
                    {crumb.label}
                  </a>
                  <ChevronRight size={14} className={styles.separator} aria-hidden="true" />
                </>
              ) : (
                <span className={styles.current} aria-current="page">
                  {crumb.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
