import React from 'react'
import {Hero} from './Hero'
import figma from '@figma/code-connect'

figma.connect(
  Hero,
  'https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=134-5526&t=hNiuAeHKuuLZeXnj-11',
  {
    props: {
      heading: figma.string('heading'),
      descriptionText: figma.boolean('description?', {
        true: figma.string('description'),
        false: undefined,
      }),
      descriptionOpeningTag: figma.boolean('description?', {
        true: '<Hero.Description>',
        false: undefined,
      }),
      descriptionClosingTag: figma.boolean('description?', {
        true: '</Hero.Description>',
        false: undefined,
      }),
      align: figma.enum('align', {
        start: 'start',
        center: 'center',
      }),
      actions: figma.children('ButtonGroup'),
      primaryAction: figma.nestedProps('PrimaryAction', {text: figma.string('text')}),
      secondaryAction: figma.nestedProps('SecondaryAction', {text: figma.string('text')}),

      primaryActionOpeningTag: figma.boolean('actions?', {
        true: '<Hero.PrimaryAction href="#">',
        false: undefined,
      }),
      primaryActionClosingTag: figma.boolean('actions?', {
        true: '</Hero.PrimaryAction>',
        false: undefined,
      }),

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
      primaryAction,
      primaryActionOpeningTag,
      primaryActionClosingTag,
      secondaryAction,
      secondaryActionOpeningTag,
      secondaryActionClosingTag,
      align,
      heading,
      descriptionText,
      descriptionOpeningTag,
      descriptionClosingTag,
    }) => (
      <Hero align={align}>
        <Hero.Heading>{heading}</Hero.Heading>
        {descriptionOpeningTag}
        {descriptionText}
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
