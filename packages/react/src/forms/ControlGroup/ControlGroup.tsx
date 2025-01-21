import React, {Children, createContext, forwardRef, isValidElement, useContext, type HTMLAttributes} from 'react'
import clsx from 'clsx'
import {AlertFillIcon, CheckCircleFillIcon} from '@primer/octicons-react'
import {useId} from '../../hooks/useId'

import type {FormValidationStatus} from '..'
import {Text} from '../..'
import styles from './ControlGroup.module.css'

type ControlGroupContext = {
  id?: string
}

const ControlGroupContext = createContext<ControlGroupContext | null>(null)

const useControlGroup = () => {
  const context = useContext(ControlGroupContext)

  if (!context) {
    throw new Error(
      'useControlGroup must be used within an ControlGroupProvider. Did you forget to wrap your component in a <ControlGroupProvider>?',
    )
  }

  return context
}

export type ControlGroupProps = HTMLAttributes<HTMLFieldSetElement>
const _ControlGroup = forwardRef<HTMLFieldSetElement, ControlGroupProps>(({className, id, ...props}, ref) => {
  const uniqueId = useId(id)

  const containsCaption = Children.toArray(props.children).some(
    child => isValidElement(child) && child.type === ControlGroupCaption,
  )
  const containsValidation = Children.toArray(props.children).some(
    child => isValidElement(child) && child.type === ControlGroupValidation,
  )

  const describedBy =
    [containsCaption && `${uniqueId}-caption`, containsValidation && `${uniqueId}-validation`]
      .filter(Boolean)
      .join(' ') || undefined

  return (
    <ControlGroupContext.Provider value={{id: uniqueId}}>
      <fieldset
        ref={ref}
        className={clsx(styles.ControlGroup__container, className)}
        aria-describedby={describedBy}
        {...props}
      />
    </ControlGroupContext.Provider>
  )
})

export type ControlGroupLabelProps = {visuallyHidden?: boolean} & HTMLAttributes<HTMLLegendElement>
const ControlGroupLabel = forwardRef<HTMLLegendElement, ControlGroupLabelProps>(
  ({children, className, visuallyHidden, ...props}, ref) => {
    return (
      <legend
        ref={ref}
        className={clsx(styles.ControlGroup__label, visuallyHidden && 'visually-hidden', className)}
        {...props}
      >
        <Text as="span" weight="semibold" size="100">
          {children}
        </Text>
      </legend>
    )
  },
)

export type ControlGroupCaptionProps = HTMLAttributes<HTMLSpanElement>
const ControlGroupCaption = forwardRef<HTMLSpanElement, ControlGroupCaptionProps>(({className, ...props}, ref) => {
  const {id} = useControlGroup()

  return <Text as="span" size="100" variant="muted" ref={ref} id={`${id}-caption`} className={className} {...props} />
})

export type ControlGroupValidationProps = {variant: FormValidationStatus} & HTMLAttributes<HTMLSpanElement>
const ControlGroupValidation = forwardRef<HTMLSpanElement, ControlGroupValidationProps>(
  ({className, variant, children, ...props}, ref) => {
    const {id} = useControlGroup()

    return (
      <Text
        as="span"
        size="100"
        ref={ref}
        id={`${id}-validation`}
        className={clsx(
          styles.ControlGroup__validation,
          styles['ControlGroup__validation--animate-in'],
          variant === 'success' && styles['ControlGroup__validation--success'],
          variant === 'error' && styles['ControlGroup__validation--error'],
          className,
        )}
        {...props}
      >
        {variant === 'success' && (
          <span className={styles['ControlGroup__validation-icon--success']}>
            <CheckCircleFillIcon />
          </span>
        )}
        {variant === 'error' && (
          <span className={styles['ControlGroup__validation-icon--error']}>
            <AlertFillIcon />
          </span>
        )}
        {children}
      </Text>
    )
  },
)

export const ControlGroup = Object.assign(_ControlGroup, {
  Label: ControlGroupLabel,
  Caption: ControlGroupCaption,
  Validation: ControlGroupValidation,
})
