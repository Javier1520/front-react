import React from 'react'
import styles from './JoinUsBox.module.css'
import type { JoinUsBoxProps } from './JoinUsBox.types'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'

const TRAINER_IMAGE = 'https://picsum.photos/seed/trainer/400/300'
const STUDENT_IMAGE = 'https://picsum.photos/seed/student/400/300'

const DEFAULT_DESC = 'Do consectetur proident proident id eiusmod deserunt consequat pariatur ad ex velit do Lorem reprehenderit.'

const JoinUsBox: React.FC<JoinUsBoxProps> = ({
  role,
  description = DEFAULT_DESC,
  imageUrl,
  onJoin,
  className,
}) => {
  const imgSrc = imageUrl ?? (role === 'Trainer' ? TRAINER_IMAGE : STUDENT_IMAGE)

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.content}>
        <span className={styles.role}>{role}</span>
        <h2 className={styles.title}>Register as {role}</h2>
        <p className={styles.description}>{description}</p>
        <Button
          id={`join-us-${role.toLowerCase()}-btn`}
          label="Sign up"
          variant="primary"
          size="sm"
          onClick={() => onJoin?.(role)}
        />
      </div>
      <div className={styles.imageWrapper}>
        <img
          src={imgSrc}
          alt={`Register as ${role}`}
          className={styles.image}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default JoinUsBox
