'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const TextInputSizeProp = () => <PropTableValues values={['medium', 'large']} addLineBreaks />
export const TextInputValidationStatusProp = () => <PropTableValues values={['error', 'success']} addLineBreaks />

export const TextInputChildrenProp = () => (
  <PropTableValues values={['TextInput.Option', 'TextInput.OptGroup']} addLineBreaks />
)

export const TextInputTypeProp = () => (
  <PropTableValues
    values={['text', 'number', 'email', 'password', 'search', 'tel', 'url', 'date', 'time', 'datetime-local']}
    addLineBreaks
  />
)
