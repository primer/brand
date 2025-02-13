import React from 'react'
import {Heading, Link, River, Text} from '../'
import figma from '@figma/code-connect'

figma.connect(River, 'https://www.figma.com/design/BJ95AjraesmRCWsKA013GS/Primer-Brand?node-id=375-8463', {
  props: {
    align: figma.enum('align', {
      start: 'start',
      center: 'center',
      end: 'end',
    }),
    imageTextRatio: figma.enum('imageTextRatio', {
      '50:50': '50:50',
      '60:40': '60:40',
    }),
    content: figma.nestedProps('Content', {
      headingText: figma.textContent('Heading'),
      descriptionText: figma.textContent('Description'),
      link: figma.boolean('link?', {
        true: <Link href="#">Link text</Link>,
        false: undefined,
      }),
    }),
  },

  example: ({align, imageTextRatio, content}) => (
    <River align={align} imageTextRatio={imageTextRatio}>
      <River.Content>
        <>
          <Heading>{content.headingText}</Heading>
          <Text>{content.descriptionText}</Text>
          {content.link}
        </>
      </River.Content>
      <River.Visual rounded>
        <img
          src="https://raw.githubusercontent.com/primer/brand/refs/heads/main/apps/docs/static/assets/placeholder.png"
          alt="alt description"
        />
      </River.Visual>
    </River>
  ),
})
