'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const TextAreaSizeProp = () => <PropTableValues values={['medium', 'large']} addLineBreaks />
export const TextAreaValidationStatusProp = () => <PropTableValues values={['error', 'success']} addLineBreaks />

export const TextAreaResizeProp = () => (
  <PropTableValues values={['both', 'horizontal', 'vertical', 'none']} addLineBreaks />
)
