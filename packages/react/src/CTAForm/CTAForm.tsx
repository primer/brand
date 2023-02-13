import React, {forwardRef, type Ref} from 'react'
import clsx from 'clsx'
import {Button} from '../'

import styles from './CTAForm.module.css'

const Root = forwardRef(
  ({className, ...rest}: React.FormHTMLAttributes<HTMLFormElement>, ref: Ref<HTMLFormElement>) => {
    return <form ref={ref} className={clsx(styles.CTAForm, className)} {...rest} />
  }
)

const _Input = forwardRef(
  ({className, children, ...rest}: React.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) => {
    return (
      <div {...rest} ref={ref} className={clsx(styles['CTAForm-input'], className)}>
        {children}
      </div>
    )
  }
)

const _Confirm = forwardRef(
  ({className, children, ...rest}: React.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) => {
    return (
      <div {...rest} ref={ref} className={clsx(styles['CTAForm-confirm'], className)}>
        {children}
      </div>
    )
  }
)

const _Action = forwardRef(
  (
    {className, children, ...rest}: Omit<React.ComponentProps<typeof Button>, 'variant' | 'type'>,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <Button
        type="submit"
        variant="secondary"
        className={clsx(styles['CTAForm-button'], className)}
        ref={ref}
        {...rest}
      >
        {children}
      </Button>
    )
  }
)

export const CTAForm = Object.assign(Root, {Input: _Input, Confirm: _Confirm, Action: _Action})
