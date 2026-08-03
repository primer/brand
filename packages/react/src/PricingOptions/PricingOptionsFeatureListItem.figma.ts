// url=https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=12636-9140&t=WdxoBaPDOhrkV5oD-11
// component=PricingOptions.FeatureListItem

import figma from 'figma'

const item = (function () {
  const nestedLayer2 = figma.selectedInstance.findInstance('_UnorderedList/Item')
  return {
    text: nestedLayer2.type !== 'ERROR' ? nestedLayer2.findText('List item').__render__() : undefined,
  }
})()

export default {
  id: 'PricingOptions.FeatureListItem',
  imports: ["import { PricingOptions } from '@primer/react-brand'"],
  example: figma.code`<PricingOptions.FeatureListItem>${figma.helpers.react.renderChildren(
    item.text,
  )}</PricingOptions.FeatureListItem>`,
  metadata: {nestable: true},
}
