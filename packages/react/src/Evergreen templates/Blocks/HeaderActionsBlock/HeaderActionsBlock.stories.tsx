import React from 'react'
import {Meta} from '@storybook/react'

import {HeaderActionsBlock} from './'

export default {
  title: 'Evergreen templates/Blocks/Header actions',
  component: HeaderActionsBlock,
} as Meta<typeof HeaderActionsBlock>

export const Default = () => (
  <HeaderActionsBlock
    items={{
      item1: {
        heading: 'Copilot',
        description:
          'Bring the power of generative AI to engineering teams with GitHub Copilot. Learn how you can maximize developer velocity and innovation. ',
        cta: {
          label: 'Learn more',
          href: '#',
        },
      },
      item2: {
        heading: 'Security',
        description:
          'Stay one step ahead by shipping your software securely within GitHub: Identify and fix security issues directly in the developer flow.',
        cta: {
          label: 'Learn more',
          href: '#',
        },
      },
      item3: {
        heading: 'Why GitHub',
        description:
          'Learn why more than 90% of the Fortune 100 use GitHub—the leading developer platform compared to alternative solutions.',
        cta: {
          label: 'Learn more',
          href: '#',
        },
      },
    }}
  />
)
