import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'

import {RiverStoryScroll, RiverStoryScrollProps} from '.'
import {Heading, Text, Link, River, Box, Timeline, VideoPlayer} from '../..'
import {Container} from '../../component-helpers'

import placeholder1 from '../../fixtures/images/placeholder-1.png'
import placeholder2 from '../../fixtures/images/placeholder-2.png'
import placeholder3 from '../../fixtures/images/placeholder-3.png'

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
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof RiverStoryScroll>

type TemplateProps = {
  withTrailingComponent: boolean
} & RiverStoryScrollProps

const Template: StoryFn<TemplateProps> = args => {
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

export const WithTimeline = Template.bind({})
WithTimeline.args = {
  withTrailingComponent: true,
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

export const WithTimelineNarrow = () => <WithTimeline withTrailingComponent />

WithTimelineNarrow.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const DisabledNarrow = args => <Disabled withTrailingComponent {...args} />
DisabledNarrow.args = {
  disabled: true,
}
DisabledNarrow.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const EnterpriseExample = () => (
  <RiverStoryScroll>
    <River>
      <River.Visual>
        <img
          src="https://github.com/images/modules/site/enterprise/2023/devops.png"
          alt="placeholder, blank area with a gray background color"
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
          src="https://github.com/images/modules/site/enterprise/2023/platform.png"
          alt="placeholder, blank area with a gray background color"
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
          Leverage the industry’s most flexible secure development platform.
        </Heading>
      </River.Content>
    </River>
    <River>
      <River.Visual>
        <img
          src="https://github.com/images/modules/site/enterprise/2023/ai.png"
          alt="placeholder, blank area with a gray background color"
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

export const EnterpriseExampleNarrow = () => <EnterpriseExample />

EnterpriseExampleNarrow.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}

export const Video = args => (
  <RiverStoryScroll {...args} align={args.align} imageTextRatio={args.imageTextRatio}>
    <River>
      <River.Visual>
        <VideoPlayer title="Example">
          <VideoPlayer.Source
            src="https://githubnext.com/assets/projects/copilot-workspace/features-river-1.mp4"
            type="video/mp4; codecs=avc1.4d002a"
          />
          <VideoPlayer.Track src="./example.vtt" default />
        </VideoPlayer>
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
        <VideoPlayer title="Example">
          <VideoPlayer.Source
            src="https://githubnext.com/assets/projects/copilot-workspace/features-river-2.mp4"
            type="video/mp4; codecs=avc1.4d002a"
          />
          <VideoPlayer.Track src="./example.vtt" default />
        </VideoPlayer>
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
        <VideoPlayer title="Example">
          <VideoPlayer.Source
            src="https://githubnext.com/assets/projects/copilot-workspace/features-river-3.mp4"
            type="video/mp4; codecs=avc1.4d002a"
          />
          <VideoPlayer.Track src="./example.vtt" default />
        </VideoPlayer>
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
        <VideoPlayer title="Example">
          <VideoPlayer.Source
            src="https://githubnext.com/assets/projects/copilot-workspace/features-river-4.mp4"
            type="video/mp4; codecs=avc1.4d002a"
          />
          <VideoPlayer.Track src="./example.vtt" default />
        </VideoPlayer>
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

export const VideoNarrow = () => <Video />

VideoNarrow.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
