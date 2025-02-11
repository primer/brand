import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import {Text, TextFontVariants, TextSizes, TextWeights} from '.'
import {Stack, Box, Grid, ThemeProvider} from '../'

import styles from './Text.stories.module.css'

export default {
  title: 'Components/Text',
  component: Text,
} as Meta<typeof Text>

const Template: StoryFn<typeof Text> = args => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Text',
  size: '200',
}

export const Playground = Template.bind({})
Playground.argTypes = {
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
}
Playground.args = {
  children: 'Text',
  size: '200',
}

export const AntiAliasingOff = () => (
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
)
AntiAliasingOff.args = {
  size: '200',
  weight: 'light',
}

export const Scale: StoryFn<typeof Text> = args => (
  <>
    {TextSizes.map(size => (
      <Text key={size} size={size} {...args}>
        Text {size}
      </Text>
    ))}
  </>
)

Scale.args = {
  as: 'div',
}

export const OverrideWeight = () => (
  <>
    {TextWeights.map(weight => (
      <Text key={weight} as="p" weight={weight} size="500">
        {weight}
      </Text>
    ))}
  </>
)

export const OverrideWeightResponsive = () => (
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
)

export const Composition = () => (
  <Text as="p" size="500" variant="muted" weight="medium">
    <Text as="strong" size="500" variant="default">
      Registration for our global enterprise event
    </Text>{' '}
    on improving collaboration, security practices, and developer productivity is right around the corner.
  </Text>
)

export const Alignment = () => (
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
)

const TypeFixture = ({font}: {font: (typeof TextFontVariants)[number]}) => (
  <Stack direction="vertical" gap={{wide: 48}}>
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
            <Text>Weight: extralight, Stretch: condensed</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="medium">
              Fast, flexible, open source and free
            </Text>
            <Text>Weight: medium, Stretch: condensed</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="heavy">
              The next big thing is a lot of small things.
            </Text>
            <Text>Weight: heavy, Stretch: condensed</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="extralight">
              Demos, not memos.
            </Text>
            <Text>Weight: extralight, Stretch: condensed</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="medium">
              Where the world builds software.
            </Text>
            <Text>Weight: medium, Stretch: expanded</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Text font={font} size="700" weight="heavy">
              One font file, infinite possibilities.
            </Text>
            <Text>Weight: heavy, Stretch: expanded</Text>
          </Stack>
        </Stack>
      </Grid.Column>
    </Grid>
  </Stack>
)

export const MonaSans: StoryFn<typeof Text> = () => {
  return <TypeFixture font="mona-sans" />
}

export const HubotSans: StoryFn<typeof Text> = () => {
  return <TypeFixture font="hubot-sans" />
}
