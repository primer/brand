import React, {forwardRef} from 'react'
import {clsx} from 'clsx'

import type {BaseProps} from '../../component-helpers'
import type {FormInputSizes, FormValidationStatus} from '../form-types'

import styles from './Select.module.css'

export type SelectProps = {
  /**
   * Applies full width styling.
   */
  fullWidth?: boolean
  /**
   * Applies a required attribute to the input
   */
  required?: boolean
  /**
   * Applies alternative sizing to the input
   */
  size?: FormInputSizes
  /**
   * Placeholder text to display when no value is selected
   */
  placeholder?: string
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
    placeholder,
    size = 'medium',
    validationStatus,
    ...rest
  }: SelectProps,
  ref,
) => {
  return (
    <span
      className={clsx(
        styles['Select-wrapper'],
        styles[`Select-wrapper--${size}`],
        fullWidth && styles['Select-wrapper--fullWidth'],
        validationStatus && styles[`Select--${validationStatus}`],
        disabled && styles[`Select-wrapper--disabled`],
      )}
    >
      <select
        aria-invalid={validationStatus === 'error'}
        className={clsx(
          styles.Select,
          styles[`Select--${size}`],
          'Select',
          fullWidth && styles['Select--fullWidth'],
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled={disabled}>
            {placeholder}
          </option>
        )}
        {children}
      </select>
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

/**
 * Select
 */
export const Select = Object.assign(SelectRoot, {
  Option,
  OptGroup,
})
