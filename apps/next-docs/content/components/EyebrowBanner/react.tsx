'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {
  EyebrowBannerIconColors,
  EyebrowBannerLabelColors,
} from '../../../../../packages/react/src/EyebrowBanner/EyebrowBanner'

export const EyebrowBannerIconnProp = () => <PropTableValues values={[`ReactNode`, `IconProps`]} addLineBreaks />

export const EyebrowBannerIconColorProp = () => <PropTableValues values={[...EyebrowBannerIconColors]} addLineBreaks />

export const EyebrowBannerLabelColorProp = () => (
  <PropTableValues values={[...EyebrowBannerLabelColors]} addLineBreaks />
)
