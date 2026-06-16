export interface DatePickerFieldProps {
  id?: string
  label?: string
  selected: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  showYearDropdown?: boolean
  className?: string
}
