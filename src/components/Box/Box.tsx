import React from 'react'
import { Clock } from 'lucide-react'
import styles from './Box.module.css'
import type { BoxProps } from './Box.types'
import { cn } from '@/lib/utils'

const Box: React.FC<BoxProps> = ({
  tag,
  title,
  date = 'Dec 24, 2022',
  timeToRead = '5 mins read',
  imageUrl = 'https://picsum.photos/seed/box1/400/220',
  imageAlt = 'Article image',
  onClick,
  className,
}) => {
  return (
    <article className={cn(styles.card, className)} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={imageAlt} className={styles.image} loading="lazy" />
      </div>
      <div className={styles.content}>
        {tag && <span className={styles.tag}>{tag}</span>}
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <span className={styles.metaDate}>{date}</span>
          <span className={styles.metaTime}>
            <Clock size={13} aria-hidden="true" />
            {timeToRead}
          </span>
        </div>
      </div>
    </article>
  )
}

export default Box
