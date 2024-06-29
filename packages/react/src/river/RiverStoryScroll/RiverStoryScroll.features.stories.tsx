import React from 'react'
import {StoryFn, Meta} from '@storybook/react'

import {RiverStoryScroll, RiverStoryScrollProps} from '.'
import {Heading, Text, Link, River, Box, Timeline, ThemeProvider, Grid} from '../..'
import {Container} from '../../component-helpers'

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
} as Meta<typeof RiverStoryScroll>

type TemplateProps = {
  withTrailingComponent: boolean
} & RiverStoryScrollProps

const Template: StoryFn<TemplateProps> = args => {
  return (
    <Container>
      <Box style={{padding: '100dvh 0 200dvh'}}>
        <RiverStoryScroll {...args} align={args.align} imageTextRatio={args.imageTextRatio}>
          <River>
            <River.Visual>
              <img
                src="https://placehold.co/600x400/FF5733/ffffff?text=1"
                alt="placeholder, blank area with an off-white background color"
              />
            </River.Visual>
            <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
              <Heading>Heading 1</Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                sed turpis felis nam pulvinar risus elementum.
              </Text>
              <Link href="#">Call to action</Link>
            </River.Content>
          </River>
          <River>
            <River.Visual>
              <img
                src="https://placehold.co/600x400/AF7AC5/ffffff?text=2"
                alt="placeholder, blank area with an off-white background color"
              />
            </River.Visual>
            <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
              <Heading>Heading 2</Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                sed turpis felis nam pulvinar risus elementum.
              </Text>
              <Link href="#">Call to action</Link>
            </River.Content>
          </River>
          <River>
            <River.Visual>
              <img
                src="https://placehold.co/600x400/FFC300/ffffff?text=3"
                alt="placeholder, blank area with an off-white background color"
              />
            </River.Visual>
            <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
              <Heading>Heading 3 </Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                sed turpis felis nam pulvinar risus elementum.
              </Text>
              <Link href="#">Call to action</Link>
            </River.Content>
          </River>
          <River>
            <River.Visual>
              <img
                src="https://placehold.co/600x400/48C9B0/ffffff?text=4"
                alt="placeholder, blank area with an off-white background color"
              />
            </River.Visual>
            <River.Content trailingComponent={args.withTrailingComponent ? TimelineExample : undefined}>
              <Heading>Heading 4</Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus
                sed turpis felis nam pulvinar risus elementum.
              </Text>
              <Link href="#">Call to action</Link>
            </River.Content>
          </River>
        </RiverStoryScroll>
      </Box>
    </Container>
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

export const Disable = Template.bind({})
Disable.args = {
  disable: true,
}

export const ImageTextRatio = Template.bind({})
ImageTextRatio.args = {
  imageTextRatio: '60:40',
}
ImageTextRatio.storyName = '60:40'

export const Alignment = Template.bind({})
Alignment.args = {
  align: 'end',
}

export const EnterpriseExample = () => (
  <RiverStoryScroll>
    <River>
      <River.Visual>
        <img
          src="https://github.com/images/modules/site/enterprise/2023/devops.png"
          alt="placeholder, blank area with an off-white background color"
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
          alt="placeholder, blank area with an off-white background color"
        />
      </River.Visual>
      <River.Content
        trailingComponent={() => (
          <div className="pr-lg-10">
            <Box
              borderBlockStartWidth="thin"
              borderColor="default"
              borderStyle="solid"
              marginBlockStart={24}
              paddingBlockStart={24}
            >
              <Heading as="h4" size="3">
                17,000+
              </Heading>
              <Text as="p" size="300" weight="light" variant="muted">
                Third-party tools support your favorite languages and frameworks <sup>1</sup>
              </Text>
            </Box>
          </div>
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
          alt="placeholder, blank area with an off-white background color"
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

EnterpriseExample.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <div style={{backgroundColor: 'black', height: '100%', minHeight: '100dvh'}}>
        <Grid>
          <Grid.Column>
            <Box style={{padding: '15dvh 0 200dvh'}}>
              <Story />
            </Box>
          </Grid.Column>
        </Grid>
      </div>
    </ThemeProvider>
  ),
]

EnterpriseExample.parameters = {
  layout: 'fullscreen',
}
