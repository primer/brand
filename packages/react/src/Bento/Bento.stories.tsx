import React from 'react'
import {Meta} from '@storybook/react'
import {CopilotIcon} from '@primer/octicons-react'
import {Bento} from '.'
import {Link} from '../'
import {Icon} from '../Icon'

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
      <Bento.Content
        padding={{xsmall: 'normal', small: 'spacious'}}
        leadingVisual={<Icon icon={CopilotIcon} color="gray" />}
      >
        <Bento.Heading>
          Push what&apos;s possible with GitHub Copilot, the world&apos;s most trusted and widely adopted AI developer
          tool.
        </Bento.Heading>
        <Link href="#">Learn more about Copilot</Link>
      </Bento.Content>
    </Bento.Item>
  </Bento>
)
