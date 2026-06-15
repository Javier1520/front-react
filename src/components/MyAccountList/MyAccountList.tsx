import React, { useState } from 'react'
import { Check, Edit2, X, AlertCircle } from 'lucide-react'
import styles from './MyAccountList.module.css'
import type { MyAccountListProps, UserProfile } from './MyAccountList.types'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'

const MyAccountList: React.FC<MyAccountListProps> = ({ profile, onSave, className }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>({ ...profile })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleToggleActive = () => {
    setEditedProfile((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }))
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!editedProfile.firstName.trim()) errs.firstName = 'First name is required'
    if (!editedProfile.lastName.trim()) errs.lastName = 'Last name is required'
    if (!editedProfile.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedProfile.email)) {
      errs.email = 'Please enter a valid email address'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSave?.(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile({ ...profile })
    setErrors({})
    setIsEditing(false)
  }

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const profileToShow = isEditing ? editedProfile : profile

  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.card}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <img
              src={profileToShow.avatarUrl || DEFAULT_AVATAR}
              alt={`${profileToShow.firstName} ${profileToShow.lastName}`}
              className={styles.avatar}
            />
          </div>
          <div className={styles.profileMeta}>
            <h2 className={styles.profileName}>
              {profileToShow.firstName} {profileToShow.lastName}
            </h2>
            <div className={styles.statusBadge} style={{
              background: profileToShow.isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: profileToShow.isActive ? '#10b981' : '#ef4444'
            }}>
              <span className={styles.statusDot} style={{
                background: profileToShow.isActive ? '#10b981' : '#ef4444'
              }} />
              {profileToShow.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
          {!isEditing && (
            <Button
              label="Edit"
              variant="secondary"
              icon={<Edit2 size={14} />}
              onClick={() => setIsEditing(true)}
              className={styles.editBtn}
            />
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className={styles.editForm} noValidate>
            <h3 className={styles.sectionTitle}>Edit Profile Info</h3>

            {/* First Name */}
            <div className={styles.field}>
              <label htmlFor="edit-firstname" className={styles.fieldLabel}>First Name</label>
              <input
                id="edit-firstname"
                type="text"
                className={styles.input}
                value={editedProfile.firstName}
                onChange={(e) => {
                  setEditedProfile({ ...editedProfile, firstName: e.target.value })
                  clearError('firstName')
                }}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {errors.firstName}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className={styles.field}>
              <label htmlFor="edit-lastname" className={styles.fieldLabel}>Last Name</label>
              <input
                id="edit-lastname"
                type="text"
                className={styles.input}
                value={editedProfile.lastName}
                onChange={(e) => {
                  setEditedProfile({ ...editedProfile, lastName: e.target.value })
                  clearError('lastName')
                }}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {errors.lastName}
                </span>
              )}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label htmlFor="edit-email" className={styles.fieldLabel}>Email Address</label>
              <input
                id="edit-email"
                type="email"
                className={styles.input}
                value={editedProfile.email}
                onChange={(e) => {
                  setEditedProfile({ ...editedProfile, email: e.target.value })
                  clearError('email')
                }}
              />
              {errors.email && (
                <span className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {errors.email}
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div className={styles.field}>
              <label htmlFor="edit-dob" className={styles.fieldLabel}>Date of Birth</label>
              <input
                id="edit-dob"
                type="date"
                className={styles.input}
                value={editedProfile.dateOfBirth || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })}
              />
            </div>

            {/* Address */}
            <div className={styles.field}>
              <label htmlFor="edit-address" className={styles.fieldLabel}>Address</label>
              <input
                id="edit-address"
                type="text"
                className={styles.input}
                value={editedProfile.address || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
              />
            </div>

            {/* Active Status Switch */}
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>Active Status</span>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={!!editedProfile.isActive}
                  onChange={handleToggleActive}
                />
                <span className={styles.slider} />
              </label>
            </div>

            <div className={styles.formActions}>
              <Button
                label="Save Changes"
                variant="primary"
                type="submit"
                icon={<Check size={16} />}
              />
              <Button
                label="Cancel"
                variant="secondary"
                onClick={handleCancel}
                icon={<X size={16} />}
              />
            </div>
          </form>
        ) : (
          <div>
            <h3 className={styles.sectionTitle}>Profile Details</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoField}>
                <div className={styles.infoLabel}>Username</div>
                <div className={styles.infoValue}>{profile.username}</div>
              </div>
              <div className={styles.infoField}>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoValue}>{profile.email}</div>
              </div>
              <div className={styles.infoField}>
                <div className={styles.infoLabel}>First Name</div>
                <div className={styles.infoValue}>{profile.firstName}</div>
              </div>
              <div className={styles.infoField}>
                <div className={styles.infoLabel}>Last Name</div>
                <div className={styles.infoValue}>{profile.lastName}</div>
              </div>
              <div className={styles.infoField}>
                <div className={styles.infoLabel}>Date of Birth</div>
                <div className={styles.infoValue}>{profile.dateOfBirth || 'Not specified'}</div>
              </div>
              <div className={styles.infoField}>
                <div className={styles.infoLabel}>Address</div>
                <div className={styles.infoValue}>{profile.address || 'Not specified'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAccountList
