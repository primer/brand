import React, {createContext, forwardRef, type HTMLAttributes} from 'react'
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

export type ControlGroupProps = HTMLAttributes<HTMLFieldSetElement>
const _ControlGroup = forwardRef<HTMLFieldSetElement, ControlGroupProps>(({className, id, ...props}, ref) => {
  const uniqueId = useId(id)

  const reorganizedChildren = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      if (child.type === ControlGroupLabel) {
        const allChildren = React.Children.toArray(props.children)
        const captionChild = allChildren.find(c => React.isValidElement(c) && c.type === ControlGroupCaption)
        const validationChild = allChildren.find(c => React.isValidElement(c) && c.type === ControlGroupValidation)

        return React.cloneElement(child as React.ReactElement<ControlGroupLabelProps>, {
          children: (
            <>
              {child.props.children}
              {captionChild}
              {validationChild}
            </>
          ),
        })
      } else if (child.type === ControlGroupCaption || child.type === ControlGroupValidation) {
        return null
      }
    }
    return child
  })

  return (
    <ControlGroupContext.Provider value={{id: uniqueId}}>
      <fieldset ref={ref} className={clsx(styles.ControlGroup__container, className)} {...props}>
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
