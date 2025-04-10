'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

import {
  HeadingTags,
  HeadingSizes,
  HeadingWeights,
  HeadingStretch,
  defaultHeadingTag,
  HeadingLetterSpacing,
} from '@primer/react-brand'

export const HeadingAsProp = () => <PropTableValues values={[...HeadingTags]} addLineBreaks />
export const HeadingAsPropDefault = () => <PropTableValues values={[defaultHeadingTag]} />
export const HeadingSizeProp = () => <PropTableValues values={[...HeadingSizes]} addLineBreaks />

export const HeadingWeightProp = () => (
  <PropTableValues values={[...HeadingWeights, 'ResponsiveWeightMap']} addLineBreaks />
)
export const HeadingStretchProp = () => (
  <PropTableValues values={[...HeadingStretch, 'ResponsiveStretchMap']} addLineBreaks />
)
export const HeadingLetterSpacingProp = () => (
  <PropTableValues values={[...HeadingLetterSpacing, 'ResponsiveLetterSpacingMap']} addLineBreaks />
)
