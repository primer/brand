import React from 'react'
import {PricingOptions} from './PricingOptions'
import figma from '@figma/code-connect'

figma.connect(
  PricingOptions.Item,
  'https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=12709-17402&t=hNiuAeHKuuLZeXnj-11',
  {
    props: {
      featureList: figma.children('Feature list'),
      footnotes: figma.textContent('Footnotes'),
      heading: figma.textContent('Heading'),
      primaryAction: figma.nestedProps('Primary Action', {text: figma.textContent('Text')}),
      secondaryAction: figma.nestedProps('Secondary Action', {text: figma.textContent('Text')}),
      trailingText: figma.textContent('TrailingText'),
      value: figma.textContent('Value'),
    },
    example: ({heading, value, footnotes, primaryAction, featureList, trailingText}) => (
      <PricingOptions.Item>
        <PricingOptions.Heading>{heading}</PricingOptions.Heading>
        <PricingOptions.Price trailingText={trailingText}>{value}</PricingOptions.Price>
        <PricingOptions.Footnote>{footnotes}</PricingOptions.Footnote>
        <PricingOptions.PrimaryAction href="#" as="a">
          {primaryAction.text}
        </PricingOptions.PrimaryAction>
        {featureList}
      </PricingOptions.Item>
    ),
  },
)

figma.connect(
  PricingOptions.FeatureList,
  'https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=12642-10494&t=WdxoBaPDOhrkV5oD-11',
  {
    props: {
      children: figma.children('Item*'),
    },
    // @ts-expect-error - PricingOptions.FeatureList expects an array but figma.children returns a single JSX.Element
    example: ({children}) => <PricingOptions.FeatureList>{children}</PricingOptions.FeatureList>,
  },
)

figma.connect(
  PricingOptions.FeatureListItem,
  'https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=12636-9140&t=WdxoBaPDOhrkV5oD-11',
  {
    props: {
      item: figma.nestedProps('_UnorderedList/Item', {
        text: figma.textContent('List item'),
      }),
    },
    example: ({item}) => <PricingOptions.FeatureListItem>{item.text}</PricingOptions.FeatureListItem>,
  },
)

figma.connect(
  PricingOptions,
  'https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=12643-10718&t=hNiuAeHKuuLZeXnj-11',
  {
    props: {
      children: figma.children('Item*'),
    },
    example: ({children}) => <PricingOptions>{children}</PricingOptions>,
  },
)
