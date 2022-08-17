import React, {forwardRef} from 'react'
import {IconProps} from '@primer/octicons-react'
import clsx from 'clsx'
import type {BaseProps} from '../../component-helpers'

import styles from './TextInput.module.css'

export type TextInputProps = {
  /**
   *
   */
  fullWidth?: boolean
  /**
   *
   */
  inset?: boolean
  /**
   *
   */
  leadingText?: string
  /**
   *
   */
  leadingVisual?: React.ReactNode
  /**
   *
   */
  monospace?: boolean
  /**
   *
   */
  size?: 'medium' | 'large'
  /**
   *
   */
  trailingText?: string
  /**
   *
   */
  trailingVisual?: React.ReactNode
  /**
   *
   */
  validationStatus?: 'error' | 'success' | 'warning'
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  BaseProps<HTMLInputElement>

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      disabled,
      fullWidth = false,
      inset,
      leadingText,
      leadingVisual: LeadingVisual,
      monospace,
      placeholder,
      size = 'medium',
      trailingText,
      trailingVisual: TrailingVisual,
      validationStatus,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        className={clsx(
          styles['TextInput-wrapper'],
          fullWidth && styles['TextInput-wrapper--fullWidth'],
          monospace && styles['TextInput-wrapper--monospace']
        )}
      >
        {leadingText && !LeadingVisual && (
          <span
            className={clsx(
              styles['TextInput-leading-text'],
              styles[`TextInput-leading-text--${size}`],
              validationStatus && styles[`TextInput-leading-text--${validationStatus}`]
            )}
          >
            {leadingText}
          </span>
        )}
        {LeadingVisual && !leadingText && (
          <span className={styles['TextInput-leading-visual']}>
            {typeof LeadingVisual === 'function' ? (
              <LeadingVisual
                className={clsx(
                  styles['TextInput-leading-visual-icon'],
                  size && styles[`TextInput-leading-visual-icon--${size}`]
                )}
              />
            ) : (
              LeadingVisual
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
            inset && styles['TextInput--inset'],
            LeadingVisual && styles[`TextInput--has-leading-visual--${size}`],
            TrailingVisual && styles['TextInput--has-trailing-visual'],
            validationStatus && styles[`TextInput--${validationStatus}`],
            leadingText && !LeadingVisual && styles['TextInput--has-leading-text'],
            trailingText && !TrailingVisual && styles['TextInput--has-trailing-text']
          )}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        {TrailingVisual && !trailingText && (
          <span className={styles['TextInput-trailing-visual']}>
            {typeof TrailingVisual === 'function' ? (
              <TrailingVisual
                className={clsx(
                  styles['TextInput-trailing-visual-icon'],
                  size && styles[`TextInput-trailing-visual-icon--${size}`]
                )}
              />
            ) : (
              TrailingVisual
            )}
          </span>
        )}
        {trailingText && !TrailingVisual && (
          <span
            className={clsx(
              styles['TextInput-trailing-text'],
              styles[`TextInput-trailing-text--${size}`],
              validationStatus && styles[`TextInput-trailing-text--${validationStatus}`]
            )}
          >
            {trailingText}
          </span>
        )}
      </span>
    )
  }
)
