import React, {forwardRef, useCallback, type InputHTMLAttributes, type ReactElement, type RefObject} from 'react'
import clsx from 'clsx'
import {useId} from '../../hooks/useId'
import {useProvidedRefOrCreate} from '../../hooks/useRef'

import type {BaseProps} from '../../component-helpers'

import styles from './Radio.module.css'

export type RadioProps = {
  /**
   * Apply inactive visual appearance to the Radio
   */
  disabled?: boolean
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
  const inputRef: RefObject<HTMLInputElement> | null = useProvidedRefOrCreate<HTMLInputElement>(ref || null)
  const uniqueId = useId(id)

  const onClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }, [disabled, inputRef])

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
      <span className={clsx(styles.Radio, className)} onClick={onClick} tabIndex={-1} aria-hidden="true">
        <span className={styles['Radio-dot']} />
      </span>
    </span>
  )
}

export const Radio = forwardRef(_Radio)
