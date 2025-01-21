import React, {forwardRef, InputHTMLAttributes, ReactElement, RefObject, useRef} from 'react'
import clsx from 'clsx'
import {useId} from '../../hooks/useId'

import type {BaseProps} from '../../component-helpers'

import styles from './Radio.module.css'

export type RadioProps = {
  /**
   * Apply inactive visual appearance to the Radio
   */
  disabled?: boolean
  /**
   * Forward a ref to the underlying input element
   */
  ref?: React.RefObject<HTMLInputElement>
  /**
   * Indicates whether the Radio must be checked
   */
  required?: boolean
  /**
   * A unique value that is never shown to the user.
   * Used during form submission and to identify which Radio inputs are selected
   */
  value?: string
} & Exclude<InputHTMLAttributes<HTMLInputElement>, 'value'> &
  BaseProps<HTMLInputElement>

const _Radio = (
  {checked, className, disabled, id, onChange, required, value, ...rest}: RadioProps,
  ref,
): ReactElement => {
  const inputRef: RefObject<HTMLInputElement> | null = useRef<HTMLInputElement>(ref || null)
  const uniqueId = useId(id)

  return (
    <span className={styles['Radio-wrapper']}>
      <input
        id={uniqueId}
        aria-checked={checked ? 'true' : 'false'}
        checked={checked}
        className={clsx(styles['Radio-input'])}
        disabled={disabled}
        name={value}
        onChange={onChange}
        ref={inputRef}
        required={required}
        type="radio"
        value={value}
        {...rest}
      />
      <label htmlFor={uniqueId} className={clsx(styles.Radio, className)}>
        <span className={styles['Radio-dot']} />
      </label>
    </span>
  )
}

export const Radio = forwardRef(_Radio)
