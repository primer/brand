'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const RadioSizeProp = () => <PropTableValues values={['medium', 'large']} addLineBreaks />
export const RadioValidationStatusProp = () => <PropTableValues values={['error', 'success']} addLineBreaks />

export const RadioResizePro = () => (
  <PropTableValues values={['both', 'horizontal', 'vertical', 'none']} addLineBreaks />
)
