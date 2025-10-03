import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Stack, Grid, Text, Box} from '../'
import {
  Heading,
  HeadingTags,
  HeadingWeights,
  HeadingLetterSpacing,
  HeadingStretch,
  HeadingSizes,
  HeadingFontVariants,
} from '.'

import styles from './Heading.stories.module.css'

const meta = {
  title: 'Components/Heading',
  component: Heading,
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof Heading>

const tagMap = {
  display: 'h1',
  '1': 'h1',
  '2': 'h2',
  '3': 'h3',
  '4': 'h4',
  '5': 'h5',
  '6': 'h5',
  'subhead-large': 'h6',
  'subhead-medium': 'h6',
}

export const Default: Story = {
  render: args => <Heading {...args} />,
  args: {
    children: 'Heading',
    as: 'h1',
  },
}

export const Playground: Story = {
  render: args => <Heading {...args} />,
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
      options: HeadingSizes,
    },
    weight: {
      control: {
        type: 'radio',
      },
      options: HeadingWeights,
    },
    stretch: {
      control: {
        type: 'radio',
      },
      options: HeadingStretch,
    },
    letterSpacing: {
      control: {
        type: 'radio',
      },
      options: HeadingLetterSpacing,
    },
    font: {
      control: {
        type: 'radio',
      },
      options: HeadingFontVariants,
    },
  },
  args: {
    children: 'Heading',
  },
}

export const Scale: Story = {
  render: () => {
    return (
      <>
        {HeadingSizes.map(size => (
          <Heading key={size} size={size} as={tagMap[size] as (typeof HeadingTags)[number]}>
            Heading ({size})
          </Heading>
        ))}
      </>
    )
  },
  name: 'Scale (sizes)',
}

export const Levels: Story = {
  render: () => {
    return (
      <>
        {HeadingTags.map(tag => (
          <Heading key={tag} as={tag}>
            Heading ({tag})
          </Heading>
        ))}
      </>
    )
  },
}

export const OverrideSize: Story = {
  render: args => <Heading {...args} />,
  args: {
    children: 'This h2 will appear visually identical to a h4',
    as: 'h2',
    size: '4',
  },
}

export const OverrideWeight: Story = {
  render: () => (
    <>
      {HeadingWeights.map(weight => (
        <Heading key={weight} as="h3" weight={weight}>
          {weight}
        </Heading>
      ))}
    </>
  ),
}

export const OverrideWeightResponsive: Story = {
  render: () => (
    <Heading
      as="h1"
      weight={{
        narrow: 'extrabold',
        regular: 'semibold',
        wide: 'normal',
      }}
    >
      Responsive heading weights
    </Heading>
  ),
}

export const OverrideStretch: Story = {
  render: () => (
    <>
      {HeadingStretch.map(stretch => (
        <Heading key={stretch} as="h3" stretch={stretch}>
          {stretch}
        </Heading>
      ))}
    </>
  ),
}

export const OverrideStretchResponsive: Story = {
  render: () => (
    <Heading
      as="h1"
      stretch={{
        narrow: 'condensed',
        regular: 'normal',
        wide: 'expanded',
      }}
    >
      Responsive heading stretch
    </Heading>
  ),
}

export const OverrideLetterSpacing: Story = {
  render: () => (
    <>
      {HeadingLetterSpacing.map(spacing => (
        <Heading key={spacing} as="h3" letterSpacing={spacing}>
          {spacing}
        </Heading>
      ))}
    </>
  ),
}

const TypeFixture = ({font}: {font: (typeof HeadingFontVariants)[number]}) => (
  <Stack direction="vertical" padding="none" gap="spacious">
    <Grid>
      <Grid.Column
        span={{
          medium: 6,
        }}
      >
        <Heading font={font} size="3" weight="light" letterSpacing="none" className={styles['break-words']}>
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzåäö#%&~$()[]1234567890 !*"”'@!?;:&_
        </Heading>
      </Grid.Column>
      <Grid.Column
        span={{
          medium: 6,
        }}
      >
        <Heading font={font} size="3" weight="semibold" letterSpacing="none" className={styles['break-words']}>
          {/*eslint-disable-next-line react/no-unescaped-entities*/}
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzåäö#%&~$()[]1234567890 !*"”'@!?;:&_
        </Heading>
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column>
        <Box className={styles.separator} marginBlockEnd="spacious" />
        <Stack direction="vertical" padding="none" gap="spacious">
          <Stack direction="vertical" padding="none" gap="condensed">
            <Heading font={font} size="1" stretch="condensed" weight="extralight" letterSpacing="none">
              If a squirrel tells you to ship it, you must ship it.
            </Heading>
            <Text>Weight: extralight, Stretch: condensed</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Heading font={font} size="1" stretch="condensed" weight="medium" letterSpacing="none">
              Fast, flexible, open source and free
            </Heading>
            <Text>Weight: medium, Stretch: condensed</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Heading font={font} size="1" stretch="condensed" weight="heavy" letterSpacing="none">
              The next big thing is a lot of small things.
            </Heading>
            <Text>Weight: heavy, Stretch: condensed</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Heading font={font} size="1" stretch="condensed" weight="extralight" letterSpacing="none">
              Demos, not memos.
            </Heading>
            <Text>Weight: extralight, Stretch: condensed</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Heading font={font} size="1" stretch="expanded" weight="medium" letterSpacing="none">
              Where the world builds software.
            </Heading>
            <Text>Weight: medium, Stretch: expanded</Text>
          </Stack>
          <Stack direction="vertical" padding="none" gap="condensed">
            <Heading font={font} size="1" stretch="expanded" weight="heavy" letterSpacing="none">
              One font file, infinite possibilities.
            </Heading>
            <Text>Weight: heavy, Stretch: expanded</Text>
          </Stack>
        </Stack>
      </Grid.Column>
    </Grid>
  </Stack>
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
