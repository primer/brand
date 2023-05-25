import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Heading, HeadingTags, HeadingWeights, HeadingLetterSpacing, HeadingStretch} from '.'

export default {
  title: 'Components/Heading',
  component: Heading,
} as ComponentMeta<typeof Heading>

const Template: ComponentStory<typeof Heading> = args => <Heading {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Heading',
  as: 'h1',
}

export const Scale: ComponentStory<typeof Heading> = () => (
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
