'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const CTABannerAlignProp = () => <PropTableValues values={['start', 'center']} commaSeparated />

export const CTABannerBackgroundColorProp = () => (
  <PropTableValues values={['default', 'subtle', 'string', 'ResponsiveMap']} commaSeparated />
)

export const CTABannerBackgroundImageProp = () => (
  <PropTableValues values={['string', 'ResponsiveMap']} commaSeparated />
)

export const CTABannerHeadingAsProp = () => (
  <PropTableValues values={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']} commaSeparated />
)

export const CTABannerHeadingSizeProp = () => <PropTableValues values={['1', '2', '3', '4', '5', '6']} commaSeparated />

export const CTABannerTextVariantsProp = () => (
  <PropTableValues values={['default', 'muted', 'subtle']} commaSeparated />
)

export const CTABannerVariantProp = () => <PropTableValues values={['default', 'balanced', 'minimal']} commaSeparated />
