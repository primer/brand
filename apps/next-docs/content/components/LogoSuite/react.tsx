'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const LogoSuiteAlignProp = () => <PropTableValues values={['start', 'center', 'justify']} addLineBreaks />
export const LogoSuiteLogobarGapProp = () => <PropTableValues values={['default', 'condensed']} addLineBreaks />
export const LogoSuiteLogobarVariantProp = () => <PropTableValues values={['muted', 'emphasis']} addLineBreaks />

export const LogoSuiteLogobarChildrenProp = () => (
  <PropTableValues values={[`SVGElement`, `SVGElement[]`, `HTMLImageElement`, `HTMLImageElement[]`]} addLineBreaks />
)

export const LogoSuiteLogobarMarqueeSpeedProp = () => <PropTableValues values={['slow', 'normal']} addLineBreaks />
