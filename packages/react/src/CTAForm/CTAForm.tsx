import React from 'react'
import clsx from 'clsx'
import {FormControl, Button, ButtonProps, TextInput, TextInputProps, Checkbox} from '../'

import styles from './CTAForm.module.css'

type CTAFormProps = {
  inputLabel: TextInputProps['leadingText']
  inputType?: TextInputProps['type']
  placeholder?: TextInputProps['placeholder']
  buttonLabel: ButtonProps<'button'>['children']
  checkboxLabel: React.ReactNode[] | React.ReactNode | string
} & React.HTMLAttributes<HTMLFormElement>

export const CTAForm = ({
  inputLabel,
  inputType = 'text',
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
      <Button type="submit" variant="secondary" className={styles['CTAForm-button']}>
        {buttonLabel}
      </Button>
    </form>
  )
}
