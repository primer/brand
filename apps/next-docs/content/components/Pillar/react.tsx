'use client'

import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {namedIconSizes, numericIconSizes} from '../../../../../packages/react/src/Icon/Icon'

export const PillarAsProp = () => <PropTableValues values={['div', 'article']} addLineBreaks />
export const PillarIconSizeProp = () => (
  <PropTableValues values={[...namedIconSizes, ...numericIconSizes]} commaSeparated />
)
