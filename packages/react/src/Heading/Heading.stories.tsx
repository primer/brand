import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Heading, HeadingTags} from '.'

export default {
  title: 'Components/Heading',
  component: Heading
} as ComponentMeta<typeof Heading>

const Template: ComponentStory<typeof Heading> = args => <Heading {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Heading',
  as: 'h1'
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
  size: '4'
}
