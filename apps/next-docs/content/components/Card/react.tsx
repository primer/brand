'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import CustomVideoPlayer from '../../../../docs/src/components/custom-video-player'

export const CardVariantsProp = () => <PropTableValues values={['default', 'minimal']} commaSeparated />

export const CardIconColorsProp = () => (
  <PropTableValues
    values={[
      'default',
      'subtle',
      'accent',
      'success',
      'attention',
      'severe',
      'danger',
      'open',
      'closed',
      'done',
      'sponsors',
      'blue',
      'green',
      'yellow',
      'orange',
      'red',
      'purple',
      'pink',
      'coral',
      'lime',
      'indigo',
      'teal',
    ]}
    commaSeparated
  />
)

export const CardLabelColorsProp = () => (
  <PropTableValues
    values={[
      'default',
      'accent',
      'success',
      'attention',
      'severe',
      'danger',
      'open',
      'closed',
      'done',
      'sponsors',
      'blue',
      'green',
      'yellow',
      'orange',
      'red',
      'purple',
      'pink',
      'coral',
      'lime',
      'indigo',
      'teal',
      'blue-purple',
    ]}
    commaSeparated
  />
)

export const CardHeadingAsProp = () => <PropTableValues values={['h2', 'h3', 'h4', 'h5', 'h6']} commaSeparated />

export const VerticalCardsVideo = () => (
  <CustomVideoPlayer
    width="100%"
    src="https://github.com/primer/brand/assets/6951037/a9ceec00-59c9-4471-a274-f516790f43c9"
  />
)
