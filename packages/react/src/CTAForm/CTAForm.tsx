import React from 'react'
import {FormControl, Button, TextInput, Checkbox} from '../'

import styles from './CTAForm.module.css'

export const CTAForm = () => {
  return (
    <form className={styles.CTAForm}>
      <FormControl required size="large" className={styles['CTAForm-input']}>
        <FormControl.Label>Your work email address</FormControl.Label>
        <TextInput />
      </FormControl>
      <FormControl required fullWidth size="large" className={styles['CTAForm-legal']}>
        <FormControl.Label>
          I agree to the <a href="www.github.com">terms and conditions</a> and{' '}
          <a href="www.github.com">privacy policy</a>
        </FormControl.Label>
        <Checkbox />
      </FormControl>
      <Button type="submit" variant="primary" className={styles['CTAForm-button']}>
        Subscribe
      </Button>
    </form>
  )
}
