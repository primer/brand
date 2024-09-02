import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {RiverBreakout} from '.'
import {DuotoneText, Link, Text, Timeline} from '../../'
import {Container} from '../../component-helpers'
import placeholderImage from '../../fixtures/images/placeholder-600x400.png'

export default {
  title: 'Components/RiverBreakout',
  component: RiverBreakout,
} as Meta<typeof RiverBreakout>

const TrailingTimeline = () => (
  <Timeline>
    <Timeline.Item>
      <DuotoneText>
        <DuotoneText.Emphasis>GitHub Codespaces</DuotoneText.Emphasis> offers a complete dev environment in seconds.
      </DuotoneText>
    </Timeline.Item>
    <Timeline.Item>
      <DuotoneText>
        <DuotoneText.Emphasis>GitHub Copilot</DuotoneText.Emphasis> is your AI pair programmer that empowers you to
        complete tasks.
      </DuotoneText>
    </Timeline.Item>
  </Timeline>
)

const PlaceholderImage = () => (
  <img src={placeholderImage} alt="placeholder, blank area with an off-white background color" />
)

export const Default: StoryFn<typeof RiverBreakout> = () => (
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

export const HighlightedPortion: StoryFn<typeof RiverBreakout> = () => (
  <Container>
    <RiverBreakout>
      <RiverBreakout.A11yHeading>River breakout highlight</RiverBreakout.A11yHeading>
      <RiverBreakout.Visual>
        <PlaceholderImage />
      </RiverBreakout.Visual>
      <RiverBreakout.Content trailingComponent={TrailingTimeline}>
        <Text>
          <DuotoneText>
            <DuotoneText.Emphasis>This first sentence is a river breakout headline.</DuotoneText.Emphasis> And this is
            where the body copy starts. Remember to keep these nice and succinct.
          </DuotoneText>
        </Text>
        <Link href="#">Call to action</Link>
      </RiverBreakout.Content>
    </RiverBreakout>
  </Container>
)

export const WithoutTrailingComponent: StoryFn<typeof RiverBreakout> = () => (
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
