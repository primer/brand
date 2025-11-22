import React, {PropsWithChildren} from 'react'
import {useId} from '../../hooks/useId'
import {clsx} from 'clsx'
import {AlertFillIcon, CheckCircleFillIcon} from '@primer/octicons-react'

import type {BaseProps} from '../../component-helpers'
import type {FormValidationStatus, FormInputSizes} from '../'

import {Checkbox} from '../Checkbox'
import {Select} from '../Select'
import {TextInput} from '../TextInput'
import {Textarea} from '../Textarea'
import {Radio} from '../Radio'
import {Text} from '../../Text'

import styles from './FormControl.module.css'

export type FormControlProps = BaseProps<HTMLElement> & {
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

/**
 * The Checkbox and the Radio components both use the trick of using a <label> to render the visual control,
 * and visually hiding the <input>. This means that, when you add a FormControl.Label alongside your
 * Checkbox/Radio, the <input> technically has two <label> elements associated with it.
 * That doesn't appear to be a problem (it's valid HTML and NVDA announces it correctly) but it does annoy
 * our Storybook Axe tests because they only seem to look at one of the labels.
 * To fix this, we recommend that the FormControl.Label always appears before the Checkbox/Radio in the DOM,
 * even though it visually appears after the Checkbox/Radio, as this keeps Storybook Axe happy.
 */

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
}: PropsWithChildren<FormControlProps>) => {
  const uniqueId = useId(id)
  const childrenArr = React.Children.toArray(children)

  const isInlineControl = childrenArr.some(
    child => React.isValidElement(child) && (child.type === Checkbox || child.type === Radio),
  )

  const containsHint = childrenArr.some(child => React.isValidElement(child) && child.type === FormControlHint)
  const containsValidation = childrenArr.some(
    child => React.isValidElement(child) && child.type === FormControlValidation,
  )

  return (
    <section
      id={`FormControl--${uniqueId}`}
      className={clsx(
        styles.FormControl,
        fullWidth && styles[`FormControl--fullWidth`],
        isInlineControl && styles['FormControl--checkbox'],
        hasBorder && styles['FormControl--border'],
        className,
      )}
      {...rest}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child

        const describedBy =
          [containsHint && `${uniqueId}-hint`, containsValidation && `${uniqueId}-validation`]
            .filter(Boolean)
            .join(' ') || undefined

        if (child.type === TextInput) {
          const element = child as React.ReactElement<React.ComponentProps<typeof TextInput>>
          return React.cloneElement(element, {
            className: clsx(element.props.className),
            id: uniqueId,
            name: element.props.name || uniqueId,
            required: element.props.required || required,
            validationStatus: element.props.validationStatus || validationStatus,
            fullWidth,
            size,
            'aria-describedby': describedBy,
          })
        }

        if (child.type === Textarea) {
          const element = child as React.ReactElement<React.ComponentProps<typeof Textarea>>
          return React.cloneElement(element, {
            className: clsx(element.props.className),
            id: uniqueId,
            name: element.props.name || uniqueId,
            required: element.props.required || required,
            validationStatus: element.props.validationStatus || validationStatus,
            fullWidth,
            size,
            'aria-describedby': describedBy,
          })
        }

        if (child.type === Select) {
          const element = child as React.ReactElement<React.ComponentProps<typeof Select>>
          return React.cloneElement(element, {
            className: clsx(element.props.className),
            id: uniqueId,
            name: element.props.name || uniqueId,
            required: element.props.required || required,
            validationStatus: element.props.validationStatus || validationStatus,
            fullWidth,
            size,
            'aria-describedby': describedBy,
          })
        }

        if (child.type === Checkbox) {
          const element = child as React.ReactElement<React.ComponentProps<typeof Checkbox>>
          return React.cloneElement(element, {
            className: clsx(element.props.className, styles['FormControl-control--checkbox']),
            id: uniqueId,
            name: element.props.name || uniqueId,
            required: element.props.required || required,
            validationStatus: element.props.validationStatus || validationStatus,
            'aria-describedby': describedBy,
          })
        }

        if (child.type === Radio) {
          const element = child as React.ReactElement<React.ComponentProps<typeof Radio>>
          return React.cloneElement(element, {
            className: clsx(isInlineControl && styles['FormControl-control--radio'], element.props.className),
            id: uniqueId,
            name: element.props.name,
            required: element.props.required || required,
            'aria-describedby': describedBy,
          })
        }

        if (child.type === FormControlLabel) {
          const element = child as React.ReactElement<React.ComponentProps<typeof FormControlLabel>>
          return React.cloneElement(element, {
            className: clsx(isInlineControl && styles['FormControl-label--checkbox'], element.props.className),
            htmlFor: uniqueId,
            children: element.props.children,
            required,
            validationStatus,
            size,
            showRequiredIndicator: isInlineControl ? false : element.props.showRequiredIndicator,
          })
        }

        if (child.type === FormControlValidation) {
          const element = child as React.ReactElement<React.ComponentProps<typeof FormControlValidation>>
          return React.cloneElement(element, {
            className: clsx(isInlineControl && styles['FormControl-validation-checkbox'], element.props.className),
            validationStatus,
            id: `${uniqueId}-validation`,
          })
        }

        if (child.type === FormControlHint) {
          const element = child as React.ReactElement<React.ComponentProps<typeof FormControlHint>>
          return React.cloneElement(element, {
            id: `${uniqueId}-hint`,
          })
        }

        return child
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
    <label
      htmlFor={htmlFor}
      className={clsx(
        styles['FormControl-label'],
        validationStatus && styles[`FormControl-label--${validationStatus}`],
        styles[`FormControl-label--${size}`],
        visuallyHidden && styles['FormControl-label--visually-hidden'],
        className,
      )}
      {...rest}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement<FormControlHintProps>(child) && child.type === FormControlHint) {
          return React.cloneElement(child, {
            className: clsx(styles['FormControl--visible'], child.props.className),
          })
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

const FormControlValidation = ({children, validationStatus, className, ...props}: FormControlValidationProps) => {
  return (
    <Text
      as="span"
      size="100"
      weight="medium"
      className={clsx(
        styles['FormControl-validation'],
        validationStatus && styles['FormControl-validation--animate-in'],
        validationStatus && styles[`FormControl-validation--${validationStatus}`],
        className,
      )}
      {...props}
    >
      {validationStatus === 'error' && (
        <span className={styles['FormControl-validation-error-icon']}>
          <AlertFillIcon />
        </span>
      )}
      {validationStatus === 'success' && (
        <span className={styles['FormControl-validation-success-icon']}>
          <CheckCircleFillIcon />
        </span>
      )}
      {children}
    </Text>
  )
}

type FormControlHintProps = PropsWithChildren<BaseProps<HTMLSpanElement>>

const FormControlHint = ({className, ...rest}: FormControlHintProps) => {
  return (
    <Text
      as="span"
      size="100"
      weight="medium"
      variant="muted"
      className={clsx(styles['FormControl-hint'], className)}
      {...rest}
    />
  )
}

/**
 * FormControl
 * {@link https://primer.style/brand/components/FormControl/ See usage examples}.
 */
export const FormControl = Object.assign(Root, {
  Label: FormControlLabel,
  Validation: FormControlValidation,
  Hint: FormControlHint,
})
