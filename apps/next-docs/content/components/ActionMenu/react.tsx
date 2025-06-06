'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

import {ActionMenuButtonModes} from '../../../../../packages/react/src/ActionMenu/ActionMenu'

export const ActionMenuSizesProp = () => <PropTableValues values={['small', 'medium']} commaSeparated />
export const ActionMenuSelectionVariantProp = () => <PropTableValues values={['single', 'none']} commaSeparated />
export const ActionMenuMenuAlignmentProp = () => <PropTableValues values={['start', 'end']} commaSeparated />

export const ActionMenuMenuSideProp = () => (
  <PropTableValues
    values={[
      'bottom',
      'bottom-end',
      'bottom-start',
      'left',
      'left-end',
      'left-start',
      'right',
      'right-end',
      'right-start',
      'top',
      'top-end',
      'top-start',
    ]}
    commaSeparated
  />
)

export const ActionMenuModeProp = () => <PropTableValues values={[...ActionMenuButtonModes]} addLineBreaks />
