export type RegistrationRole = 'Student' | 'Trainer'

export interface StudentFormValues {
  firstName: string
  lastName: string
  dateOfBirth?: Date | null
  address?: string
}

export interface TrainerFormValues {
  firstName: string
  lastName: string
  specialization: string
}

export type RegistrationFormValues = StudentFormValues | TrainerFormValues

export interface RegistrationResponse {
  username: string
  password: string
}

export interface RegistrationFormProps {
  onSubmit?: (role: RegistrationRole, values: RegistrationFormValues) => Promise<RegistrationResponse> | RegistrationResponse
  className?: string
}
