'use client'

import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {
  defaultRiverImageTextRatio,
  defaultRiverAlign,
  defaultRiverVariant,
  RiverVisualPositionOptions,
  RiverVisualPaddingOptions,
} from '../../../../../packages/react/src/river/River'

export const RiverAlignProp = () => defaultRiverAlign
export const RiverImageTextRatio = () => defaultRiverImageTextRatio
export const RiverVariantProp = () => defaultRiverVariant
export const RiverVisualPositionProp = () => <PropTableValues values={[...RiverVisualPositionOptions]} addLineBreaks />
export const RiverVisualPaddingProp = () => <PropTableValues values={[...RiverVisualPaddingOptions]} addLineBreaks />
