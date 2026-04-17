'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const CardVariantsProp = () => <PropTableValues values={['default', 'minimal']} commaSeparated />

export const CardCTAVariantsProp = () => <PropTableValues values={['text', 'arrow', 'none']} commaSeparated />

export const CardLabelVariantsProp = () => <PropTableValues values={['default', 'muted', 'accent']} commaSeparated />

export const CardTokensPositionsProp = () => <PropTableValues values={['block-start', 'block-end']} commaSeparated />

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

export const CardHeadingAsProp = () => <PropTableValues values={['h2', 'h3', 'h4', 'h5', 'h6']} commaSeparated />
