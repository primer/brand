'use client'
import CustomVideoPlayer from '../../../../docs/src/components/custom-video-player'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

import {
  HeadingTags,
  HeadingSizes,
  HeadingWeights,
  HeadingStretch,
  defaultHeadingTag,
  HeadingLetterSpacing,
} from '@primer/react-brand'

export const ResponsiveHeadingVideo = () => (
  <div>
    <CustomVideoPlayer
      width="100%"
      src="https://github.com/primer/brand/assets/912236/d0e7ef2b-d52f-413e-8580-579a9129696c"
    />
  </div>
)

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
