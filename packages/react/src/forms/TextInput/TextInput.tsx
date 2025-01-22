import React, {forwardRef, useMemo} from 'react'
import clsx from 'clsx'
import {useId} from '../../hooks/useId'

import type {BaseProps} from '../../component-helpers'
import type {FormInputSizes, FormValidationStatus} from '../form-types'
import {Text} from '../../Text'

import styles from './TextInput.module.css'
import {Icon} from '@primer/octicons-react'

type VisualType = React.ReactElement | React.ReactNode | Icon

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
  ref,
) => {
  const uniqueId = useId()

  const showLeadingText = leadingText && !LeadingVisual
  const showLeadingVisual = LeadingVisual && !leadingText
  const showTrailingText = trailingText && !TrailingVisual
  const showTrailingVisual = TrailingVisual && !trailingText

  const leadingTextId = `${uniqueId}-leading-text`
  const leadingVisualId = `${uniqueId}-leading-visual`
  const trailingVisualId = `${uniqueId}-trailing-visual`
  const trailingTextId = `${uniqueId}-trailing-text`

  const describedBy = useMemo(() => {
    const elements = [
      {condition: showLeadingText, id: leadingTextId},
      {condition: showLeadingVisual, id: leadingVisualId},
      {condition: showTrailingVisual, id: trailingVisualId},
      {condition: showTrailingText, id: trailingTextId},
    ]

    return elements
      .filter(({condition}) => condition)
      .map(({id}) => id)
      .join(' ')
  }, [
    showLeadingText,
    showLeadingVisual,
    showTrailingVisual,
    showTrailingText,
    leadingTextId,
    leadingVisualId,
    trailingVisualId,
    trailingTextId,
  ])

  return (
    <span
      className={clsx(
        styles['TextInput-wrapper'],
        styles[`TextInput-wrapper--${size}`],
        fullWidth && styles['TextInput-wrapper--fullWidth'],
        invisible && styles['TextInput-wrapper--invisible'],
        disabled && styles['TextInput-wrapper--disabled'],
        monospace && styles['TextInput-wrapper--monospace'],
        validationStatus && styles[`TextInput-wrapper--${validationStatus}`],
      )}
    >
      {showLeadingText && (
        <span
          className={clsx(
            styles['TextInput-leading-text'],
            styles[`TextInput-leading-text--${size}`],
            disabled && styles['TextInput-leading-text--disabled'],
            validationStatus && styles[`TextInput-leading-text--${validationStatus}`],
          )}
        >
          <Text
            size={size === 'large' ? '200' : '100'}
            as="span"
            className={clsx(styles['TextInput-leading-text-inner'], styles[`TextInput-leading-text-inner--${size}`])}
            id={leadingTextId}
          >
            {leadingText}
          </Text>
        </span>
      )}
      {showLeadingVisual && (
        <span className={clsx(styles['TextInput-leading-visual'], styles[`TextInput-leading-visual--${size}`])}>
          {LeadingVisual && React.isValidElement(LeadingVisual)
            ? React.cloneElement(LeadingVisual as React.ReactElement, {
                className: clsx(
                  styles['TextInput-leading-visual-icon'],
                  styles[`TextInput-leading-visual-icon--${size}`],
                ),
                width: size === 'large' ? 20 : 16,
                height: size === 'large' ? 20 : 16,
                id: leadingVisualId,
              })
            : null}
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
          TrailingVisual && styles[`TextInput--has-trailing-visual--${size}`],
          validationStatus && styles[`TextInput--${validationStatus}`],
          leadingText && !LeadingVisual && styles['TextInput--has-leading-text'],
          trailingText && !TrailingVisual && styles['TextInput--has-trailing-text'],
          className,
        )}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={validationStatus === 'error'}
        aria-describedby={describedBy || undefined}
        {...rest}
      />
      {showTrailingVisual && (
        <span className={clsx(styles['TextInput-trailing-visual'], styles[`TextInput-trailing-visual--${size}`])}>
          {TrailingVisual && React.isValidElement(TrailingVisual)
            ? React.cloneElement(TrailingVisual as React.ReactElement, {
                className: clsx(
                  styles['TextInput-trailing-visual-icon'],
                  styles[`TextInput-trailing-visual-icon--${size}`],
                ),
                width: size === 'large' ? 20 : 16,
                height: size === 'large' ? 20 : 16,
                id: trailingVisualId,
              })
            : null}
        </span>
      )}
      {showTrailingText && (
        <span
          className={clsx(
            styles['TextInput-trailing-text'],
            styles[`TextInput-trailing-text--${size}`],
            disabled && styles['TextInput-trailing-text--disabled'],
            validationStatus && styles[`TextInput-trailing-text--${validationStatus}`],
          )}
        >
          <Text
            size={size === 'large' ? '200' : '100'}
            as="span"
            className={clsx(styles['TextInput-trailing-text-inner'], styles[`TextInput-trailing-text-inner--${size}`])}
            id={trailingTextId}
          >
            {trailingText}
          </Text>
        </span>
      )}
    </span>
  )
}

export const TextInput = forwardRef(_TextInput)

TextInput.displayName = 'TextInput'
