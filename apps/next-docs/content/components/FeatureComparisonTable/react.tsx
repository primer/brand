'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {HeadingTags} from '../../../../../packages/react/src/'

export const FeatureComparisonTableActionAsProp = () => <PropTableValues values={['a', 'button']} addLineBreaks />

export const FeatureComparisonTableCellVariantProp = () => (
  <PropTableValues values={['included', 'unavailable']} addLineBreaks />
)

export const FeatureComparisonTableExpandedProp = () => (
  <PropTableValues values={['boolean', '{narrow: boolean, regular: boolean, wide: boolean}']} addLineBreaks />
)

export const FeatureComparisonTableHeadingAsProp = () => <PropTableValues values={[...HeadingTags]} addLineBreaks />
