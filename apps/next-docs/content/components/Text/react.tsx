'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import CustomVideoPlayer from '../../../..//docs/src/components/custom-video-player'

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

export const TextTesponsiveVideo = () => (
  <div>
    <CustomVideoPlayer
      width="100%"
      src="https://github.com/primer/brand/assets/912236/f14167c9-2acc-4e7b-9d3d-a722e8a61e7f"
    />
  </div>
)
