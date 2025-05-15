import React, {forwardRef, useCallback, type InputHTMLAttributes, type ReactElement, type RefObject} from 'react'
import clsx from 'clsx'
import {useId} from '../../hooks/useId'

import type {BaseProps} from '../../component-helpers'
import type {FormValidationStatus} from '../form-types'
import useLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'

import styles from './Checkbox.module.css'
import {useProvidedRefOrCreate} from '../../hooks/useRef'

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
  {
    checked,
    className,
    indeterminate,
    disabled,
    id,
    onChange,
    required,
    validationStatus,
    value,
    ...rest
  }: CheckboxProps,
  ref,
): ReactElement => {
  const inputRef: RefObject<HTMLInputElement> | null = useProvidedRefOrCreate<HTMLInputElement>(ref || null)
  const uniqueId = useId(id)

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate || false
    }
  }, [indeterminate, checked, inputRef])

  const onClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }, [disabled, inputRef])

  return (
    <span className={styles['Checkbox-wrapper']}>
      <input
        id={uniqueId}
        aria-invalid={validationStatus === 'error' ? 'true' : 'false'}
        aria-required={required ? 'true' : 'false'}
        checked={indeterminate ? false : checked}
        className={clsx(styles['Checkbox-input'])}
        disabled={disabled}
        name={value}
        onChange={onChange}
        ref={inputRef}
        required={required}
        type="checkbox"
        value={value}
        {...rest}
      />
      <span
        className={clsx(styles['Checkbox'], indeterminate && styles['Checkbox--indeterminate'], className)}
        onClick={onClick}
        tabIndex={-1}
        aria-hidden="true"
      >
        {indeterminate ? (
          <svg
            className={clsx(styles['Checkbox-checkmark'])}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M2 7.75A.75.75 0 012.75 7h10a.75.75 0 010 1.5h-10A.75.75 0 012 7.75z"></path>
          </svg>
        ) : (
          <svg viewBox="0 0 100 100" className={clsx(styles['Checkbox-checkmark'])} aria-hidden="true">
            <path
              className={clsx(styles['Checkbox-checkmark-path'])}
              fill="none"
              stroke="#000"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              d="M12.1 52.1l24.4 24.4 53-53"
            />
          </svg>
        )}
      </span>
    </span>
  )
}

export const Checkbox = forwardRef(_Checkbox)
