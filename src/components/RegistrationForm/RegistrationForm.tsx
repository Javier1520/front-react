import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AlertCircle, CheckCircle } from 'lucide-react'
import styles from './RegistrationForm.module.css'
import type {
  RegistrationFormProps,
  RegistrationRole,
  RegistrationResponse,
  StudentFormValues,
  TrainerFormValues,
} from './RegistrationForm.types'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'

const SPECIALIZATIONS = [
  'Yoga',
  'Pilates',
  'Strength Training',
  'Cardio',
  'CrossFit',
  'Swimming',
  'Martial Arts',
  'Dance',
]

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, className }) => {
  const [role, setRole] = useState<RegistrationRole>('Trainer')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<RegistrationResponse | null>(null)

  // Student fields
  const [studentValues, setStudentValues] = useState<StudentFormValues>({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    address: '',
  })

  // Trainer fields
  const [trainerValues, setTrainerValues] = useState<TrainerFormValues>({
    firstName: '',
    lastName: '',
    specialization: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStudent = (): boolean => {
    const errs: Record<string, string> = {}
    if (!studentValues.firstName.trim()) errs.firstName = 'First name is required'
    if (!studentValues.lastName.trim()) errs.lastName = 'Last name is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateTrainer = (): boolean => {
    const errs: Record<string, string> = {}
    if (!trainerValues.firstName.trim()) errs.firstName = 'First name is required'
    if (!trainerValues.lastName.trim()) errs.lastName = 'Last name is required'
    if (!trainerValues.specialization) errs.specialization = 'Specialization is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const valid = role === 'Student' ? validateStudent() : validateTrainer()
    if (!valid) return

    setIsLoading(true)
    try {
      const values = role === 'Student' ? studentValues : trainerValues
      const result = await (onSubmit?.(role, values) ??
        new Promise<RegistrationResponse>((resolve) =>
          setTimeout(() => resolve({ username: 'john_doe_42', password: 'Xk7#mP9q' }), 1500)
        ))
      setResponse(result)
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = (field: string) => {
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n })
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Registration</h1>

          {/* Role tabs */}
          <div className={styles.roleTabs} role="tablist" aria-label="Registration role">
            {(['Trainer', 'Student'] as RegistrationRole[]).map((r) => (
              <button
                key={r}
                role="tab"
                id={`reg-tab-${r.toLowerCase()}`}
                aria-selected={role === r}
                className={cn(styles.roleTab, role === r && styles.roleTabActive)}
                onClick={() => { setRole(r); setErrors({}) }}
                type="button"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {response ? (
          /* Success screen */
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <CheckCircle size={28} color="white" />
            </div>
            <h2 className={styles.successTitle}>Account Created!</h2>
            <p className={styles.successDesc}>Your credentials for future logins:</p>
            <div className={styles.credentialsBox}>
              <div className={styles.credentialRow}>
                <span className={styles.credentialLabel}>Username</span>
                <span className={styles.credentialValue}>{response.username}</span>
              </div>
              <div className={styles.credentialRow}>
                <span className={styles.credentialLabel}>Password</span>
                <span className={styles.credentialValue}>{response.password}</span>
              </div>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* First Name */}
            <div className={styles.field}>
              <label htmlFor="reg-firstname" className={styles.label}>First name</label>
              <input
                id="reg-firstname"
                type="text"
                placeholder="First..."
                className={cn(styles.input, errors.firstName && styles.inputError)}
                value={role === 'Student' ? studentValues.firstName : trainerValues.firstName}
                onChange={(e) => {
                  if (role === 'Student') setStudentValues((p) => ({ ...p, firstName: e.target.value }))
                  else setTrainerValues((p) => ({ ...p, firstName: e.target.value }))
                  clearError('firstName')
                }}
                aria-invalid={!!errors.firstName}
                aria-required="true"
              />
              {errors.firstName && (
                <span className={styles.errorMsg} role="alert">
                  <AlertCircle size={12} /> {errors.firstName}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className={styles.field}>
              <label htmlFor="reg-lastname" className={styles.label}>Last name</label>
              <input
                id="reg-lastname"
                type="text"
                placeholder="Input last"
                className={cn(styles.input, errors.lastName && styles.inputError)}
                value={role === 'Student' ? studentValues.lastName : trainerValues.lastName}
                onChange={(e) => {
                  if (role === 'Student') setStudentValues((p) => ({ ...p, lastName: e.target.value }))
                  else setTrainerValues((p) => ({ ...p, lastName: e.target.value }))
                  clearError('lastName')
                }}
                aria-invalid={!!errors.lastName}
                aria-required="true"
              />
              {errors.lastName && (
                <span className={styles.errorMsg} role="alert">
                  <AlertCircle size={12} /> {errors.lastName}
                </span>
              )}
            </div>

            {role === 'Student' && (
              <>
                {/* Date of Birth */}
                <div className={styles.field}>
                  <label htmlFor="reg-dob" className={styles.label}>
                    Date of Birth
                    <span className={styles.optionalBadge}>(Optional)</span>
                  </label>
                  <DatePicker
                    id="reg-dob"
                    selected={studentValues.dateOfBirth}
                    onChange={(date) => setStudentValues((p) => ({ ...p, dateOfBirth: date }))}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/YYYY"
                    className={styles.input}
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Address */}
                <div className={styles.field}>
                  <label htmlFor="reg-address" className={styles.label}>
                    Address
                    <span className={styles.optionalBadge}>(Optional)</span>
                  </label>
                  <input
                    id="reg-address"
                    type="text"
                    placeholder="Input address"
                    className={styles.input}
                    value={studentValues.address ?? ''}
                    onChange={(e) => setStudentValues((p) => ({ ...p, address: e.target.value }))}
                  />
                </div>
              </>
            )}

            {role === 'Trainer' && (
              /* Specialization */
              <div className={styles.field}>
                <label htmlFor="reg-specialization" className={styles.label}>Specialization</label>
                <select
                  id="reg-specialization"
                  className={cn(styles.select, errors.specialization && styles.inputError)}
                  value={trainerValues.specialization}
                  onChange={(e) => {
                    setTrainerValues((p) => ({ ...p, specialization: e.target.value }))
                    clearError('specialization')
                  }}
                  aria-invalid={!!errors.specialization}
                  aria-required="true"
                >
                  <option value="">Please select</option>
                  {SPECIALIZATIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.specialization && (
                  <span className={styles.errorMsg} role="alert">
                    <AlertCircle size={12} /> {errors.specialization}
                  </span>
                )}
              </div>
            )}

            <Button
              id="reg-submit-btn"
              label="Submit"
              variant="primary"
              type="submit"
              isLoading={isLoading}
              className={styles.submitBtn}
            />
          </form>
        )}
      </div>
    </div>
  )
}

export default RegistrationForm
