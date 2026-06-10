import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import placeholderImage from '../../fixtures/images/placeholder.png'

import {RiverBreakout} from '.'
import {Grid, Link, Text, Timeline} from '../../'

const meta = {
  title: 'Components/RiverBreakout',
  component: RiverBreakout,
  decorators: [
    Story => (
      <Grid>
        <Grid.Column>
          <Story />
        </Grid.Column>
      </Grid>
    ),
  ],
} satisfies Meta<typeof RiverBreakout>

export default meta

type Story = StoryObj<typeof RiverBreakout>

export const Default: Story = {
  render: () => (
    <RiverBreakout>
      <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
      <RiverBreakout.Visual>
        <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
      </RiverBreakout.Visual>
      <RiverBreakout.Content
        trailingComponent={() => (
          <Timeline>
            <Timeline.Item>
              <b>GitHub Codespaces</b> offers a complete dev environment in seconds.
            </Timeline.Item>
            <Timeline.Item>
              <b>GitHub Copilot</b> is your AI pair programmer that empowers you to complete tasks.
            </Timeline.Item>
          </Timeline>
        )}
      >
        <Text>
          Accelerate your workflows and scale your business fast with access to millions of open source projects on
          GitHub, the largest source code host.
        </Text>
        <Link href="#">Call to action</Link>
      </RiverBreakout.Content>
    </RiverBreakout>
  ),
}
