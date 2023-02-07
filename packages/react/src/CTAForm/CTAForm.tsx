import React, {forwardRef, type Ref} from 'react'
import clsx from 'clsx'
import {FormControl, Button, TextInput, Checkbox} from '../'

import styles from './CTAForm.module.css'

type CTAFormProps = React.HTMLAttributes<HTMLFormElement>

const Root = ({...rest}: CTAFormProps) => {
  return <form {...rest} className={clsx(styles.CTAForm, rest.className)}></form>
}

// TODO: Create wrappers for each element where the FormControl will be a nested element.

const _Input = forwardRef(
  ({className, children, ...props}: React.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) => {
    return (
      <div {...props} ref={ref} className={clsx(styles['CTAForm-input'], className)}>
        {children}
      </div>
    )
  }
)

const _Confirm = forwardRef(
  ({className, children, ...props}: React.HTMLAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>) => {
    return (
      <div {...props} ref={ref} className={clsx(styles['CTAForm-confirm'], className)}>
        {children}
      </div>
    )
  }
)

const _Action = forwardRef(
  (
    {className, children, ...props}: Omit<React.ComponentProps<typeof Button>, 'variant' | 'type'>,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <Button
        type="submit"
        variant="secondary"
        className={clsx(styles['CTAForm-button'], className)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

export const CTAForm = Object.assign(Root, {Input: _Input, Confirm: _Confirm, Action: _Action})
