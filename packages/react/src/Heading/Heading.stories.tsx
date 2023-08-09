import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Heading, HeadingTags, HeadingWeights, HeadingLetterSpacing, HeadingStretch, HeadingSizes} from '.'
import {Stack} from '../Stack'

export default {
  title: 'Components/Heading',
  component: Heading,
} as Meta<typeof Heading>

const Template: StoryFn<typeof Heading> = args => <Heading {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Heading',
  as: 'h1',
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
}
Playground.args = {
  children: 'Heading',
}

export const Scale: StoryFn<typeof Heading> = () => (
  <>
    {HeadingTags.map(tag => (
      <Heading key={tag} as={tag}>
        Heading {tag}
      </Heading>
    ))}
  </>
)

export const OverrideSize = Template.bind({})
OverrideSize.args = {
  children: 'This h2 will appear visually identical to a h4',
  as: 'h2',
  size: '4',
}

export const OverrideWeight = () => (
  <>
    {HeadingWeights.map(weight => (
      <Heading key={weight} as="h3" weight={weight}>
        {weight}
      </Heading>
    ))}
  </>
)

export const OverrideWeightResponsive = () => (
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
)

export const OverrideStretch = () => (
  <>
    {HeadingStretch.map(stretch => (
      <Heading key={stretch} as="h3" stretch={stretch}>
        {stretch}
      </Heading>
    ))}
  </>
)

export const OverrideStretchResponsive = () => (
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
)

export const OverrideLetterSpacing = () => (
  <>
    {HeadingLetterSpacing.map(spacing => (
      <Heading key={spacing} as="h3" letterSpacing={spacing}>
        {spacing}
      </Heading>
    ))}
  </>
)

export const UpdatedScale = () => (
  <Stack direction="vertical">
    <Heading as="h1" size="display">
      Display
    </Heading>
    <Heading as="h1" size="1">
      Heading 1
    </Heading>
    <Heading as="h2" size="2">
      Heading 2
    </Heading>
    <Heading as="h3" size="3">
      Heading 3
    </Heading>
    <Heading as="h4" size="4">
      Heading 4
    </Heading>
    <Heading as="h4" size="4" weight="medium">
      Heading 4 medium
    </Heading>
    <Heading as="h5" size="5">
      Heading 5
    </Heading>
    <Heading as="h5" size="5" weight="medium">
      Heading 5 medium
    </Heading>
    <Heading as="h6" size="6">
      Heading 6
    </Heading>
    <Heading as="h6" size="subhead-large">
      Subhead large
    </Heading>
    <Heading as="h6" size="subhead-medium">
      Subhead medium
    </Heading>
  </Stack>
)
