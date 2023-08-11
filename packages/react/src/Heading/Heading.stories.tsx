import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Heading, HeadingTags, HeadingWeights, HeadingLetterSpacing, HeadingStretch, HeadingSizes} from '.'

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

export const Scale: StoryFn<typeof Heading> = () => {
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

  return (
    <>
      {HeadingSizes.map(size => (
        <Heading key={size} size={size} as={tagMap[size] as (typeof HeadingTags)[number]}>
          Heading ({size})
        </Heading>
      ))}
    </>
  )
}

Scale.storyName = 'Scale (sizes)'

export const Levels: StoryFn<typeof Heading> = () => {
  return (
    <>
      {HeadingTags.map(tag => (
        <Heading key={tag} as={tag}>
          Heading ({tag})
        </Heading>
      ))}
    </>
  )
}

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
