import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Stack} from '.'

export default {
  title: 'Components/Stack',
  component: Stack,
  args: {
    direction: {
      narrow: 'vertical',
      regular: 'vertical',
      wide: 'horizontal',
    },
    gap: {
      narrow: 'condensed',
      regular: 'normal',
      wide: 'spacious',
    },
    padding: {
      narrow: 'condensed',
      regular: 'normal',
      wide: 'spacious',
    },
    alignItems: {
      narrow: 'flex-start',
      regular: 'flex-start',
      wide: 'center',
    },
    justifyContent: {
      narrow: 'space-between',
      regular: 'space-around',
      wide: 'space-evenly',
    },
  },
} as ComponentMeta<typeof Stack>

const Template: ComponentStory<typeof Stack> = args => (
  <Stack {...args} style={{height: '100vh'}}>
    <div>
      <img
        src="https://via.placeholder.com/300x150/D0D7DE/D0D7DE.png"
        alt="placeholder with gray background and no foreground text"
      />
    </div>
    <div>
      <img
        src="https://via.placeholder.com/300x150/D0D7DE/D0D7DE.png"
        alt="placeholder with gray background and no foreground text"
      />
    </div>
    <div>
      <img
        src="https://via.placeholder.com/300x150/D0D7DE/D0D7DE.png"
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
    wide: 'spacious',
  },
  padding: {
    narrow: 'condensed',
    regular: 'normal',
    wide: 'spacious',
  },
}

export const ResponsiveBaseScale = Template.bind({})
ResponsiveBaseScale.args = {
  gap: {
    narrow: 8,
    regular: 12,
    wide: 16,
  },
  padding: {
    narrow: 24,
    regular: 40,
    wide: 80,
  },
}
