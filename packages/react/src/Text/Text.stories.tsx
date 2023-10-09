import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import {Text, TextFontVariants, TextSizes, TextWeights} from '.'
import {Stack, Box, Grid} from '../'

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
        <Text font={font} size="400" weight="light" className={styles['break-words']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis dapibus erat, suscipit scelerisque enim.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc suscipit elit a
          est efficitur scelerisque. Nam euismod mi a dapibus euismod.
        </Text>
      </Grid.Column>
      <Grid.Column
        span={{
          medium: 6,
        }}
      >
        <Box className={styles.separator} marginBlockEnd={{narrow: 24, wide: 64}} />
        <Stack direction="vertical" padding="none">
          <Text as="p" font={font} size="200" weight="normal" className={styles['break-words']}>
            Mauris dignissim, magna ac venenatis gravida, dolor nisi tincidunt velit, eu dignissim lacus magna sit amet
            sapien. Sed pulvinar tempor cursus. Fusce aliquet commodo diam, maximus viverra urna aliquet ac. Maecenas
            bibendum venenatis vulputate.
          </Text>

          <Text as="p" font={font} size="200" weight="normal" className={styles['break-words']}>
            Duis sed suscipit turpis, tincidunt mollis mauris. Donec ac massa nibh. Donec interdum gravida interdum.
            Nullam id blandit sem. <strong>Duis rutrum erat ante, vitae fringilla augue viverra et.</strong> Sed vel
            efficitur leo, ac congue est.
          </Text>

          <Text as="p" font={font} size="200" weight="normal" className={styles['break-words']}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu mi, aliquet nec bibendum quis,
            sollicitudin at enim.
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
            <Text font={font} size="700" weight="black">
              The next big thing is a lot of small things.
            </Text>
            <Text>Weight: black, Stretch: condensed</Text>
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
            <Text font={font} size="700" weight="black">
              One font file, infinite possibilities.
            </Text>
            <Text>Weight: black, Stretch: expanded</Text>
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
