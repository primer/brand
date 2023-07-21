import React from 'react'
import {Meta} from '@storybook/react'

import {HeaderHeroBlock} from './'

export default {
  title: 'Evergreen templates/Blocks/Header hero banner',
  component: HeaderHeroBlock,
} as Meta<typeof HeaderHeroBlock>

export const Default = () => (
  <HeaderHeroBlock
    heading="Resources to help enterprise teams do their best work"
    description="Set your business up for success with solutions to any number of common questions."
    primaryCTA={{
      title: 'Learn about security',
      href: '#',
    }}
    secondaryCTA={{
      title: 'Learn about devops',
      href: '#',
    }}
  />
)
