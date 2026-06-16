import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar } from 'lucide-react'
import styles from './DatePickerField.module.css'
import type { DatePickerFieldProps } from './DatePickerField.types'
import { cn } from '@/lib/utils'

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  id,
  label,
  selected,
  onChange,
  placeholder = 'Select date',
  minDate,
  maxDate,
  showYearDropdown = true,
  className,
}) => {
  return (
    <div className={cn(styles.field, className)}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.pickerWrapper}>
        <span className={styles.pickerIcon} aria-hidden="true">
          <Calendar size={16} />
        </span>
        <ReactDatePicker
          id={id}
          selected={selected}
          onChange={onChange}
          dateFormat="dd MMM yyyy"
          placeholderText={placeholder}
          className={styles.input}
          showYearDropdown={showYearDropdown}
          dropdownMode="select"
          minDate={minDate}
          maxDate={maxDate}
          wrapperClassName="w-full"
        />
      </div>
    </div>
  )
}

export default DatePickerField
