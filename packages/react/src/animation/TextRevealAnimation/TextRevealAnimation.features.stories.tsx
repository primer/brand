import React from 'react'
import type {Meta, StoryFn} from '@storybook/react'
import {ArrowDownIcon} from '@primer/octicons-react'
import {TextRevealAnimation} from '.'
import {Testimonial, Box, AnimationProvider, Text, Grid} from '../..'
import {RedlineBackground} from '../../component-helpers'

const meta: Meta<typeof TextRevealAnimation> = {
  title: 'Components/TextRevealAnimation/Features',
  component: TextRevealAnimation,
  decorators: [
    Story => (
      <AnimationProvider>
        <Box animate="fade-in">
          <Story />
        </Box>
      </AnimationProvider>
    ),
  ],
} as Meta<typeof TextRevealAnimation>

export const AnimationOnScroll: StoryFn = () => (
  <Grid>
    <Grid.Column>
      <RedlineBackground height={1200}>
        <Text as="p" align="center" weight="extrabold" size="500">
          Scroll down <ArrowDownIcon size={24} />
        </Text>
      </RedlineBackground>
      <Box style={{paddingBlockStart: '10dvh', paddingBlockEnd: '10dvh'}}>
        <Testimonial size="large" quoteMarkColor="pink">
          <Testimonial.Quote>
            <TextRevealAnimation>
              GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the
              first line of code we&apos;re writing.
            </TextRevealAnimation>
          </Testimonial.Quote>
          <Testimonial.Name position="Staff Software Engineer">David Ross</Testimonial.Name>
        </Testimonial>
      </Box>
    </Grid.Column>
  </Grid>
)

export default meta
