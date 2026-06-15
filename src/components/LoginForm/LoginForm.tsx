import React, { useState } from 'react'
import { User, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import styles from './LoginForm.module.css'
import type { LoginFormProps, LoginFormValues } from './LoginForm.types'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onSignUpClick,
  className,
}) => {
  const [values, setValues] = useState<LoginFormValues>({ username: '', password: '' })
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [captchaChecked, setCaptchaChecked] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<LoginFormValues> = {}
    if (!values.username.trim()) newErrors.username = 'Username is required'
    if (!values.password.trim()) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    try {
      await (onSubmit?.(values) ?? new Promise((r) => setTimeout(r, 1500)))
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof LoginFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.card}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>Welcome back</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className={styles.field}>
            <label htmlFor="login-username" className={styles.label}>User name</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><User size={16} /></span>
              <input
                id="login-username"
                type="text"
                value={values.username}
                onChange={handleChange('username')}
                placeholder="Enter email"
                className={cn(styles.input, errors.username && styles.inputError)}
                autoComplete="username"
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'login-username-error' : undefined}
              />
            </div>
            {errors.username && (
              <span id="login-username-error" className={styles.errorMsg} role="alert">
                <AlertCircle size={12} />
                {errors.username}
              </span>
            )}
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label htmlFor="login-password" className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><Lock size={16} /></span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                placeholder="Enter password"
                className={cn(styles.input, errors.password && styles.inputError)}
                style={{ paddingRight: 40 }}
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <span id="login-password-error" className={styles.errorMsg} role="alert">
                <AlertCircle size={12} />
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit */}
          <Button
            id="login-submit-btn"
            label="Sign In"
            variant="primary"
            isLoading={isLoading}
            type="submit"
            className={styles.submitBtn}
          />

          <div className={styles.divider}>or</div>

          {/* Sign Up link */}
          <div className={styles.signUpRow}>
            Don't have an account?{' '}
            <a
              href="/register"
              className={styles.signUpLink}
              id="login-signup-link"
              onClick={(e) => { e.preventDefault(); onSignUpClick?.() }}
            >
              Sign up
            </a>
          </div>

          {/* Captcha-like checkbox */}
          <div
            className={styles.captchaBox}
            onClick={() => setCaptchaChecked((v) => !v)}
            role="checkbox"
            aria-checked={captchaChecked}
            id="login-captcha"
            tabIndex={0}
            onKeyDown={(e) => e.key === ' ' && setCaptchaChecked((v) => !v)}
          >
            <div className={cn(styles.captchaCheckbox, captchaChecked && styles.captchaCheckboxChecked)}>
              {captchaChecked && <Check size={12} color="white" strokeWidth={3} />}
            </div>
            <span>I'm not a robot</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
