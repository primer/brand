'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

import {SectionBackgroundColors, SectionPaddingVariants} from '../../../../../packages/react/src/Section/Section'

export const SectionPaddingBlockStartProp = () => (
  <PropTableValues values={[...SectionPaddingVariants, `ResponsiveMap`]} commaSeparated />
)

export const SectionPaddingBlockEndProp = () => (
  <PropTableValues values={[...SectionPaddingVariants, `ResponsiveMap`]} commaSeparated />
)

export const SectionBackgroundColorProp = () => (
  <PropTableValues values={[...SectionBackgroundColors, `string`, `ResponsiveMap`]} commaSeparated />
)
