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
      leadingVisual: LeadingVisual,
      monospace,
      placeholder,
      size = 'medium',
      trailingVisual: TrailingVisual,
      validationStatus,
      ...rest
    },
    ref
  ) => {
    return (
      <span className={clsx(styles['TextInput-wrapper'], fullWidth && styles['TextInput-wrapper--fullWidth'])}>
        {LeadingVisual && (
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
            monospace && styles['TextInput--monospace'],
            TrailingVisual && styles['TextInput--has-trailing-visual'],
            validationStatus && styles[`TextInput--${validationStatus}`]
          )}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        {TrailingVisual && (
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
      </span>
    )
  }
)
