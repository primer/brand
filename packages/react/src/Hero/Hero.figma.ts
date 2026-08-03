// url=https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=134-5526&t=hNiuAeHKuuLZeXnj-11
// component=Hero

import figma from 'figma'

const align = figma.selectedInstance.getEnum('align', {
  start: 'start',
  center: 'center',
})
const description = figma.selectedInstance.getString('description')
const descriptionOpeningTag = figma.selectedInstance.getBoolean('description?', {
  true: '<Hero.Description>',
  false: undefined,
})
const descriptionClosingTag = figma.selectedInstance.getBoolean('description?', {
  true: '</Hero.Description>',
  false: undefined,
})
const heading = figma.selectedInstance.getString('heading')
const primaryAction = (function () {
  const nestedLayer0 = figma.selectedInstance.findInstance('PrimaryAction')
  return {
    text: nestedLayer0.type !== 'ERROR' ? nestedLayer0.getString('text') : undefined,
  }
})()
const primaryActionOpeningTag = figma.selectedInstance.getBoolean('actions?', {
  true: figma.helpers.react.templateString('<Hero.ButtonGroup>\n<Button as="a" href="#">'),
  false: undefined,
})
const primaryActionClosingTag = figma.selectedInstance.getBoolean('actions?', {
  true: '</Button>',
  false: undefined,
})
const secondaryAction = (function () {
  const nestedLayer1 = figma.selectedInstance.findInstance('SecondaryAction')
  return {
    text: nestedLayer1.type !== 'ERROR' ? nestedLayer1.getString('text') : undefined,
  }
})()
const secondaryActionOpeningTag = (function () {
  const nestedLayer2 = figma.selectedInstance.findInstance('ButtonGroup')
  return {
    tag:
      nestedLayer2.type !== 'ERROR'
        ? nestedLayer2.getBoolean('secondary?', {
            true: '<Button as="a" href="#">',
            false: undefined,
          })
        : undefined,
  }
})()
const secondaryActionClosingTag = (function () {
  const nestedLayer3 = figma.selectedInstance.findInstance('ButtonGroup')
  return {
    tag:
      nestedLayer3.type !== 'ERROR'
        ? nestedLayer3.getBoolean('secondary?', {
            true: '</Button>',
            false: undefined,
          })
        : undefined,
  }
})()
const buttonGroupClosingTag = figma.selectedInstance.getBoolean('actions?', {
  true: '</Hero.ButtonGroup>',
  false: undefined,
})

export default {
  id: 'Hero',
  imports: ["import { Button, Hero } from '@primer/react-brand'"],
  example: figma.code`<Hero${figma.helpers.react.renderProp('align', align)}>
        <Hero.Heading>${figma.helpers.react.renderChildren(heading)}</Hero.Heading>
        ${figma.helpers.react.renderChildren(descriptionOpeningTag)}
        ${figma.helpers.react.renderChildren(description)}
        ${figma.helpers.react.renderChildren(descriptionClosingTag)}
        ${figma.helpers.react.renderChildren(primaryActionOpeningTag)}
        ${figma.helpers.react.renderChildren(primaryAction.text)}
        ${figma.helpers.react.renderChildren(primaryActionClosingTag)}
        ${figma.helpers.react.renderChildren(secondaryActionOpeningTag.tag)}
        ${figma.helpers.react.renderChildren(secondaryAction.text)}
        ${figma.helpers.react.renderChildren(secondaryActionClosingTag.tag)}
        ${figma.helpers.react.renderChildren(buttonGroupClosingTag)}
      </Hero>`,
  metadata: {nestable: true},
}
