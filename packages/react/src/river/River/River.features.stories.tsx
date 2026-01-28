import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {River} from '.'
import {Heading, Label, Link, Stack, Text, Timeline} from '../../'
import {Container} from '../../component-helpers'
import placeholderImage from '../../fixtures/images/placeholder.png'

export default {
  title: 'Components/River/features',
  component: River,
} as Meta<typeof River>

const PlaceholderImage = () => <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />

export const Left: StoryFn<typeof River> = () => (
  <River align="start">
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

export const Right: StoryFn<typeof River> = () => (
  <River align="end">
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

export const Center: StoryFn<typeof River> = () => (
  <River align="center">
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

export const DuoTone: StoryFn<typeof River> = () => (
  <River>
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Text size="300">
        <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this nice and
        succinct.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

export const ColumnRatio6040: StoryFn<typeof River> = () => (
  <Container>
    <River imageTextRatio="60:40">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Text>Use the imageTextRatio prop with &quot;60:40&quot; to display a larger image.</Text>
      </River.Content>
    </River>
  </Container>
)

ColumnRatio6040.storyName = '60:40 image ratio'

export const ColumnRatio5050: StoryFn<typeof River> = () => (
  <Container>
    <River imageTextRatio="50:50">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Text>By default imageTextRatio is set to &quot;50:50&quot;.</Text>
      </River.Content>
    </River>
  </Container>
)

ColumnRatio5050.storyName = '50:50 image ratio'

export const AlternativeHeadingLevel: StoryFn<typeof River> = () => (
  <Container>
    <River>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading as="h1">This is a h1</Heading>
        <Text>Use alternative heading levels, while maintaining the default text size.</Text>
      </River.Content>
    </River>
  </Container>
)

export const NoRoundedVisualCorners: StoryFn<typeof River> = () => (
  <Container>
    <River>
      <River.Visual rounded={false}>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>This is a h1</Heading>
        <Text>Use alternative heading levels, while maintaining the default text size.</Text>
      </River.Content>
    </River>
  </Container>
)

export const AlternativeHeadingSize: StoryFn<typeof River> = () => (
  <Container>
    <River>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading size="1">Heading</Heading>
        <Text>Use alternative heading sizes, while maintaining the default heading level.</Text>
      </River.Content>
    </River>
  </Container>
)

export const WithLabel: StoryFn<typeof River> = () => (
  <Container>
    <River>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Label color="green">Label</Label>
        <Heading size="1">Heading</Heading>
        <Text>Use alternative heading sizes, while maintaining the default heading level.</Text>
      </River.Content>
    </River>
  </Container>
)

const ExampleTrailingComponent = () => (
  <Stack direction="vertical" padding="none" gap="spacious" alignItems="flex-start">
    <Timeline>
      <Timeline.Item>
        <b>GitHub Codespaces</b> offers a complete dev environment in seconds.
      </Timeline.Item>
      <Timeline.Item>
        <b>GitHub Copilot</b> is your AI pair programmer that empowers you to complete tasks.
      </Timeline.Item>
    </Timeline>
    <Link href="#" variant="accent">
      Learn more about a thing
    </Link>
  </Stack>
)

export const CustomTrailingContent: StoryFn<typeof River> = () => (
  <Container>
    <River>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content trailingComponent={ExampleTrailingComponent}>
        <Heading>Heading</Heading>
        <Text>Use alternative heading sizes, while maintaining the default heading level.</Text>
      </River.Content>
    </River>
  </Container>
)
CustomTrailingContent.storyName = 'Custom trailing content'

export const CustomTrailingContentWithDivider: StoryFn<typeof River> = () => (
  <Container>
    <River>
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content trailingComponent={ExampleTrailingComponent} trailingComponentDivider>
        <Heading>Heading</Heading>
        <Text>Use alternative heading sizes, while maintaining the default heading level.</Text>
      </River.Content>
    </River>
  </Container>
)

CustomTrailingContentWithDivider.storyName = 'Custom trailing content w/ divider'

export const BorderedGrid: StoryFn<typeof River> = () => (
  <River variant="bordered-grid" align="start">
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Bordered Grid Variant</Heading>
      <Text>
        The bordered-grid variant adds lateral padding and borders to the River component, making it suitable for use
        within bordered grid layouts.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

BorderedGrid.storyName = 'Bordered grid variant'

export const BorderedGridEnd: StoryFn<typeof River> = () => (
  <River variant="bordered-grid" align="end">
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Bordered Grid Variant (End)</Heading>
      <Text>The bordered-grid variant with end alignment positions the content on the right side of the visual.</Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

BorderedGridEnd.storyName = 'Bordered grid variant (end)'

export const BorderedGridCenter: StoryFn<typeof River> = () => (
  <River variant="bordered-grid" align="center">
    <River.Visual>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Bordered Grid Variant (Centered)</Heading>
      <Text>
        The bordered-grid variant with center alignment stacks the content below the visual with centered text.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

BorderedGridCenter.storyName = 'Bordered grid variant (centered)'

export const BorderedGridWithBackground: StoryFn<typeof River> = () => (
  <River variant="bordered-grid" align="start">
    <River.Visual hasBackground>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Bordered Grid with Background</Heading>
      <Text>
        Using hasBackground on River.Visual creates a full-bleed container with a subtle background color and the
        image/video centered inside with padding.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

BorderedGridWithBackground.storyName = 'Bordered grid variant (with background)'

export const BorderedGridWithBackgroundEnd: StoryFn<typeof River> = () => (
  <River variant="bordered-grid" align="end">
    <River.Visual hasBackground>
      <PlaceholderImage />
    </River.Visual>
    <River.Content>
      <Heading>Bordered Grid with Background (End)</Heading>
      <Text>
        The hasBackground prop can be combined with different alignment options. This example shows end alignment.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
)

BorderedGridWithBackgroundEnd.storyName = 'Bordered grid variant (with background, end)'

export const AlternatingLayout: StoryFn<typeof River> = () => (
  <>
    <River align="start">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>Heading</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
    <River align="end">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>Heading</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
    <River align="center">
      <River.Visual>
        <PlaceholderImage />
      </River.Visual>
      <River.Content>
        <Heading>Heading</Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </>
)
