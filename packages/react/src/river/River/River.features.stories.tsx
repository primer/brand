import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {River} from '.'
import {Heading, Label, Link, Stack, Text, Timeline} from '../../'
import {Container} from '../../component-helpers'
import placeholderImage from '../../fixtures/images/placeholder.png'

export default {
  title: 'Components/River/features',
  component: River,
} as Meta<typeof River>

const PlaceholderImage = () => (
  <img src={placeholderImage} alt="placeholder, blank area with an off-white background color" />
)

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
