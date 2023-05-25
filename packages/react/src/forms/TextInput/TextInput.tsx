import React, {forwardRef} from 'react'
import clsx from 'clsx'

import type {BaseProps} from '../../component-helpers'
import type {FormInputSizes, FormValidationStatus} from '../form-types'

import styles from './TextInput.module.css'

type VisualType = React.ReactElement | React.ReactNode

export type TextInputProps = {
  /**
   * Applies full width styling.
   */
  fullWidth?: boolean
  /**
   * Removes border
   */
  invisible?: boolean
  /**
   * Applies non-interactive text to start of input.
   */
  leadingText?: string
  /**
   * Applies non-interactive iconography to start of input.
   */
  leadingVisual?: VisualType
  /**
   * Applies monospace styling.
   */
  monospace?: boolean
  /**
   * Applies alternative sizing to the input
   */
  size?: FormInputSizes
  /**
   * Applies non-interactive text to end of input.
   */
  trailingText?: string
  /**
   * Applies non-interactive iconography to end of input.
   */
  trailingVisual?: VisualType
  /**
   * Constrains the input type to single line inputs.
   */
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local'
  /**
   * Applies a required attribute to the input
   */
  required?: boolean
  /**
   *
   */
  validationStatus?: FormValidationStatus
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> &
  BaseProps<HTMLInputElement>

const _TextInput = (
  {
    className,
    disabled,
    fullWidth = false,
    invisible = false,
    leadingText,
    leadingVisual: LeadingVisual,
    monospace,
    placeholder,
    size = 'medium',
    trailingText,
    trailingVisual: TrailingVisual,
    validationStatus,
    ...rest
  }: TextInputProps,
  ref
) => {
  return (
    <span
      className={clsx(
        styles['TextInput-wrapper'],
        fullWidth && styles['TextInput-wrapper--fullWidth'],
        invisible && styles['TextInput-wrapper--invisible'],
        disabled && styles['TextInput-wrapper--disabled'],
        monospace && styles['TextInput-wrapper--monospace'],
        validationStatus && styles[`TextInput-wrapper--${validationStatus}`]
      )}
    >
      {leadingText && !LeadingVisual && (
        <span
          className={clsx(
            styles['TextInput-leading-text'],
            styles[`TextInput-leading-text--${size}`],
            disabled && styles['TextInput-leading-text--disabled'],
            validationStatus && styles[`TextInput-leading-text--${validationStatus}`]
          )}
        >
          <span
            className={clsx(styles['TextInput-leading-text-inner'], styles[`TextInput-leading-text-inner--${size}`])}
          >
            {leadingText}
          </span>
        </span>
      )}
      {LeadingVisual && !leadingText && (
        <span className={styles['TextInput-leading-visual']}>
          {typeof LeadingVisual === 'function' ? (
            <LeadingVisual
              className={clsx(
                styles['TextInput-leading-visual-icon'],
                styles[`TextInput-leading-visual-icon--${size}`]
              )}
            />
          ) : (
            React.isValidElement(LeadingVisual) &&
            React.cloneElement(LeadingVisual as React.ReactElement, {
              className: clsx(
                styles['TextInput-leading-visual-icon'],
                styles[`TextInput-leading-visual-icon--${size}`]
              ),
              width: size === 'large' ? 20 : 16,
              height: size === 'large' ? 20 : 16
            })
          )}
        </span>
      )}
      <input
        type="text"
        ref={ref}
        className={clsx(
          styles.TextInput,
          'TextInput',
          styles[`TextInput--${size}`],
          fullWidth && styles['TextInput--fullWidth'],
          LeadingVisual && styles[`TextInput--has-leading-visual--${size}`],
          TrailingVisual && styles['TextInput--has-trailing-visual'],
          validationStatus && styles[`TextInput--${validationStatus}`],
          leadingText && !LeadingVisual && styles['TextInput--has-leading-text'],
          trailingText && !TrailingVisual && styles['TextInput--has-trailing-text'],
          className
        )}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={validationStatus === 'error'}
        {...rest}
      />
      {TrailingVisual && !trailingText && (
        <span className={styles['TextInput-trailing-visual']}>
          {typeof TrailingVisual === 'function' ? (
            <TrailingVisual
              className={clsx(
                styles['TextInput-trailing-visual-icon'],
                styles[`TextInput-trailing-visual-icon--${size}`]
              )}
            />
          ) : TrailingVisual && React.isValidElement(TrailingVisual) ? (
            React.cloneElement(TrailingVisual as React.ReactElement, {
              className: clsx(
                styles['TextInput-trailing-visual-icon'],
                styles[`TextInput-trailing-visual-icon--${size}`]
              ),
              width: size === 'large' ? 20 : 16,
              height: size === 'large' ? 20 : 16
            })
          ) : null}
        </span>
      )}
      {trailingText && !TrailingVisual && (
        <span
          className={clsx(
            styles['TextInput-trailing-text'],
            styles[`TextInput-trailing-text--${size}`],
            disabled && styles['TextInput-trailing-text--disabled'],
            validationStatus && styles[`TextInput-trailing-text--${validationStatus}`]
          )}
        >
          <span
            className={clsx(styles['TextInput-trailing-text-inner'], styles[`TextInput-trailing-text-inner--${size}`])}
          >
            {trailingText}
          </span>
        </span>
      )}
    </span>
  )
}

export const TextInput = forwardRef(_TextInput)

TextInput.displayName = 'TextInput'
