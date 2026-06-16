export interface LoginFormValues {
  username: string
  password: string
}

export interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => Promise<void> | void
  onSignUpClick?: () => void
  className?: string
}
