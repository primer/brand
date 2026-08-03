// url=https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=12643-10718&t=hNiuAeHKuuLZeXnj-11
// component=PricingOptions

import figma from 'figma'

const children = figma.properties.children(['Item*'])

export default {
  id: 'PricingOptions',
  imports: ["import { PricingOptions } from '@primer/react-brand'"],
  example: figma.code`<PricingOptions>${figma.helpers.react.renderChildren(children)}</PricingOptions>`,
  metadata: {nestable: true},
}
