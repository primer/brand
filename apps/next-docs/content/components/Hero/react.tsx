'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {TextVariants, defaultTextVariant} from '@primer/react-brand'

export const HeroDescriptionVariantProp = () => <PropTableValues values={[...TextVariants]} addLineBreaks />
export const HeroDescriptionVariantPropDefault = () => <PropTableValues values={[defaultTextVariant]} />
export const HeroImagePositionProp = () => <PropTableValues values={['inline-end', 'block-end']} addLineBreaks />
export const HeroVariantProp = () => <PropTableValues values={['default', 'bordered-grid']} addLineBreaks />
