import React from 'react'
import {Meta} from '@storybook/react'
import {Bento} from '.'
import {Link} from '../Link'

import {CopilotIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Bento',
  component: Bento,
  args: {},
  argTypes: {
    className: {
      description: 'Custom class name for the second component',
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Bento>

export const Default = () => (
  <Bento>
    <Bento.Item rowSpan={{xsmall: 4, small: 5}} flow={{xsmall: 'row', small: 'row'}}>
      <Bento.Content padding={{xsmall: 'normal', small: 'spacious'}} leadingVisual={<CopilotIcon />}>
        <Bento.Heading>
          Push what&apos;s possible with GitHub Copilot, the world&apos;s most trusted and widely adopted AI developer
          tool.
        </Bento.Heading>
        <Link href="#" variant="default">
          Learn more about Copilot
        </Link>
      </Bento.Content>
    </Bento.Item>
  </Bento>
)
