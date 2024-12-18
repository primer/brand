import React from 'react'
import type {StoryObj} from '@storybook/react'

import {Testimonial, TestimonialProps} from '.'
import {Box, Stack, ThemeProvider} from '..'
import monaAvatar from '../fixtures/images/avatar-mona.png'

type MetaProps = TestimonialProps

const meta = {component: Testimonial, title: 'Components/Testimonial/Features'}
export default meta

type Story = StoryObj<MetaProps>

export const Avatar: Story = {
  render: () => (
    <div style={{width: 400, maxWidth: '100%'}}>
      <Testimonial>
        <Testimonial.Quote>
          GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
          line of code we&apos;re writing.
        </Testimonial.Quote>
        <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
        <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
      </Testimonial>
    </div>
  ),
}

export const ColoredQuoteMark: Story = {
  args: {
    quoteMarkColor: 'blue',
  },
  render: args => (
    <div style={{width: 400, maxWidth: '100%'}}>
      <Testimonial {...args}>
        <Testimonial.Quote>
          GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
          line of code we&apos;re writing.
        </Testimonial.Quote>
        <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
        <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
      </Testimonial>
    </div>
  ),
}

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: args => (
    <div style={{width: 720, maxWidth: '100%'}}>
      <Testimonial {...args}>
        <Testimonial.Quote>
          GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
          line of code we&apos;re writing.
        </Testimonial.Quote>
        <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
        <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
      </Testimonial>
    </div>
  ),
}

export const LargeHighlightedPortion: Story = {
  args: {
    size: 'large',
  },
  render: args => (
    <div style={{width: 720, maxWidth: '100%'}}>
      <Testimonial {...args}>
        <Testimonial.Quote>
          <b>GitHub helps us ensure that we have our security controls baked into our pipelines</b> all the way from the
          first line of code we&apos;re writing.
        </Testimonial.Quote>
        <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
        <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
      </Testimonial>
    </div>
  ),
}

export const Variants: Story = {
  parameters: {
    layout: 'full',
  },
  render: () => (
    <Stack
      direction={{
        narrow: 'vertical',
        wide: 'horizontal',
      }}
      padding="none"
      gap="none"
    >
      <ThemeProvider colorMode="dark">
        <Box
          backgroundColor="default"
          paddingBlockStart={128}
          paddingBlockEnd={128}
          paddingInlineStart={48}
          paddingInlineEnd={48}
        >
          <Testimonial variant="subtle">
            <Testimonial.Quote>
              <b>GitHub helps us ensure that we have our security controls baked into our pipelines</b> all the way from
              the first line of code we&apos;re writing.
            </Testimonial.Quote>
            <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
            <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
          </Testimonial>
        </Box>
        <Box
          backgroundColor="subtle"
          paddingBlockStart={128}
          paddingBlockEnd={128}
          paddingInlineStart={48}
          paddingInlineEnd={48}
        >
          <Testimonial variant="default">
            <Testimonial.Quote>
              <b>GitHub helps us ensure that we have our security controls baked into our pipelines</b> all the way from
              the first line of code we&apos;re writing.
            </Testimonial.Quote>
            <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
            <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
          </Testimonial>
        </Box>
      </ThemeProvider>

      <ThemeProvider>
        <Box
          backgroundColor="default"
          paddingBlockStart={128}
          paddingBlockEnd={128}
          paddingInlineStart={48}
          paddingInlineEnd={48}
        >
          <Testimonial variant="subtle">
            <Testimonial.Quote>
              <b>GitHub helps us ensure that we have our security controls baked into our pipelines</b> all the way from
              the first line of code we&apos;re writing.
            </Testimonial.Quote>
            <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
            <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
          </Testimonial>
        </Box>
        <Box
          backgroundColor="subtle"
          paddingBlockStart={128}
          paddingBlockEnd={128}
          paddingInlineStart={48}
          paddingInlineEnd={48}
        >
          <Testimonial variant="default">
            <Testimonial.Quote>
              <b>GitHub helps us ensure that we have our security controls baked into our pipelines</b> all the way from
              the first line of code we&apos;re writing.
            </Testimonial.Quote>
            <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
            <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
          </Testimonial>
        </Box>
      </ThemeProvider>
    </Stack>
  ),
}
