import React from 'react'
import {Hero, HeroProps} from './Hero'
import figma from '@figma/code-connect'

figma.connect(
  Hero,
  'https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=134-5526&t=hNiuAeHKuuLZeXnj-11',
  {
    props: {
      align: figma.enum('align', {
        start: 'start',
        center: 'center',
      }),
      description: figma.string('description'),
      descriptionOpeningTag: figma.boolean('description?', {
        true: '<Hero.Description>',
        false: undefined,
      }),
      descriptionClosingTag: figma.boolean('description?', {
        true: '</Hero.Description>',
        false: undefined,
      }),
      heading: figma.string('heading'),
      primaryAction: figma.nestedProps('PrimaryAction', {text: figma.string('text')}),
      primaryActionOpeningTag: figma.boolean('actions?', {
        true: '<Hero.PrimaryAction href="#">',
        false: undefined,
      }),
      primaryActionClosingTag: figma.boolean('actions?', {
        true: '</Hero.PrimaryAction>',
        false: undefined,
      }),
      secondaryAction: figma.nestedProps('SecondaryAction', {text: figma.string('text')}),
      secondaryActionOpeningTag: figma.nestedProps('ButtonGroup', {
        tag: figma.boolean('secondary?', {
          true: '<Hero.SecondaryAction href="#">',
          false: undefined,
        }),
      }),
      secondaryActionClosingTag: figma.nestedProps('ButtonGroup', {
        tag: figma.boolean('secondary?', {
          true: '</Hero.SecondaryAction>',
          false: undefined,
        }),
      }),
    },
    example: ({
      align,
      description,
      descriptionOpeningTag,
      descriptionClosingTag,
      heading,
      primaryAction,
      primaryActionClosingTag,
      primaryActionOpeningTag,
      secondaryAction,
      secondaryActionClosingTag,
      secondaryActionOpeningTag,
    }) => (
      <Hero align={align as HeroProps['align']}>
        <Hero.Heading>{heading}</Hero.Heading>
        {descriptionOpeningTag}
        {description}
        {descriptionClosingTag}
        {primaryActionOpeningTag}
        {primaryAction.text}
        {primaryActionClosingTag}
        {secondaryActionOpeningTag.tag}
        {secondaryAction.text}
        {secondaryActionClosingTag.tag}
      </Hero>
    ),
  },
)
