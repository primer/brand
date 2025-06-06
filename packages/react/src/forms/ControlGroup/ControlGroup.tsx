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

  // Reorganize children to move Caption and Validation inside the Label
  const reorganizedChildren = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      // If this is the Label, we need to inject Caption and Validation as its children
      if (child.type === ControlGroupLabel) {
        // Find Caption and Validation from all children
        const allChildren = React.Children.toArray(props.children)
        const captionChild = allChildren.find(
          (c) => React.isValidElement(c) && c.type === ControlGroupCaption
        )
        const validationChild = allChildren.find(
          (c) => React.isValidElement(c) && c.type === ControlGroupValidation
        )

        // Clone the Label element and add Caption/Validation as children
        return React.cloneElement(child as React.ReactElement<ControlGroupLabelProps>, {
          children: (
            <>
              {child.props.children}
              {captionChild}
              {validationChild}
            </>
          )
        })
      }
      // Skip Caption and Validation as they're now inside Label
      else if (child.type === ControlGroupCaption || child.type === ControlGroupValidation) {
        return null
      }
    }
    return child
  })

  return (
    <ControlGroupContext.Provider value={{id: uniqueId}}>
      <fieldset
        ref={ref}
        className={clsx(styles.ControlGroup__container, className)}
        {...props}
      >
        {reorganizedChildren}
      </fieldset>
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
  return <Text as="span" size="100" variant="muted" ref={ref} className={className} {...props} />
})

export type ControlGroupValidationProps = {variant: FormValidationStatus} & HTMLAttributes<HTMLSpanElement>
const ControlGroupValidation = forwardRef<HTMLSpanElement, ControlGroupValidationProps>(
  ({className, variant, children, ...props}, ref) => {
    return (
      <Text
        as="span"
        size="100"
        ref={ref}
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
