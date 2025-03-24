'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const ButtonVariantsProp = () => (
  <PropTableValues values={['primary', 'secondary', 'subtle']} commaSeparated />
)

export const ButtonSizesProp = () => (
  <PropTableValues values={['small', 'medium', 'large']} commaSeparated />
)