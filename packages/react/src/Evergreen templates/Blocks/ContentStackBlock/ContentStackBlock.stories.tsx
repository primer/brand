import React from 'react'
import {Meta} from '@storybook/react'
import {PeopleIcon, ImageIcon, TerminalIcon} from '@primer/octicons-react'

import {ContentStackBlock} from './'

export default {
  title: 'Evergreen templates/Blocks/Content stack',
  component: ContentStackBlock,
} as Meta<typeof ContentStackBlock>

export const Default = () => (
  <ContentStackBlock
    items={[
      {
        heading: 'Expanded image diff support',
        description:
          'Easily compare changed images. See the before and after, swipe or fade between the two, or look at just the changed parts.',
        icon: ImageIcon,
      },
      {
        heading: 'Extensive editor & shell integrations',
        description:
          'Open your favorite editor or shell from the app, or jump back to GitHub Desktop from your shell. GitHub Desktop is your springboard for work.',
        icon: TerminalIcon,
      },

      {
        heading: 'Community supported',
        description:
          'GitHub Desktop is open source now! Check out our roadmap, contribute, and help us make collaboration even easier.',
        icon: PeopleIcon,
      },
    ]}
  />
)
