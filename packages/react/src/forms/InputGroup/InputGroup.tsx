import clsx from 'clsx'
import React, {Children, createContext, forwardRef, isValidElement, useContext, type HTMLAttributes} from 'react'
import {AlertFillIcon, CheckCircleFillIcon} from '@primer/octicons-react'

import styles from './InputGroup.module.css'
import type {FormValidationStatus} from '..'
import {useId} from '@reach/auto-id'

type InputGroupContext = {
  id?: string
}

const InputGroupContext = createContext<InputGroupContext | null>(null)

const useInputGroup = () => {
  const context = useContext(InputGroupContext)

  if (!context) {
    throw new Error(
      'useInputGroup must be used within an InputGroupProvider. Did you forget to wrap your component in a <InputGroupProvider>?',
    )
  }

  return context
}

export type InputGroupProps = HTMLAttributes<HTMLFieldSetElement>
const _InputGroup = forwardRef<HTMLFieldSetElement, InputGroupProps>(({className, id, ...props}, ref) => {
  const uniqueId = useId(id)

  const containsCaption = Children.toArray(props.children).some(
    child => isValidElement(child) && child.type === InputGroupCaption,
  )
  const containsValidation = Children.toArray(props.children).some(
    child => isValidElement(child) && child.type === InputGroupValidation,
  )

  const describedBy =
    [containsCaption && `${uniqueId}-caption`, containsValidation && `${uniqueId}-validation`]
      .filter(Boolean)
      .join(' ') || undefined

  return (
    <InputGroupContext.Provider value={{id: uniqueId}}>
      <fieldset
        ref={ref}
        className={clsx(styles.InputGroup__container, className)}
        aria-describedby={describedBy}
        {...props}
      />
    </InputGroupContext.Provider>
  )
})

export type InputGroupLabelProps = {visuallyHidden?: boolean} & HTMLAttributes<HTMLLegendElement>
const InputGroupLabel = forwardRef<HTMLLegendElement, InputGroupLabelProps>(
  ({className, visuallyHidden, ...props}, ref) => {
    return (
      <legend
        ref={ref}
        className={clsx(styles.InputGroup__label, visuallyHidden && 'visually-hidden', className)}
        {...props}
      />
    )
  },
)

export type InputGroupCaptionProps = HTMLAttributes<HTMLSpanElement>
const InputGroupCaption = forwardRef<HTMLSpanElement, InputGroupCaptionProps>(({className, ...props}, ref) => {
  const {id} = useInputGroup()

  return <span ref={ref} id={`${id}-caption`} className={clsx(styles.InputGroup__caption, className)} {...props} />
})

export type InputGroupValidationProps = {variant: FormValidationStatus} & HTMLAttributes<HTMLSpanElement>
const InputGroupValidation = forwardRef<HTMLSpanElement, InputGroupValidationProps>(
  ({className, variant, children, ...props}, ref) => {
    const {id} = useInputGroup()

    return (
      <span
        ref={ref}
        id={`${id}-validation`}
        className={clsx(
          styles.InputGroup__validation,
          styles['InputGroup__validation--animate-in'],
          variant === 'success' && styles['InputGroup__validation--success'],
          variant === 'error' && styles['InputGroup__validation--error'],
          className,
        )}
        {...props}
      >
        {variant === 'success' && (
          <span className={styles['InputGroup__validation-icon--success']}>
            <CheckCircleFillIcon />
          </span>
        )}
        {variant === 'error' && (
          <span className={styles['InputGroup__validation-icon--error']}>
            <AlertFillIcon />
          </span>
        )}

        {children}
      </span>
    )
  },
)

export const InputGroup = Object.assign(_InputGroup, {
  Label: InputGroupLabel,
  Caption: InputGroupCaption,
  Validation: InputGroupValidation,
})
