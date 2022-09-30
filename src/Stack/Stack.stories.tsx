import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Stack} from '.'

export default {
  title: 'Components/Stack',
  component: Stack,
  argTypes: {
    alignItems: {
      options: ['center', 'flex-start', 'flex-end'],
      control: {type: 'radio'}
    },
    justifyContent: {
      options: ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      control: {type: 'radio'}
    }
  },
  args: {
    direction: {
      narrow: 'vertical',
      regular: 'vertical',
      wide: 'horizontal'
    },
    gap: {
      narrow: 'condensed',
      regular: 'normal',
      wide: 'spacious'
    },
    padding: {
      narrow: 'condensed',
      regular: 'normal',
      wide: 'spacious'
    }
  }
} as ComponentMeta<typeof Stack>

const Template: ComponentStory<typeof Stack> = args => (
  <Stack {...args} style={{height: '100vh'}}>
    <div>
      <img
        src="https://via.placeholder.com/300x150/f5f5f5/f5f5f5.png"
        alt="placeholder with gray background and no foreground text"
      />
    </div>
    <div>
      <img
        src="https://via.placeholder.com/300x150/f5f5f5/f5f5f5.png"
        alt="placeholder with gray background and no foreground text"
      />
    </div>
    <div>
      <img
        src="https://via.placeholder.com/300x150/f5f5f5/f5f5f5.png"
        alt="placeholder with gray background and no foreground text"
      />
    </div>
  </Stack>
)

export const Playground = Template.bind({})

export const Responsive = Template.bind({})
Responsive.args = {
  gap: {
    narrow: 'spacious',
    regular: 'spacious',
    wide: 'spacious'
  },
  padding: {
    narrow: 'condensed',
    regular: 'normal',
    wide: 'spacious'
  }
}
