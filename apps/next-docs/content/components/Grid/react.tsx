'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import CustomVideoPlayer from '../../../../docs/src/components/custom-video-player'

export const GridColumnAsProp = () => <PropTableValues values={['div', 'section', 'span']} addLineBreaks />
export const GridColumnSpanProp = () => (
  <PropTableValues values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, `ResponsiveMap`]} addLineBreaks />
)
export const GridColumnStartProp = () => (
  <PropTableValues values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, `ResponsiveMap`]} addLineBreaks />
)

export const GridColumnSpanVideo = () => (
  <CustomVideoPlayer
    width="100%"
    src="https://github.com/primer/brand/assets/912236/a99beba9-b22f-4e2b-a5fa-66c2db246965"
  />
)

export const GridFulllWidthVideo = () => (
  <CustomVideoPlayer
    width="100%"
    src="https://github.com/primer/brand/assets/912236/cd0d4335-03b2-48f2-98f0-2c53ef61544b"
  />
)
