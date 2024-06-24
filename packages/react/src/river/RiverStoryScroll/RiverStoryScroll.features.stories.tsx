import React from 'react'
import {StoryFn, Meta} from '@storybook/react'

import {RiverStoryScroll, RiverStoryScrollProps} from '.'
import {Heading, Text, Link, River, Box, Timeline} from '../..'
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
      <Box style={{padding: '15dvh 0 200dvh'}}>
        <RiverStoryScroll {...args} align={args.align} imageTextRatio={args.imageTextRatio}>
          <River>
            <River.Visual>
              <img
                src="https://via.placeholder.com/600x400/FF5733/ffffff.png?text=1"
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
                src="https://via.placeholder.com/600x400/AF7AC5/ffffff.png?text=2"
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
                src="https://via.placeholder.com/600x400/FFC300/ffffff.png?text=3"
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
                src="https://via.placeholder.com/600x400/48C9B0/ffffff.png?text=4"
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
