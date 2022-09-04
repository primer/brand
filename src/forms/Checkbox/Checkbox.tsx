import React, {forwardRef, InputHTMLAttributes, ReactElement, RefObject, useLayoutEffect, useRef} from 'react'
import clsx from 'clsx'

import type {BaseProps} from '../../component-helpers'
import type {FormValidationStatus} from '../form-types'

import '../../../lib/design-tokens/css/tokens/functional/components/control/base.css'
import styles from './Checkbox.module.css'

export type CheckboxProps = {
  /**
   * Apply indeterminate visual appearance to the checkbox
   */
  indeterminate?: boolean
  /**
   * Apply inactive visual appearance to the checkbox
   */
  disabled?: boolean
  /**
   * Forward a ref to the underlying input element
   */
  ref?: React.RefObject<HTMLInputElement>
  /**
   * Indicates whether the checkbox must be checked
   */
  required?: boolean
  /**
   * Only used to inform ARIA attributes. Individual checkboxes do not have validation styles.
   */
  validationStatus?: FormValidationStatus
  /**
   * A unique value that is never shown to the user.
   * Used during form submission and to identify which checkbox inputs are selected
   */
  value?: string
} & Exclude<InputHTMLAttributes<HTMLInputElement>, 'value'> &
  BaseProps<HTMLInputElement>

const _Checkbox = (
  {checked, className, indeterminate, disabled, onChange, required, validationStatus, value, ...rest}: CheckboxProps,
  ref
): ReactElement => {
  const inputRef: RefObject<HTMLInputElement> | null = useRef<HTMLInputElement>(ref || null)

  // replace with isomorphic useEffect
  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate || false
    }
  }, [indeterminate, checked, inputRef])

  return (
    <input
      aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-invalid={validationStatus === 'error' ? 'true' : 'false'}
      aria-required={required ? 'true' : 'false'}
      checked={indeterminate ? false : checked}
      className={clsx(styles.Checkbox, className)}
      disabled={disabled}
      name={value}
      onChange={onChange}
      ref={inputRef}
      required={required}
      type="checkbox"
      value={value}
      {...rest}
    />
  )
}

export const Checkbox = forwardRef(_Checkbox)
