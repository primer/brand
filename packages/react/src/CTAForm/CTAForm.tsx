import React from 'react'
import clsx from 'clsx'
import {FormControl, Button, TextInput, Checkbox} from '../'

import styles from './CTAForm.module.css'

type CTAFormProps = {
  inputLabel: string
  inputType?: 'email' | 'text'
  placeholder?: string
  buttonLabel: string
  checkboxLabel: React.ReactNode[] | React.ReactNode | string
} & React.HTMLAttributes<HTMLFormElement>

export const CTAForm = ({
  inputLabel,
  inputType = 'email',
  placeholder,
  buttonLabel,
  checkboxLabel,
  ...args
}: CTAFormProps) => {
  return (
    <form {...args} className={clsx(styles.CTAForm, args.className)}>
      <FormControl required size="large" className={styles['CTAForm-input']}>
        <FormControl.Label>{inputLabel}</FormControl.Label>
        <TextInput type={inputType} placeholder={placeholder} />
      </FormControl>
      <FormControl required fullWidth size="large" className={styles['CTAForm-legal']}>
        <FormControl.Label>{checkboxLabel}</FormControl.Label>
        <Checkbox />
      </FormControl>
      <Button type="submit" variant="primary" className={styles['CTAForm-button']}>
        {buttonLabel}
      </Button>
    </form>
  )
}
