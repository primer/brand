import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {RiverBreakout} from '.'
import {Grid, Link, Text, Timeline} from '../../'
import placeholderImage from '../../fixtures/images/placeholder.png'

export default {
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
} as Meta<typeof RiverBreakout>

const TrailingTimeline = () => (
  <Timeline>
    <Timeline.Item>
      <b>GitHub Codespaces</b> offers a complete dev environment in seconds.
    </Timeline.Item>
    <Timeline.Item>
      <b>GitHub Copilot</b> is your AI pair programmer that empowers you to complete tasks.
    </Timeline.Item>
  </Timeline>
)

const PlaceholderImage = () => <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />

export const Default: StoryFn<typeof RiverBreakout> = () => (
  <RiverBreakout>
    <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
    <RiverBreakout.Visual>
      <PlaceholderImage />
    </RiverBreakout.Visual>
    <RiverBreakout.Content trailingComponent={TrailingTimeline}>
      <Text>
        Accelerate your workflows and scale your business fast with access to millions of open source projects on
        GitHub, the largest source code host.
      </Text>
      <Link href="#">Call to action</Link>
    </RiverBreakout.Content>
  </RiverBreakout>
)

export const HighlightedPortion: StoryFn<typeof RiverBreakout> = () => (
  <RiverBreakout>
    <RiverBreakout.A11yHeading>River breakout highlight</RiverBreakout.A11yHeading>
    <RiverBreakout.Visual>
      <PlaceholderImage />
    </RiverBreakout.Visual>
    <RiverBreakout.Content trailingComponent={TrailingTimeline}>
      <Text>
        <b>This first sentence is a river breakout headline.</b> And this is where the body copy starts. Remember to
        keep these nice and succinct.
      </Text>
      <Link href="#">Call to action</Link>
    </RiverBreakout.Content>
  </RiverBreakout>
)

export const WithoutTrailingComponent: StoryFn<typeof RiverBreakout> = () => (
  <RiverBreakout>
    <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
    <RiverBreakout.Visual>
      <PlaceholderImage />
    </RiverBreakout.Visual>
    <RiverBreakout.Content>
      <Text>
        Accelerate your workflows and scale your business fast with access to millions of open source projects on
        GitHub, the largest source code host.
      </Text>
      <Link href="#">Call to action</Link>
    </RiverBreakout.Content>
  </RiverBreakout>
)
