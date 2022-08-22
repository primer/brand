import React from 'react'
import {useId} from '@reach/auto-id' // TODO: Replace with useId from React v18 after upgrade
import clsx from 'clsx'

import type {BaseProps} from '../../component-helpers'
import {TextInput} from '../TextInput'
import styles from './FormControl.module.css'
import {AlertFillIcon, CheckCircleFillIcon} from '@primer/octicons-react'

export type FormControlProps = BaseProps<HTMLElement> & {
  /**
   * Only specific children are valid.
   * These include: `FormControl.Visual` and `FormControl.Content`.
   * The declarative order of the children will be ignored in the rendered output
   * to enforce correct HTML semantics.
   */
  children?: React.ReactElement[]

  fullWidth?: boolean
  /**
   * Unique identifier for the form control. This is used to associate the form control with the form control label.
   */
  id?: string

  required?: boolean

  validationStatus?: 'error' | 'success'

  size?: 'medium' | 'large'
}

const Root = ({
  children,
  className,
  fullWidth,
  id,
  required,
  size = 'medium',
  validationStatus,
  ...rest
}: FormControlProps) => {
  const uniqueId = useId(id)

  return (
    <section
      id={`FormControl--${uniqueId}`}
      className={clsx(styles.FormControl, fullWidth && styles[`FormControl--fullWidth`], className)}
      {...rest}
    >
      {React.Children.map(children, child => {
        if (child) {
          if (child.type === TextInput) {
            return React.cloneElement(child, {
              className: clsx(child.props.className),
              id: uniqueId,
              name: uniqueId,
              required: child.props.required || required,
              validationStatus: child.props.validationStatus || validationStatus,
              fullWidth,
              size
            })
          } else if (child.type === FormControlLabel) {
            return React.cloneElement(child, {
              className: clsx(child.props.className),
              htmlFor: uniqueId,
              children: child.props.children,
              required,
              validationStatus,
              size
            })
          } else if (child.type === FormControlValidation) {
            return React.cloneElement(child, {
              validationStatus
            })
          } else {
            return child
          }
        }
      })}
    </section>
  )
}

type FormControlLabelProps = {
  children: string
  htmlFor?: string
  required?: boolean
  validationStatus?: 'error' | 'success'
  visuallyHidden?: boolean
  size?: 'medium' | 'large'
} & BaseProps<HTMLLabelElement>

const FormControlLabel = ({
  children,
  className,
  htmlFor,
  required,
  size = 'medium',
  validationStatus,
  visuallyHidden,
  ...rest
}: FormControlLabelProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      id={`FormControl-label--${htmlFor}`}
      htmlFor={htmlFor}
      className={clsx(
        styles['FormControl-label'],
        validationStatus && styles[`FormControl-label--${validationStatus}`],
        styles[`FormControl-label--${size}`],
        visuallyHidden && styles['FormControl-label--visually-hidden'],
        className
      )}
      {...rest}
    >
      {children}
      {required && (
        <span className={styles['FormControl-label-required']} aria-hidden>
          {' '}
          *
        </span>
      )}
    </label>
  )
}

type FormControlValidationProps = {
  children: string
  validationStatus?: 'error' | 'success'
} & BaseProps<HTMLSpanElement>

const FormControlValidation = ({children, validationStatus}: FormControlValidationProps) => {
  return (
    <span
      className={clsx(
        styles['FormControl-validation'],
        validationStatus && styles['FormControl-validation--animate-in'],
        validationStatus && styles[`FormControl-validation--${validationStatus}`]
      )}
    >
      {validationStatus === 'error' && (
        <span className={styles['FormControl-validation-icon']}>
          <AlertFillIcon />
        </span>
      )}
      {validationStatus === 'success' && (
        <span className={styles['FormControl-validation-icon']}>
          <CheckCircleFillIcon />
        </span>
      )}
      {children}
    </span>
  )
}

/**
 * Alternating text and image pairs.
 */
export const FormControl = Object.assign(Root, {
  Label: FormControlLabel,
  TextInput,
  Validation: FormControlValidation
})
