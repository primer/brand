'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const BreakoutBannerAlignmentProps = () => <PropTableValues values={['start', 'center']} commaSeparated />

export const BreakoutBannerBackgroundColorProps = () => (
  <PropTableValues values={['default', 'subtle', 'string', 'ResponsiveMap']} commaSeparated />
)

export const BreakoutBannerBackgroundImageProps = () => (
  <PropTableValues values={['string', 'ResponsiveMap']} commaSeparated />
)

export const BreakoutBannerLinkDirectionProps = () => (
  <PropTableValues values={['horizontal', 'vertical', 'ResponsiveMap']} commaSeparated />
)

export const HeadingTagsProps = () => <PropTableValues values={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']} commaSeparated />

export const HeadingSizesProps = () => <PropTableValues values={['1', '2', '3', '4', '5', '6']} commaSeparated />
