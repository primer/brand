import React from 'react'
import {Meta} from '@storybook/react'

import {FeaturedMediaBlock} from './'

export default {
  title: 'Evergreen templates/Blocks/Featured media',
  component: FeaturedMediaBlock,
} as Meta<typeof FeaturedMediaBlock>

export const Default = () => (
  <FeaturedMediaBlock
    type="image"
    src="https://github.com/primer/brand/assets/175638/45465a63-2dcc-4f68-aaac-b1214d0ff6cb"
    alt="A screenshot of the GitHub desktop user interfice"
    dimensions={{
      width: 1421,
      height: 911,
    }}
  />
)
