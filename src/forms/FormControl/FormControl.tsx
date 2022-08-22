import React from 'react'
import {useId} from '@reach/auto-id' // TODO: Replace with useId from React v18 after upgrade
import clsx from 'clsx'
import {AlertFillIcon, CheckCircleFillIcon} from '@primer/octicons-react'

import type {BaseProps} from '../../component-helpers'
import type {FormValidationStatus, FormInputSizes} from '../'

import {TextInput} from '../TextInput'

import styles from './FormControl.module.css'

export type FormControlProps = BaseProps<HTMLElement> & {
  /**
   * Namespaced children include: `FormControl.Label`, `FormControl.TextInput`, `FormControl.Validation`.
   */
  children?: React.ReactElement[]
  /**
   * Applies full width styling.
   */
  fullWidth?: boolean
  /**
   * A unique identifier for the form control.
   * This is used to associate the form control with its associated label.
   * If an id is not provided, a unique id will be generated.
   */
  id?: string
  /**
   * Applies required styling to the label and input.
   */
  required?: boolean
  /**
   * Alternative sizes for inputs and labels.
   */
  size?: FormInputSizes
  /**
   * Provides contextual validation feedback to all children, showing relevant messaging where applicable.
   */
  validationStatus?: FormValidationStatus
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
          /**
           * TextInput
           */
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
            /**
             * Label
             */
            return React.cloneElement(child, {
              className: clsx(child.props.className),
              htmlFor: uniqueId,
              children: child.props.children,
              required,
              validationStatus,
              size
            })
          } else if (child.type === FormControlValidation) {
            /**
             * Validation
             */
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
  size?: FormInputSizes
  validationStatus?: FormValidationStatus
  visuallyHidden?: boolean
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
  validationStatus?: FormValidationStatus
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
 * FormControl
 * {@link https://primer.style/brand/components/FormControl/ See usage examples}.
 */
export const FormControl = Object.assign(Root, {
  Label: FormControlLabel,
  TextInput,
  Validation: FormControlValidation
})
