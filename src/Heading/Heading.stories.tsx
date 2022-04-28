import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Heading, HeadingSizes} from '.'

export default {
  title: 'Components/Heading',
  component: Heading
} as ComponentMeta<typeof Heading>

const Template: ComponentStory<typeof Heading> = args => <Heading {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Heading',
  size: '1000'
}

export const Scale: ComponentStory<typeof Heading> = () => (
  <>
    {HeadingSizes.map(size => (
      <Heading key={size} size={size}>
        Heading {size}
      </Heading>
    ))}
  </>
)
