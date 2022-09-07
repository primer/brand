import React, {forwardRef, PropsWithChildren} from 'react'
import clsx from 'clsx'

import type {BaseProps} from '../../component-helpers'
import type {FormInputSizes, FormValidationStatus} from '../form-types'

import styles from './Select.module.css'

export type SelectProps = {
  /**
   * Applies full width styling.
   */
  fullWidth?: boolean
  /**
   * Applies inset styling
   */
  inset?: boolean
  /**
   * Applies a required attribute to the input
   */
  required?: boolean
  /**
   * Applies alternative sizing to the input
   */
  size?: FormInputSizes
  /**
   *
   */
  validationStatus?: FormValidationStatus
} & Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'size'> &
  BaseProps<HTMLSelectElement>

const _SelectRoot = (
  {
    children,
    className,
    disabled,
    fullWidth = false,
    inset,
    placeholder,
    size = 'medium',
    validationStatus,
    ...rest
  }: SelectProps,
  ref
) => {
  return (
    <span
      className={clsx(
        styles['Select-wrapper'],
        fullWidth && styles['Select-wrapper--fullWidth'],
        validationStatus && styles[`Select--${validationStatus}`]
      )}
    >
      <select
        aria-invalid={validationStatus === 'error'}
        className={clsx(
          styles.Select,
          'Select',
          styles[`Select--${size}`],
          fullWidth && styles['Select--fullWidth'],
          inset && styles['Select--inset'],
          className
        )}
        disabled={disabled}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
      <span className={clsx(styles['Select-arrow-indicator'], styles['Select-arrow-indicator--disabled'])}>
        <ArrowIndicator />
      </span>
    </span>
  )
}

const SelectRoot = forwardRef(_SelectRoot)

export type OptionProps = {
  value: string
} & React.PropsWithChildren<React.HTMLProps<HTMLOptionElement>>

const Option = ({children, value, ...rest}: OptionProps) => {
  return (
    <option value={value} {...rest}>
      {children}
    </option>
  )
}

export type OptGroupProps = {
  /**
   * Specifies that an option-group should be disabled
   */
  disabled?: string
  /**
   * Specifies a label for an option-group
   */
  label: string
} & React.PropsWithChildren<React.HTMLProps<HTMLOptGroupElement>>

const OptGroup = ({children, label, ...rest}: OptGroupProps) => {
  return (
    <optgroup label={label} {...rest}>
      {children}
    </optgroup>
  )
}

type ArrowIndicatorProps = {
  className?: string
}

const ArrowIndicator = ({className}: PropsWithChildren<ArrowIndicatorProps>) => (
  <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={clsx(className)}>
    <path d="m4.074 9.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.043 9H4.251a.25.25 0 0 0-.177.427ZM4.074 7.47 7.47 4.073a.25.25 0 0 1 .354 0L11.22 7.47a.25.25 0 0 1-.177.426H4.251a.25.25 0 0 1-.177-.426Z" />
  </svg>
)

/**
 * Select
 */
export const Select = Object.assign(SelectRoot, {
  Option,
  OptGroup
})
