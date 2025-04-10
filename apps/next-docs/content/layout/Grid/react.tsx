'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const GridColumnAsProp = () => <PropTableValues values={['div', 'section', 'span']} addLineBreaks />
export const GridColumnSpanProp = () => (
  <PropTableValues values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, `ResponsiveMap`]} addLineBreaks />
)
export const GridColumnStartProp = () => (
  <PropTableValues values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, `ResponsiveMap`]} addLineBreaks />
)

