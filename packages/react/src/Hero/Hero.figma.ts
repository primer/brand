// url=https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=134-5526&t=hNiuAeHKuuLZeXnj-11
// source=src/Hero/Hero.tsx
// component=Hero

import figma from 'figma'

const instance = figma.selectedInstance
const align = instance.getEnum('align', {
  start: 'start',
  center: 'center',
})
const heading = instance.getString('heading')
const description = instance.getBoolean('description?')
  ? figma.code`<Hero.Description>${instance.getString('description')}</Hero.Description>`
  : undefined

const renderNestedText = (layerName: string) => {
  const layer = instance.findInstance(layerName, {traverseInstances: true})
  return layer.type === 'ERROR' ? layer.__render__() : layer.findText('Text').__render__()
}

const buttonGroup = instance.findInstance('ButtonGroup')
const secondaryAction =
  buttonGroup.type !== 'ERROR' && buttonGroup.getBoolean('secondary?')
    ? figma.code`<Hero.SecondaryAction href="#">${renderNestedText('SecondaryAction')}</Hero.SecondaryAction>`
    : undefined
const actions = instance.getBoolean('actions?')
  ? figma.code`<Hero.PrimaryAction href="#">${renderNestedText('PrimaryAction')}</Hero.PrimaryAction>
      ${secondaryAction}`
  : undefined

export default {
  id: 'Hero',
  imports: ["import { Hero } from '@primer/react-brand'"],
  example: figma.code`<Hero${figma.helpers.react.renderProp('align', align)}>
        <Hero.Heading>${heading}</Hero.Heading>
        ${description}
        ${actions}
      </Hero>`,
}
