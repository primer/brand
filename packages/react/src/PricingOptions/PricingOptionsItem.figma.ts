// url=https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=12709-17402&t=hNiuAeHKuuLZeXnj-11
// component=PricingOptions.Item

import figma from 'figma'

const featureList = figma.properties.children(['Feature list'])
const footnotes = figma.selectedInstance.findText('Footnotes').__render__()
const heading = figma.selectedInstance.findText('Heading').__render__()
const primaryAction = (function () {
  const nestedLayer0 = figma.selectedInstance.findInstance('Primary Action')
  return {
    text: nestedLayer0.type !== 'ERROR' ? nestedLayer0.findText('Text').__render__() : undefined,
  }
})()
const trailingText = figma.selectedInstance.findText('TrailingText').__render__()
const value = figma.selectedInstance.findText('Value').__render__()

export default {
  id: 'PricingOptions.Item',
  imports: ["import { PricingOptions } from '@primer/react-brand'"],
  example: figma.code`<PricingOptions.Item>
        <PricingOptions.Heading>${figma.helpers.react.renderChildren(heading)}</PricingOptions.Heading>
        <PricingOptions.Price${figma.helpers.react.renderProp(
          'trailingText',
          trailingText,
        )}>${figma.helpers.react.renderChildren(value)}</PricingOptions.Price>
        <PricingOptions.Footnote>${figma.helpers.react.renderChildren(footnotes)}</PricingOptions.Footnote>
        <PricingOptions.PrimaryAction href="#" as="a">
          ${figma.helpers.react.renderChildren(primaryAction.text)}
        </PricingOptions.PrimaryAction>
        ${figma.helpers.react.renderChildren(featureList)}
      </PricingOptions.Item>`,
  metadata: {nestable: true},
}
