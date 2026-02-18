import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'

import placeholderImage from '../../fixtures/images/placeholder.png'

import {RiverBreakout} from '.'
import {Link, Section, Stack, Text} from '../../'

export default {
  title: 'Components/RiverBreakout/Features/GridLine variants',
  component: RiverBreakout,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof RiverBreakout>

const TrailingText = () => (
  <Stack gap="normal">
    <Text as="p" variant="muted">
      <Text variant="default">Deals with your issues.</Text> When assigned issues, GitHub Copilot plans, writes, tests,
      and iterates.
    </Text>
    <Text as="p" variant="muted">
      <Text variant="default">Codes like an insider.</Text>
      When assigned isGitHub Copilot hooks into MCP servers to draw on data from your repositories and external
      resources. sues, GitHub Copilot plans, writes, tests, and iterates.
    </Text>
    <Text as="p" variant="muted">
      <Text variant="default">Human and agent in the loop.</Text>
      Comment to guide GitHub Copilot, polish your code for merge, or take over locally in your IDE.
    </Text>
  </Stack>
)

const PlaceholderImage = () => <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />

export const GridLine: StoryFn<typeof RiverBreakout> = () => (
  <Section>
    <RiverBreakout variant="gridline">
      <RiverBreakout.A11yHeading>River breakout highlight</RiverBreakout.A11yHeading>
      <RiverBreakout.Visual>
        <PlaceholderImage />
      </RiverBreakout.Visual>
      <RiverBreakout.Content trailingComponent={TrailingText} trailingComponentDivider>
        <Text>
          <b>This first sentence is a river breakout headline.</b> And this is where the body copy starts. Remember to
          keep these nice and succinct.
        </Text>
        <Link href="#">Call to action</Link>
      </RiverBreakout.Content>
    </RiverBreakout>
  </Section>
)

GridLine.storyName = 'GridLine variant'

export const GridLineWithBackground: StoryFn<typeof RiverBreakout> = () => (
  <Section>
    <RiverBreakout variant="gridline">
      <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
      <RiverBreakout.Visual imageBackgroundColor="subtle">
        <PlaceholderImage />
      </RiverBreakout.Visual>
      <RiverBreakout.Content trailingComponent={TrailingText} trailingComponentDivider>
        <Text>
          Accelerate your workflows and scale your business fast with access to millions of open source projects on
          GitHub, the largest source code host.
        </Text>
        <Link href="#">Call to action</Link>
      </RiverBreakout.Content>
    </RiverBreakout>
  </Section>
)

GridLineWithBackground.storyName = 'GridLine variant (with background)'
