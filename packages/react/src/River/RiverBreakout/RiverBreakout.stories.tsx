import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {RiverBreakout} from '.'
import {Link, Text, Timeline} from '../../'
import {Container} from '../../component-helpers'
import placeholderImage from '../../fixtures/images/placeholder-600x400.png'

export default {
  title: 'Components/RiverBreakout',
  component: RiverBreakout,
} as Meta<typeof RiverBreakout>

const TrailingTimeline = () => (
  <Timeline>
    <Timeline.Item>
      <em>GitHub Codespaces</em> offers a complete dev environment in seconds.
    </Timeline.Item>
    <Timeline.Item>
      <em>GitHub Copilot</em> is your AI pair programmer that empowers you to complete tasks.
    </Timeline.Item>
  </Timeline>
)

const PlaceholderImage = () => (
  <img src={placeholderImage} alt="placeholder, blank area with an off-white background color" />
)

export const WithBreakout: StoryFn<typeof RiverBreakout> = () => (
  <Container>
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
  </Container>
)

export const WithBreakoutAndHighlightedText: StoryFn<typeof RiverBreakout> = () => (
  <Container>
    <RiverBreakout>
      <RiverBreakout.A11yHeading>River breakout highlight</RiverBreakout.A11yHeading>
      <RiverBreakout.Visual>
        <PlaceholderImage />
      </RiverBreakout.Visual>
      <RiverBreakout.Content trailingComponent={TrailingTimeline}>
        <Text>
          <em>This first sentence is a river breakout headline.</em> And this is where the body copy starts. Remember to
          keep these nice and succinct.
        </Text>
        <Link href="#">Call to action</Link>
      </RiverBreakout.Content>
    </RiverBreakout>
  </Container>
)

export const WithoutTrailingContent: StoryFn<typeof RiverBreakout> = () => (
  <Container>
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
  </Container>
)
