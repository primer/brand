// url=https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=12642-10494&t=WdxoBaPDOhrkV5oD-11
// component=PricingOptions.FeatureList

import figma from 'figma'

const children = figma.properties.children(['Item*'])

export default {
  id: 'PricingOptions.FeatureList',
  imports: ["import { PricingOptions } from '@primer/react-brand'"],
  example: figma.code`<PricingOptions.FeatureList>${figma.helpers.react.renderChildren(
    children,
  )}</PricingOptions.FeatureList>`,
  metadata: {nestable: true},
}
