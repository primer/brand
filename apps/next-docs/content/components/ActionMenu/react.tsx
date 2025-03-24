'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const ActionMenuSizesProp = () => (
  <PropTableValues values={['small', 'medium']} commaSeparated />
)

export const ActionMenuSelectionVariantProp = () => (
  <PropTableValues values={['single', 'none']} commaSeparated />
)

export const ActionMenuAlignmentProp = () => (
  <PropTableValues values={['start', 'end']} commaSeparated />
)

export const ActionMenuOverlaySidesProp = () => (
  <PropTableValues values={['bottom', 'bottom-end', 'bottom-start', 'left', 'left-end', 'left-start', 'right', 'right-end', 'right-start', 'top', 'top-end', 'top-start']} commaSeparated />
)