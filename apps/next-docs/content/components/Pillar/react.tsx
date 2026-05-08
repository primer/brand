'use client'

import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {namedIconSizes, numericIconSizes} from '../../../../../packages/react/src/Icon/Icon'
import {PillarIconColors} from '../../../../../packages/react/src/Pillar/Pillar'

export const PillarAsProp = () => <PropTableValues values={['div', 'article']} addLineBreaks />
export const PillarIconColorProp = () => <PropTableValues values={[...PillarIconColors]} addLineBreaks />
export const PillarIconSizeProp = () => (
  <PropTableValues values={[...namedIconSizes, ...numericIconSizes]} commaSeparated />
)
