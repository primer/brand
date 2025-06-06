'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {HeadingTags} from '../../../../../packages/react/src/'

export const PricingOptionsAsProp = () => <PropTableValues values={[`section`, `div`]} addLineBreaks />
export const PricingOptionsVariantProp = () => (
  <PropTableValues values={[`default`, `default-gradient`, `cards`, `cards-gradient`]} addLineBreaks />
)

export const PricingOptionsItemChildrenProp = () => (
  <PropTableValues
    values={[
      'PricingOptions.Heading',
      'PricingOptions.Label',
      'PricingOptions.Price',
      'PricingOptions.FeatureList',
      'PricingOptions.Footnote',
    ]}
    addLineBreaks
  />
)

export const PricingOptionsFeatureListChildrenProp = () => (
  <PropTableValues values={['PricingOptions.Heading', 'PricingOptions.Item']} addLineBreaks />
)

export const PricingOptionsFeatureListItemVariantProp = () => (
  <PropTableValues values={[`included`, `excluded`]} addLineBreaks />
)

export const PricingOptionsHeadingAsProp = () => <PropTableValues values={[...HeadingTags]} addLineBreaks />

export const PricingOptionsFeatureListAccordionAsProp = () => (
  <PropTableValues values={[...HeadingTags]} addLineBreaks />
)
