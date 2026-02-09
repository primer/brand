'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const LogoSuiteAlignProp = () => <PropTableValues values={['start', 'center', 'justify']} addLineBreaks />
export const LogoSuiteVariantProp = () => <PropTableValues values={['default', 'gridline-expressive']} addLineBreaks />
export const LogoSuiteLogobarGapProp = () => <PropTableValues values={['default', 'condensed']} addLineBreaks />
export const LogoSuiteLogobarVariantProp = () => <PropTableValues values={['muted', 'emphasis']} addLineBreaks />

export const LogoSuiteLogobarChildrenProp = () => (
  <PropTableValues values={[`SVGElement`, `SVGElement[]`, `HTMLImageElement`, `HTMLImageElement[]`]} addLineBreaks />
)

export const LogoSuiteLogobarMarqueeSpeedProp = () => <PropTableValues values={['slow', 'normal']} addLineBreaks />

export const LogoSuiteLogobarTakeoverButtonProp = () => (
  <PropTableValues values={[`{label: string, href: string}`]} addLineBreaks />
)
