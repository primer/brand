'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

import {StatisticSizes, StatisticSpacingValues} from '../../../../../packages/react/src/Statistic/Statistic'

export const StatisticSizeProp = () => <PropTableValues values={[...StatisticSizes]} addLineBreaks />
export const StatisticPaddingProp = () => <PropTableValues values={[...StatisticSpacingValues]} commaSeparated />

export const StatisticDescriptionVariantProp = () => (
  <PropTableValues values={['default', 'muted', 'accent']} addLineBreaks />
)
