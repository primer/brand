'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

import {
  TextSizes,
  TextTags,
  TextVariants,
  TextWeights,
  defaultTextVariant,
  defaultTextTag,
  defaultTextSize,
} from '@primer/react-brand'

export const TextAsProp = () => <PropTableValues values={[...TextTags]} addLineBreaks />
export const TextSizeProp = () => <PropTableValues values={[...TextSizes]} addLineBreaks />
export const TextVariantProp = () => <PropTableValues values={[...TextVariants]} addLineBreaks />
export const TextWeightProp = () => <PropTableValues values={[...TextWeights, 'ResponsiveWeightMap']} addLineBreaks />
export const TextAsPropDefault = () => <PropTableValues values={[defaultTextTag]} />
export const TextSizePropDefault = () => <PropTableValues values={[defaultTextSize]} />
export const TextVariantPropDefault = () => <PropTableValues values={[defaultTextVariant]} />
