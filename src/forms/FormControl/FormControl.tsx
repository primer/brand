import React, {PropsWithChildren} from 'react'
import {useId} from '@reach/auto-id' // TODO: Replace with useId from React v18 after upgrade
import clsx from 'clsx'
import {AlertFillIcon, CheckCircleFillIcon} from '@primer/octicons-react'

import type {BaseProps} from '../../component-helpers'
import type {FormValidationStatus, FormInputSizes} from '../'

import {Checkbox} from '../Checkbox'
import {Select} from '../Select'
import {TextInput} from '../TextInput'

import styles from './FormControl.module.css'

export type FormControlProps = BaseProps<HTMLElement> & {
  /**
   * Namespaced children include: `FormControl.Label`, `FormControl.Hint`, `FormControl.Validation`, `TextInput`, `Select`, `Checkbox`.
   */
  children?: React.ReactElement[]
  /**
   * Apply a decorative border to the form control.
   */
  hasBorder?: boolean
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
  hasBorder,
  fullWidth,
  id,
  required,
  size = 'medium',
  validationStatus,
  ...rest
}: FormControlProps) => {
  const uniqueId = useId(id)
  const isCheckboxControl = React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === Checkbox
  )

  return (
    <section
      id={uniqueId}
      className={clsx(
        styles.FormControl,
        fullWidth && styles[`FormControl--fullWidth`],
        isCheckboxControl && styles['FormControl--checkbox'],
        hasBorder && styles['FormControl--border'],
        className
      )}
      {...rest}
    >
      {React.Children.map(children, child => {
        if (child) {
          const inputId = `FormControl--${uniqueId}`

          /**
           * TextInput
           */
          if (child.type === TextInput) {
            return React.cloneElement(child, {
              className: clsx(child.props.className),
              id: inputId,
              name: inputId,
              required: child.props.required || required,
              validationStatus: child.props.validationStatus || validationStatus,
              fullWidth,
              size
            })
          } else if (child.type === Select) {
            /**
             * Select
             */
            return React.cloneElement(child, {
              className: clsx(child.props.className),
              id: inputId,
              name: inputId,
              required: child.props.required || required,
              validationStatus: child.props.validationStatus || validationStatus,
              fullWidth,
              size
            })
          } else if (child.type === Checkbox) {
            /**
             * Checkbox
             */
            return React.cloneElement(child, {
              className: clsx(child.props.className),
              id: inputId,
              name: inputId,
              required: child.props.required || required,
              validationStatus: child.props.validationStatus || validationStatus
            })
          } else if (child.type === FormControlLabel) {
            /**
             * Label
             */
            return React.cloneElement(child, {
              className: clsx(isCheckboxControl && styles['FormControl-label--checkbox'], child.props.className),
              htmlFor: inputId,
              children: child.props.children,
              required,
              validationStatus,
              size,
              showRequiredIndicator: isCheckboxControl ? false : child.props.showRequiredIndicator
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
  htmlFor?: string
  required?: boolean
  showRequiredIndicator?: boolean
  size?: FormInputSizes
  validationStatus?: FormValidationStatus
  visuallyHidden?: boolean
} & BaseProps<HTMLLabelElement>

const FormControlLabel = ({
  children,
  className,
  htmlFor,
  required,
  showRequiredIndicator = true,
  size = 'medium',
  validationStatus,
  visuallyHidden,
  ...rest
}: PropsWithChildren<FormControlLabelProps>) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
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
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === FormControlHint) {
            return React.cloneElement(child, {
              className: clsx(styles['FormControl--visible'], child.props.className)
            })
          }
        }
        return child
      })}

      {required && showRequiredIndicator && (
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

const FormControlHint = ({children, className, ...rest}: PropsWithChildren<BaseProps<HTMLSpanElement>>) => {
  return (
    <span className={clsx(styles['FormControl-hint'], className)} {...rest}>
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
  Validation: FormControlValidation,
  Hint: FormControlHint
})
