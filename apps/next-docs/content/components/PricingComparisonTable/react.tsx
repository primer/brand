'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {HeadingTags} from '../../../../../packages/react/src/'

export const PricingComparisonTableActionAsProp = () => <PropTableValues values={['a', 'button']} addLineBreaks />

export const PricingComparisonTableCellVariantProp = () => (
  <PropTableValues values={['included', 'unavailable']} addLineBreaks />
)

export const PricingComparisonTableExpandedProp = () => (
  <PropTableValues values={['boolean', '{narrow: boolean, regular: boolean, wide: boolean}']} addLineBreaks />
)

export const PricingComparisonTableHeadingAsProp = () => <PropTableValues values={[...HeadingTags]} addLineBreaks />
