import React from 'react'
import {Meta} from '@storybook/react'

import {Statistic} from '.'
import {AnimationProvider, Box, Grid, Stack, Testimonial, Text} from '../'
import monaAvatar from '../fixtures/images/avatar-mona.png'

export default {
  title: 'Components/Statistic/Features',
  component: Statistic,
  args: {
    heading: '100M+',
    description: 'Developers',
  },
} as Meta<typeof Statistic>

export const BoxedVariant = args => (
  <Statistic variant="boxed">
    <Statistic.Heading>{args.heading}</Statistic.Heading>
    <Statistic.Description>{args.description}</Statistic.Description>
  </Statistic>
)

export const NoDescription = args => (
  <Statistic>
    <Statistic.Heading>{args.heading}</Statistic.Heading>
  </Statistic>
)

export const Sizes = args => (
  <Stack direction="vertical" gap="spacious" padding="none">
    <Statistic size="small">
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>{args.description}</Statistic.Description>
    </Statistic>
    <Statistic size="medium">
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>{args.description}</Statistic.Description>
    </Statistic>
    <Statistic size="large">
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>{args.description}</Statistic.Description>
    </Statistic>
  </Stack>
)

export const CustomHeadingSize = () => (
  <Stack direction="vertical" gap="spacious" padding="none">
    <Statistic size="small">
      <Statistic.Heading size="100">Smallest size</Statistic.Heading>
      <Statistic.Description>w/ size 100 text override</Statistic.Description>
    </Statistic>
  </Stack>
)

export const Padding = args => (
  <Stack direction="vertical" gap="spacious" padding="none">
    <Statistic padding="none">
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>padding: none</Statistic.Description>
    </Statistic>
    <Statistic padding="condensed">
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>padding: condensed</Statistic.Description>
    </Statistic>
    <Statistic padding="normal">
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>padding: normal</Statistic.Description>
    </Statistic>
    <Statistic padding="spacious">
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>padding: spacious</Statistic.Description>
    </Statistic>
    <Statistic
      padding={{
        narrow: 'condensed',
        regular: 'normal',
        wide: 'spacious',
      }}
    >
      <Statistic.Heading>{args.heading}</Statistic.Heading>
      <Statistic.Description>padding: responsive</Statistic.Description>
    </Statistic>
  </Stack>
)
Padding.parameters = {
  layout: 'fullscreen',
}

export const AccentDescription = args => (
  <Statistic>
    <Statistic.Heading>{args.heading}</Statistic.Heading>
    <Statistic.Description variant="accent">{args.description}</Statistic.Description>
  </Statistic>
)

export const CustomFootnote = () => (
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
)

export const CustomIntro = () => (
  <Grid>
    <Grid.Column span={{medium: 6}}>
      <Statistic
        padding="spacious"
        variant="boxed"
        leadingComponent={() => (
          <Box marginBlockEnd={112}>
            <Testimonial>
              <Testimonial.Quote>
                GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the
                first line of code we&apos;re writing.
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
)

export const Animations = () => (
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
)
