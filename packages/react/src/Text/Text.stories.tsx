import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {Text, TextFontVariants, TextSizes, TextWeights} from '.'
import {Stack, Box, Grid, ThemeProvider} from '../'

import styles from './Text.stories.module.css'

const meta = {
  title: 'Components/Text',
  component: Text,
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: args => <Text {...args} />,
  args: {
    children: 'Text',
    size: '200',
  },
}

export const Playground: Story = {
  render: args => <Text {...args} />,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      options: TextSizes,
    },
    weight: {
      control: {
        type: 'radio',
      },
      options: TextWeights,
    },
  },
  args: {
    children: 'Text',
    size: '200',
  },
}

export const AntiAliasingOff: Story = {
  render: () => (
    <ThemeProvider colorMode="dark">
      <Box padding="spacious" backgroundColor="default">
        <Text as="p" size="200" weight="light">
          Anti aliasing is disabled for light text at 16px or smaller on a dark backgrounds.
        </Text>
        <Text as="p" size="200">
          Anti aliasing is enabled for medium text at 16px or larger on a dark backgrounds.
        </Text>
      </Box>
    </ThemeProvider>
  ),
  args: {
    size: '200',
    weight: 'light',
  },
}

export const Scale: Story = {
  render: args => (
    <>
      {TextSizes.map(size => (
        <Text key={size} size={size} {...args}>
          Text {size}
        </Text>
      ))}
    </>
  ),
  args: {
    as: 'div',
  },
}

export const OverrideWeight: Story = {
  render: () => (
    <>
      {TextWeights.map(weight => (
        <Text key={weight} as="p" weight={weight} size="500">
          {weight}
        </Text>
      ))}
    </>
  ),
}

export const OverrideWeightResponsive: Story = {
  render: () => (
    <Text
      as="p"
      weight={{
        narrow: 'extrabold',
        regular: 'semibold',
        wide: 'normal',
      }}
    >
      Responsive text weights
    </Text>
  ),
}

export const Composition: Story = {
  render: () => (
    <Text as="p" size="500" variant="muted" weight="medium">
      <Text as="strong" size="500" variant="default">
        Registration for our global enterprise event
      </Text>{' '}
      on improving collaboration, security practices, and developer productivity is right around the corner.
    </Text>
  ),
}

export const Alignment: Story = {
  render: () => (
    <Stack direction="vertical">
      <Text as="p">Default</Text>
      <Text as="p" align="start">
        Start
      </Text>
      <Text as="p" align="center">
        Center
      </Text>
      <Text as="p" align="end">
        End
      </Text>
    </Stack>
  ),
}

const TypeFixture = ({font}: {font: (typeof TextFontVariants)[number]}) => (
  <Box>
    <Grid>
      <Grid.Column
        span={{
          medium: 6,
        }}
      >
        <Text font={font} size="600" weight="light" className={styles['break-words']}>
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzåäö#%&~$()[]1234567890 !*"”'@!?;:&_
        </Text>
      </Grid.Column>
      <Grid.Column
        span={{
          medium: 6,
        }}
      >
        <Text font={font} size="600" weight="semibold" className={styles['break-words']}>
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzåäö#%&~$()[]1234567890 !*"”'@!?;:&_
        </Text>
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column
        span={{
          medium: 6,
        }}
      >
        <Box className={styles.separator} marginBlockEnd={{narrow: 24, wide: 64}} />
        <Text font={font} size="500" weight="light" className={styles['break-words']}>
          An organization&apos;s taste is defined by the process and style in which they make design decisions. What
          features belong in our product? Which prototype feels better? Do we need more iterations, or is this good
          enough? Are these questions answered by tools? By a process? By a person?
        </Text>
      </Grid.Column>
      <Grid.Column
        span={{
          medium: 6,
        }}
      >
        <Box className={styles.separator} marginBlockEnd={{narrow: 24, wide: 64}} />
        <Stack direction="vertical" padding="none">
          <Text as="p" font={font} size="100" weight="normal" className={styles['break-words']}>
            An organization&apos;s taste is defined by the process and style in which they make design decisions. What
            features belong in our product? Which prototype feels better? Do we need more iterations, or is this good
            enough? Are these questions answered by tools? By a process? By a person? Those answers are the essence of
            taste.{' '}
            <strong>
              In other words, an organization&apos;s taste is the way the organization makes design decisions.
            </strong>
          </Text>

          <Text as="p" font={font} size="100" weight="normal" className={styles['break-words']}>
            If the decisions are bold, opinionated, and cohesive — we tend to say the organization has taste. But if any
            of these are missing, we tend to label the entire organization as lacking taste.
          </Text>

          <Text as="p" font={font} size="100" weight="normal" className={styles['break-words']}>
            This is one of the biggest challenges a design leader faces. How do you ensure your team is capable of
            making bold, opinionated, and cohesive decisions together? It was certainly challenging me. With new
            employees came different tastes — often clashing against each other, resulting in unproductive debate and
            unclear results.
          </Text>
        </Stack>
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column>
        <Box className={styles.separator} marginBlockEnd={{narrow: 24, wide: 64}} />
        <Stack direction="vertical" padding="none" gap="spacious">
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="extralight">
              If a squirrel tells you to ship it, you must ship it.
            </Text>
            <Text>Weight: extralight</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="light">
              Code speaks louder than words.
            </Text>
            <Text>Weight: light</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="normal">
              Build for everyone, everywhere.
            </Text>
            <Text>Weight: normal</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="medium">
              Fast, flexible, open source and free.
            </Text>
            <Text>Weight: medium</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="semibold">
              Where the world builds software.
            </Text>
            <Text>Weight: semibold</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="bold">
              Demos, not memos.
            </Text>
            <Text>Weight: bold</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="extrabold">
              The next big thing is a lot of small things.
            </Text>
            <Text>Weight: extrabold</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="heavy">
              One font file, infinite possibilities.
            </Text>
            <Text>Weight: heavy</Text>
          </Stack>
        </Stack>
      </Grid.Column>
    </Grid>
  </Box>
)

export const MonaSans: Story = {
  render: () => {
    return <TypeFixture font="mona-sans" />
  },
}

export const HubotSans: Story = {
  render: () => {
    return <TypeFixture font="hubot-sans" />
  },
}

export const Monospace: Story = {
  render: () => {
    return <TypeFixture font="monospace" />
  },
}
