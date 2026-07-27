import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import examplePoster from '../../fixtures/images/example-poster.png'
import placeholderImage from '../../fixtures/images/placeholder.png'

import {River} from '.'
import {EyebrowText, Heading, Label, Link, Section, Text} from '../../'

const meta: Meta<typeof River> = {
  title: 'Components/River/Features/GridLine variants',
  component: River,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof River>

const PlaceholderImage = () => <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />

export const GridLine: Story = {
  name: 'GridLine variant',
  render: () => (
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
  ),
}

export const GridLineEnd: Story = {
  name: 'GridLine variant (end)',
  render: () => (
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
  ),
}

export const GridLineCenter: Story = {
  name: 'GridLine variant (centered)',
  render: () => (
    <Section>
      <River variant="gridline" align="center">
        <River.Visual>
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine Variant (Centered)</Heading>
          <Text>
            The gridline variant with center alignment stacks the content below the visual with centered text.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineWithBackground: Story = {
  name: 'GridLine variant (with background)',
  render: () => (
    <Section>
      <River variant="gridline" align="start">
        <River.Visual imageBackgroundColor="subtle" position="default" padding="default">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine with Background</Heading>
          <Text>
            Using imageBackgroundColor on River.Visual creates a full-bleed container with a subtle background color and
            the image/video centered inside with padding.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineWithBackgroundEnd: Story = {
  name: 'GridLine variant (with background, end)',
  render: () => (
    <Section>
      <River variant="gridline" align="end">
        <River.Visual imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine with Background (End)</Heading>
          <Text>
            The imageBackgroundColor prop can be combined with different alignment options. This example shows end
            alignment.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineWithBackgroundCenter: Story = {
  name: 'GridLine variant (with background, centered)',
  render: () => (
    <Section>
      <River variant="gridline" align="center">
        <River.Visual imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine with Background (Centered)</Heading>
          <Text>The imageBackgroundColor prop works with centered alignment as well.</Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineVisualPositionCenter: Story = {
  name: 'GridLine visual position: Center',
  render: () => (
    <Section>
      <River variant="gridline" align="start">
        <River.Visual position="center" imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <EyebrowText>Feature</EyebrowText>
          <Heading>Visual centered</Heading>
          <Text>
            Visual uses center positioning, which applies padding on all sides by default. A subtle background color
            adds some contrast.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineVisualPositionBlockEnd: Story = {
  name: 'GridLine visual position: Block end',
  render: () => (
    <Section>
      <River variant="gridline" align="start">
        <River.Visual position="block-end" imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <EyebrowText>Feature</EyebrowText>
          <Heading>Visual aligned to the bottom</Heading>
          <Text>
            Visual uses block-end positioning, making it flush to the bottom with padding on the top and sides. A subtle
            background color adds some contrast.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineVisualPositionBlockEndInlineStart: Story = {
  name: 'GridLine visual position: Block end, inline start',
  render: () => (
    <Section>
      <River variant="gridline" align="end">
        <River.Visual position="block-end-inline-start" imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <EyebrowText>Feature</EyebrowText>
          <Heading>Visual aligned to the bottom left</Heading>
          <Text>
            Visual uses block-end, inline-start positioning, making it flush to the bottom and left with padding on the
            top and right. A subtle background color adds some contrast.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineVisualPositionBlockEndInlineEnd: Story = {
  name: 'GridLine visual position: Block end, inline end',
  render: () => (
    <Section>
      <River variant="gridline" align="start">
        <River.Visual position="block-end-inline-end" imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <EyebrowText>Feature</EyebrowText>
          <Heading>Visual aligned to the bottom right</Heading>
          <Text>
            Visual uses block-end, inline-end positioning, making it flush to the bottom and right with padding on the
            top and left. A subtle background color adds some contrast.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineVisualPaddingNone: Story = {
  name: 'GridLine visual padding: None',
  render: () => (
    <Section>
      <River variant="gridline" align="start">
        <River.Visual position="center" padding="none" imageBackgroundColor="subtle">
          <img src={examplePoster} alt="Mona looking through binoculars" />
        </River.Visual>
        <River.Content>
          <EyebrowText>Feature</EyebrowText>
          <Heading>Full-bleed visual</Heading>
          <Text>
            Visual uses no padding, making the media fill the full visual region with square corners. A subtle
            background color sits behind the media.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineVisualPaddingAll: Story = {
  name: 'GridLine visual padding: All',
  render: () => (
    <Section>
      <River variant="gridline" align="start">
        <River.Visual padding="all" imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <EyebrowText>Feature</EyebrowText>
          <Heading>Visual inset on every side</Heading>
          <Text>
            Visual uses padding on all sides, keeping the media inset with rounded corners. A subtle background color
            adds some contrast.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLineWithEyebrowText: Story = {
  name: 'GridLine variant (with EyebrowText)',
  render: () => (
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
  ),
}

export const GridLineWithLabel: Story = {
  name: 'GridLine variant (with Label)',
  render: () => (
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
  ),
}

export const GridLineContentAlignBlockEnd: Story = {
  name: 'GridLine variant (content align block-end)',
  render: () => (
    <Section>
      <River variant="gridline" align="start">
        <River.Visual imageBackgroundColor="subtle">
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
  ),
}

// 60:40 ratio stories

export const GridLine6040: Story = {
  name: 'GridLine variant (60:40)',
  render: () => (
    <Section>
      <River variant="gridline" align="start" imageTextRatio="60:40">
        <River.Visual>
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine 60:40 Ratio</Heading>
          <Text>The gridline variant with 60:40 image to text ratio displays a larger image area.</Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLine6040End: Story = {
  name: 'GridLine variant (60:40, end)',
  render: () => (
    <Section>
      <River variant="gridline" align="end" imageTextRatio="60:40">
        <River.Visual>
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine 60:40 Ratio (End)</Heading>
          <Text>The 60:40 ratio combined with end alignment.</Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLine6040Center: Story = {
  name: 'GridLine variant (60:40, centered)',
  render: () => (
    <Section>
      <River variant="gridline" align="center" imageTextRatio="60:40">
        <River.Visual>
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine 60:40 Ratio (Centered)</Heading>
          <Text>The 60:40 ratio with centered alignment stacks the content below the visual.</Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLine6040WithBackground: Story = {
  name: 'GridLine variant (60:40, with background)',
  render: () => (
    <Section>
      <River variant="gridline" align="start" imageTextRatio="60:40">
        <River.Visual imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine 60:40 with Background</Heading>
          <Text>The 60:40 ratio combined with subtle background color.</Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLine6040WithBackgroundEnd: Story = {
  name: 'GridLine variant (60:40, with background, end)',
  render: () => (
    <Section>
      <River variant="gridline" align="end" imageTextRatio="60:40">
        <River.Visual imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine 60:40 with Background (End)</Heading>
          <Text>The 60:40 ratio with end alignment and subtle background.</Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}

export const GridLine6040WithBackgroundCenter: Story = {
  name: 'GridLine variant (60:40, with background, centered)',
  render: () => (
    <Section>
      <River variant="gridline" align="center" imageTextRatio="60:40">
        <River.Visual imageBackgroundColor="subtle">
          <PlaceholderImage />
        </River.Visual>
        <River.Content>
          <Heading>GridLine 60:40 with Background (Centered)</Heading>
          <Text>The 60:40 ratio with centered alignment and subtle background.</Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </Section>
  ),
}
