import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {RiverStoryScroll, RiverStoryScrollProps} from '.'
import {Heading, Text, Link, River, Box, Timeline} from '../..'
import {Container} from '../../component-helpers'

import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'
import placeholder3 from '../../fixtures/images/placeholder-3.png'

import enterprise1 from '../../fixtures/images/enterprise-devops.webp'
import enterprise2 from '../../fixtures/images/enterprise-platform.webp'
import enterprise3 from '../../fixtures/images/enterprise-ai.webp'

type ComponentAndStoryProps = RiverStoryScrollProps & {
  withTrailingComponent: boolean
}

export default {
  title: 'Components/RiverStoryScroll/features',
  component: RiverStoryScroll,
  args: {
    withTrailingComponent: false,
  },
  argTypes: {
    withTrailingComponent: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    Story => (
      <Container>
        <Box style={{padding: '15dvh 0'}}>
          <Story />
        </Box>
      </Container>
    ),
  ],
} satisfies Meta<ComponentAndStoryProps>

type Story = StoryObj<ComponentAndStoryProps>

const TemplateComponent = (args: ComponentAndStoryProps) => {
  return (
    <RiverStoryScroll {...args} align={args.align} imageTextRatio={args.imageTextRatio}>
      <River>
        <River.Visual>
          <img
            src={placeholder1}
            alt="placeholder, blank area with an orange background color and a white number 1 in the center"
          />
        </River.Visual>
        <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
          <Text size="300">
            <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this nice
            and succinct.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
      <River>
        <River.Visual>
          <img
            src={placeholder2}
            alt="placeholder, blank area with a purple background color and a white number 2 in the center"
          />
        </River.Visual>
        <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
          <Text size="300">
            <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this nice
            and succinct.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
      <River>
        <River.Visual>
          <img
            src={placeholder3}
            alt="placeholder, blank area with a turquoise background color and a white number 3 in the center"
          />
        </River.Visual>
        <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
          <Text size="300">
            <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this nice
            and succinct.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </RiverStoryScroll>
  )
}

export const WithTimeline: Story = {
  args: {
    withTrailingComponent: true,
  },
  render: TemplateComponent,
}

function TimelineExample() {
  return (
    <Timeline>
      <Timeline.Item>Increase developer velocity</Timeline.Item>
      <Timeline.Item>Faster feedback loops</Timeline.Item>
      <Timeline.Item>Secure every build</Timeline.Item>
    </Timeline>
  )
}

export const WithTimelineNarrow: Story = {
  globals: {
    viewport: {value: 'iphonexr'},
  },
  args: {
    withTrailingComponent: true,
  },
  render: TemplateComponent,
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: TemplateComponent,
}

export const DisabledNarrow: Story = {
  args: {
    disabled: true,
  },
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: TemplateComponent,
}

const EnterpriseTemplate = () => (
  <RiverStoryScroll>
    <River>
      <River.Visual>
        <img
          src={enterprise1}
          alt="A notification panel from a development operations tool showing statuses such as 'Changes requested,' 'Some checks were not successful,' and 'Merging is blocked."
        />
      </River.Visual>
      <River.Content>
        <Heading size="5" as="h3" weight="medium">
          Consolidate DevSecOps processes and enable unparalleled collaboration.
        </Heading>
        <Link href="https://resources.github.com/forrester/" variant="accent">
          Learn more about the ROI of GitHub
        </Link>
      </River.Content>
    </River>
    <River>
      <River.Visual>
        <img
          src={enterprise2}
          alt="A collection of application icons for various development tools like Imgbot, AccessLint, WakaTime, Circle CI, Cirrus CI and Code Climate."
        />
      </River.Visual>
      <River.Content
        trailingComponent={() => (
          <Box marginBlockStart={24} paddingBlockStart={24}>
            <Heading as="h4" size="3">
              17,000+
            </Heading>
            <Text as="p" size="300" weight="light" variant="muted">
              Third-party tools support your favorite languages and frameworks <sup>1</sup>
            </Text>
          </Box>
        )}
      >
        <Heading size="5" as="h3" weight="medium">
          Leverage the industry&apos;s most flexible secure development platform.
        </Heading>
      </River.Content>
    </River>
    <River>
      <River.Visual>
        <img
          src={enterprise3}
          alt="A user interface element with a search bar inviting to 'Ask a question or type '/' for topics'."
        />
      </River.Visual>
      <River.Content>
        <Heading size="5" as="h3" weight="medium">
          Unlocking innovation at scale with AI-driven software development.
        </Heading>
      </River.Content>
    </River>
  </RiverStoryScroll>
)

export const EnterpriseExample: Story = {
  render: EnterpriseTemplate,
}

export const EnterpriseExampleNarrow: Story = {
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: EnterpriseTemplate,
}

const VideoExample = (args: ComponentAndStoryProps) => (
  <RiverStoryScroll {...args} align={args.align} imageTextRatio={args.imageTextRatio}>
    <River>
      <River.Visual>
        <video autoPlay muted loop>
          <source src="./videos/1.mp4" type="video/mp4" />
          <track kind="captions" />
        </video>
      </River.Visual>
      <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
        <Heading>Heading 1</Heading>
        <Text size="300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
    <River>
      <River.Visual>
        <video autoPlay muted loop>
          <source src="./videos/2.mp4" type="video/mp4" />
          <track kind="captions" />
        </video>
      </River.Visual>
      <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
        <Heading>Heading 2</Heading>
        <Text size="300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
    <River>
      <River.Visual>
        <video autoPlay muted loop>
          <source src="./videos/3.mp4" type="video/mp4" />
          <track kind="captions" />
        </video>
      </River.Visual>
      <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
        <Heading>Heading 3 </Heading>
        <Text size="300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
    <River>
      <River.Visual>
        <video autoPlay muted loop>
          <source src="./videos/4.mp4" type="video/mp4" />
          <track kind="captions" />
        </video>
      </River.Visual>
      <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
        <Heading>Heading 4</Heading>
        <Text size="300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Text>
        <Link href="#">Call to action</Link>
      </River.Content>
    </River>
  </RiverStoryScroll>
)

export const Video: Story = {
  render: VideoExample,
}

export const VideoNarrow: Story = {
  globals: {
    viewport: {value: 'iphonexr'},
  },
  render: VideoExample,
}
