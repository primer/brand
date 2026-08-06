import figma from 'figma'

const instance = figma.selectedInstance
const imports = ["import { PricingOptions } from '@primer/react-brand'"]

const createTemplate = (example: ReturnType<typeof figma.code>, nestable = false) => ({
  id: figma.batch.id,
  imports,
  example,
  ...(nestable ? {metadata: {nestable: true}} : {}),
})

const renderNestedText = (layerName: string, textName = 'Text') => {
  const layer = instance.findInstance(layerName)
  return layer.type === 'ERROR' ? layer.__render__() : layer.findText(textName).__render__()
}

const renderRoot = () => {
  const items = instance
    .findConnectedInstances(node => node.hasCodeConnect() && node.name.startsWith('Item'))
    .map(item => item.executeTemplate().example)

  return createTemplate(figma.code`<PricingOptions>${items}</PricingOptions>`)
}

const renderItem = () => {
  const label = instance.getBoolean('label?')
    ? figma.code`<PricingOptions.Label>${renderNestedText('Label')}</PricingOptions.Label>`
    : undefined
  const description = figma.code`<PricingOptions.Description>
    ${instance.findText('Description').__render__()}
  </PricingOptions.Description>`
  const trailingText = instance.getBoolean('trailingText?') ? instance.findText('TrailingText').__render__() : undefined
  const price = figma.code`<PricingOptions.Price${figma.helpers.react.renderProp('trailingText', trailingText)}>
    ${instance.findText('Value').__render__()}
  </PricingOptions.Price>`
  const primaryAction = instance.getBoolean('primaryAction?')
    ? figma.code`<PricingOptions.PrimaryAction href="#" as="a">
        ${renderNestedText('Primary Action')}
      </PricingOptions.PrimaryAction>`
    : undefined
  const secondaryAction = instance.getBoolean('secondaryAction?')
    ? figma.code`<PricingOptions.SecondaryAction href="#" as="a">
        ${renderNestedText('Secondary Action')}
      </PricingOptions.SecondaryAction>`
    : undefined
  const featureListInstance = instance.findInstance('Feature list')
  const featureList = instance.getBoolean('featureList?') ? featureListInstance.executeTemplate().example : undefined
  const footnote = instance.getBoolean('footNotes?')
    ? figma.code`<PricingOptions.Footnote>${instance.findText('Footnotes').__render__()}</PricingOptions.Footnote>`
    : undefined

  return createTemplate(
    figma.code`<PricingOptions.Item>
      ${label}
      <PricingOptions.Heading>${instance.findText('Heading').__render__()}</PricingOptions.Heading>
      ${description}
      ${price}
      ${primaryAction}
      ${secondaryAction}
      ${featureList}
      ${footnote}
    </PricingOptions.Item>`,
    true,
  )
}

const renderFeatureList = () => {
  const items = instance
    .findConnectedInstances(node => node.hasCodeConnect() && node.name.startsWith('Item'))
    .map(item => item.executeTemplate().example)
  const expanded = instance.getBoolean('expanded?')

  return createTemplate(
    figma.code`<PricingOptions.FeatureList expanded={${expanded}}>
      ${items}
    </PricingOptions.FeatureList>`,
    true,
  )
}

const renderFeatureListItem = () => {
  const item = instance.findInstance('_UnorderedList/Item')
  const text = item.type === 'ERROR' ? item.__render__() : item.findText('List item').__render__()
  const variant = instance.getEnum('variant', {
    included: undefined,
    notIncluded: 'excluded',
  })

  return createTemplate(
    figma.code`<PricingOptions.FeatureListItem${figma.helpers.react.renderProp('variant', variant)}>
      ${text}
    </PricingOptions.FeatureListItem>`,
    true,
  )
}

const template = (() => {
  switch (figma.batch.type) {
    case 'root':
      return renderRoot()
    case 'item':
      return renderItem()
    case 'feature-list':
      return renderFeatureList()
    case 'feature-list-item':
      return renderFeatureListItem()
    default:
      throw new Error(`Unknown PricingOptions Code Connect template type: ${figma.batch.type}`)
  }
})()

export default template
