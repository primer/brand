import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'

import placeholderImage from '../../fixtures/images/placeholder.png'
import browserImage from '../../fixtures/images/browser-light.png'

import {River} from '.'
import {EyebrowText, Heading, Label, Link, Section, Text} from '../../'

export default {
  title: 'Components/River/GridLine',
  component: River,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof River>

const PlaceholderImage = () => <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />

export const GridLine: StoryFn<typeof River> = () => (
  <Section>
    <River variant="gridline" align="start">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>GridLine Variant</Heading>
        <Text>
          The gridline variant adds lateral padding and borders to the River component, making it suitable for use
          within bordered grid layouts.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Section>
)

GridLine.storyName = 'GridLine variant'

export const GridLineEnd: StoryFn<typeof River> = () => (
  <Section>
    <River variant="gridline" align="end">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>GridLine Variant (End)</Heading>
        <Text>The gridline variant with end alignment positions the content on the right side of the visual.</Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Section>
)

GridLineEnd.storyName = 'GridLine variant (end)'

export const GridLineCenter: StoryFn<typeof River> = () => (
  <Section>
    <River variant="gridline" align="center">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>GridLine Variant (Centered)</Heading>
        <Text>The gridline variant with center alignment stacks the content below the visual with centered text.</Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Section>
)

GridLineCenter.storyName = 'GridLine variant (centered)'

export const GridLineWithBackground: StoryFn<typeof River> = () => (
  <Section>
    <River variant="gridline" align="start">
      <River.Visual hasBackground>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>GridLine with Background</Heading>
        <Text>
          Using hasBackground on River.Visual creates a full-bleed container with a subtle background color and the
          image/video centered inside with padding.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Section>
)

GridLineWithBackground.storyName = 'GridLine variant (with background)'

export const GridLineWithBackgroundEnd: StoryFn<typeof River> = () => (
  <Section>
    <River variant="gridline" align="end">
      <River.Visual hasBackground>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>GridLine with Background (End)</Heading>
        <Text>
          The hasBackground prop can be combined with different alignment options. This example shows end alignment.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Section>
)

GridLineWithBackgroundEnd.storyName = 'GridLine variant (with background, end)'

export const GridLineWithBackgroundCenter: StoryFn<typeof River> = () => (
  <Section>
    <River variant="gridline" align="center">
      <River.Visual hasBackground>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>GridLine with Background (Centered)</Heading>
        <Text>The hasBackground prop works with centered alignment as well.</Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Section>
)

GridLineWithBackgroundCenter.storyName = 'GridLine variant (with background, centered)'

export const GridLineWithEyebrowText: StoryFn<typeof River> = () => (
  <Section>
    <River variant="gridline" align="start">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <EyebrowText>Feature</EyebrowText>
        <Heading>GridLine with EyebrowText</Heading>
        <Text>Use EyebrowText as a child of River.Content to add a small, uppercase label above the heading.</Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Section>
)

GridLineWithEyebrowText.storyName = 'GridLine variant (with EyebrowText)'

export const GridLineWithLabel: StoryFn<typeof River> = () => (
  <Section>
    <River variant="gridline" align="start">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Label color="green">New</Label>
        <Heading>GridLine with Label</Heading>
        <Text>You can also use the Label component for colored badges above the heading.</Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Section>
)

GridLineWithLabel.storyName = 'GridLine variant (with Label)'

export const GridLineContentAlignBlockEnd: StoryFn<typeof River> = () => (
  <Section>
    <River variant="gridline" align="start">
      <River.Visual hasBackground>
        <img
          src={placeholderImage}
          alt="placeholder, blank area with a gray background color"
          style={{minHeight: 400}}
        />
      </River.Visual>
      <River.Content align="block-end">
        <EyebrowText>Feature</EyebrowText>
        <Heading>Content aligned to block-end</Heading>
        <Text>
          On large viewports, the content aligns to the bottom of its container. This is useful when the visual is
          taller than the content.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </Section>
)

GridLineContentAlignBlockEnd.storyName = 'GridLine variant (content align block-end)'
