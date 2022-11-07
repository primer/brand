import React, {forwardRef} from 'react'
import clsx from 'clsx'

import type {BaseProps} from '../../component-helpers'
import type {FormInputSizes, FormValidationStatus} from '../form-types'

import styles from './Textarea.module.css'

export type TextareaProps = {
  /**
   * Applies full width styling.
   */
  fullWidth?: boolean
  /**
   * Removes border
   */
  invisible?: boolean
  /**
   * Applies monospace styling.
   */
  monospace?: boolean
  /**
   * Applies alternative sizing to the input
   */
  size?: FormInputSizes
  /**
   * Applies a required attribute to the input
   */
  required?: boolean
  /**
   *
   */
  validationStatus?: FormValidationStatus
  /**
   * Allows resizing of the textarea
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  BaseProps<HTMLTextAreaElement>

const _Textarea = (
  {
    children,
    className,
    cols = 30,
    disabled,
    fullWidth = false,
    invisible = false,
    monospace,
    placeholder,
    size = 'medium',
    validationStatus,
    resize = 'both',
    rows = 7,
    ...rest
  }: TextareaProps,
  ref
) => {
  return (
    <span
      className={clsx(
        styles['Textarea-wrapper'],
        fullWidth && styles['Textarea-wrapper--fullWidth'],
        invisible && styles['Textarea-wrapper--invisible'],
        disabled && styles['Textarea-wrapper--disabled'],
        monospace && styles['Textarea-wrapper--monospace'],
        validationStatus && styles[`Textarea-wrapper--${validationStatus}`]
      )}
    >
      <textarea
        ref={ref}
        className={clsx(
          styles.Textarea,
          'Textarea',
          styles[`Textarea--${size}`],
          styles[`Textarea-resize--${resize}`],
          fullWidth && styles['Textarea--fullWidth'],
          validationStatus && styles[`Textarea--${validationStatus}`],
          className
        )}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={validationStatus === 'error'}
        rows={rows}
        cols={cols}
        {...rest}
      >
        {children}
      </textarea>
    </span>
  )
}

export const Textarea = forwardRef(_Textarea)

Textarea.displayName = 'Textarea'
