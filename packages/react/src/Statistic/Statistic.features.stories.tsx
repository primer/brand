import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Statistic} from '.'
import {AnimationProvider, Box, Grid, InlineLink, Stack, Testimonial, Text} from '../'
import monaAvatar from '../fixtures/images/avatar-mona.png'

const meta = {
  title: 'Components/Statistic/Features',
  component: Statistic,
} satisfies Meta<typeof Statistic>

export default meta
type Story = StoryObj<typeof Statistic>

export const BoxedVariant: Story = {
  render: () => (
    <Statistic variant="boxed">
      <Statistic.Heading>100M+</Statistic.Heading>
      <Statistic.Description>Developers</Statistic.Description>
    </Statistic>
  ),
}

export const NoDescription: Story = {
  render: () => (
    <Statistic>
      <Statistic.Heading>100M+</Statistic.Heading>
    </Statistic>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack direction="vertical" gap="spacious" padding="none">
      <Statistic size="small">
        <Statistic.Heading>100M+</Statistic.Heading>
        <Statistic.Description>Developers</Statistic.Description>
      </Statistic>
      <Statistic size="medium">
        <Statistic.Heading>100M+</Statistic.Heading>
        <Statistic.Description>Developers</Statistic.Description>
      </Statistic>
      <Statistic size="large">
        <Statistic.Heading>100M+</Statistic.Heading>
        <Statistic.Description>Developers</Statistic.Description>
      </Statistic>
    </Stack>
  ),
}

export const CustomHeadingSize: Story = {
  render: () => (
    <Stack direction="vertical" gap="spacious" padding="none">
      <Statistic size="small">
        <Statistic.Heading size="100">Smallest size</Statistic.Heading>
        <Statistic.Description>w/ size 100 text override</Statistic.Description>
      </Statistic>
    </Stack>
  ),
}

export const Padding: Story = {
  render: () => (
    <Stack direction="vertical" gap="spacious" padding="none">
      <Statistic padding="none">
        <Statistic.Heading>100M+</Statistic.Heading>
        <Statistic.Description>padding: none</Statistic.Description>
      </Statistic>
      <Statistic padding="condensed">
        <Statistic.Heading>100M+</Statistic.Heading>
        <Statistic.Description>padding: condensed</Statistic.Description>
      </Statistic>
      <Statistic padding="normal">
        <Statistic.Heading>100M+</Statistic.Heading>
        <Statistic.Description>padding: normal</Statistic.Description>
      </Statistic>
      <Statistic padding="spacious">
        <Statistic.Heading>100M+</Statistic.Heading>
        <Statistic.Description>padding: spacious</Statistic.Description>
      </Statistic>
      <Statistic
        padding={{
          narrow: 'condensed',
          regular: 'normal',
          wide: 'spacious',
        }}
      >
        <Statistic.Heading>100M+</Statistic.Heading>
        <Statistic.Description>padding: responsive</Statistic.Description>
      </Statistic>
    </Stack>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const AccentDescription: Story = {
  render: () => (
    <Statistic>
      <Statistic.Heading>100M+</Statistic.Heading>
      <Statistic.Description variant="accent">Developers</Statistic.Description>
    </Statistic>
  ),
}

export const CustomFootnote: Story = {
  render: () => (
    <Statistic
      variant="boxed"
      trailingComponent={() => (
        <Box marginBlockStart={24}>
          <Text as="p" variant="muted" size="100">
            Available for business since Dec 2022
          </Text>
        </Box>
      )}
    >
      <Statistic.Heading>1 in 3</Statistic.Heading>
      <Statistic.Description size="400">Fortune 500 companies use GitHub Copilot</Statistic.Description>
    </Statistic>
  ),
}

export const CustomIntro: Story = {
  render: () => (
    <Grid>
      <Grid.Column span={{medium: 6}}>
        <Statistic
          padding="spacious"
          variant="boxed"
          leadingComponent={() => (
            <Box marginBlockEnd={112}>
              <Testimonial>
                <Testimonial.Quote>
                  GitHub helps us ensure that we have our security controls baked into our pipelines all the way from
                  the first line of code we&apos;re writing.
                </Testimonial.Quote>
                <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
                <Testimonial.Avatar src={monaAvatar} alt="Circular avatar from David Ross's GitHub profile" />
              </Testimonial>
            </Box>
          )}
        >
          <Statistic.Heading>1 in 3</Statistic.Heading>
          <Statistic.Description>Fortune 500 companies use GitHub Copilot</Statistic.Description>
        </Statistic>
      </Grid.Column>
    </Grid>
  ),
}

export const Animations: Story = {
  render: () => (
    <AnimationProvider>
      <Stack direction="horizontal">
        <Statistic variant="boxed" animate="scale-in-right">
          <Statistic.Heading>$2M+</Statistic.Heading>
          <Statistic.Description>Given back to our maintainers</Statistic.Description>
        </Statistic>
        <Statistic variant="boxed" animate="scale-in-right">
          <Statistic.Heading>3.5K+</Statistic.Heading>
          <Statistic.Description>Companies actively sponsoring</Statistic.Description>
        </Statistic>
        <Statistic variant="boxed" animate="scale-in-right">
          <Statistic.Heading>30K+</Statistic.Heading>
          <Statistic.Description>Sponsored maintainers and projects</Statistic.Description>
        </Statistic>
      </Stack>
    </AnimationProvider>
  ),
}

export const WithFootnote: Story = {
  render: () => (
    <Stack direction="vertical" gap="spacious">
      <Stack direction="horizontal" gap="spacious" padding="none">
        <Statistic variant="boxed" size="small">
          <Statistic.Heading>
            100M+{' '}
            <sup>
              <InlineLink href="#link-to-footnote-1">1</InlineLink>
            </sup>
          </Statistic.Heading>
          <Statistic.Description>Developers</Statistic.Description>
        </Statistic>
        <Statistic variant="boxed" size="medium">
          <Statistic.Heading>
            100M+{' '}
            <sup>
              <InlineLink href="#link-to-footnote-1">2</InlineLink>
            </sup>
          </Statistic.Heading>
          <Statistic.Description>Developers</Statistic.Description>
        </Statistic>
        <Statistic variant="boxed" size="large">
          <Statistic.Heading>
            100M+{' '}
            <sup>
              <InlineLink href="#link-to-footnote-1">3</InlineLink>
            </sup>
          </Statistic.Heading>
          <Statistic.Description>Developers</Statistic.Description>
        </Statistic>
      </Stack>
      <Stack direction="horizontal" gap="spacious" padding="none">
        <Statistic variant="boxed" size="small">
          <Statistic.Heading>100M+</Statistic.Heading>
          <Statistic.Description>
            Developers{' '}
            <sup>
              <InlineLink href="#link-to-footnote-1">4</InlineLink>
            </sup>
          </Statistic.Description>
        </Statistic>
        <Statistic variant="boxed" size="medium">
          <Statistic.Heading>100M+</Statistic.Heading>
          <Statistic.Description>
            Developers{' '}
            <sup>
              <InlineLink href="#link-to-footnote-1">5</InlineLink>
            </sup>
          </Statistic.Description>
        </Statistic>
        <Statistic variant="boxed" size="large">
          <Statistic.Heading>100M+</Statistic.Heading>
          <Statistic.Description>
            Developers{' '}
            <sup>
              <InlineLink href="#link-to-footnote-1">6</InlineLink>
            </sup>
          </Statistic.Description>
        </Statistic>
      </Stack>
    </Stack>
  ),
}
