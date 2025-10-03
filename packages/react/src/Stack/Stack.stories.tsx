import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Stack} from '.'
import placeholderImage from '../fixtures/images/placeholder.png'

const meta = {
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
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof Stack>

const Template: Story = {
  render: args => (
    <Stack {...args} style={{height: '100vh'}}>
      <div>
        <img
          src={placeholderImage}
          alt="placeholder with gray background and no foreground text"
          width={300}
          height={150}
        />
      </div>
      <div>
        <img
          src={placeholderImage}
          alt="placeholder with gray background and no foreground text"
          width={300}
          height={150}
        />
      </div>
      <div>
        <img
          src={placeholderImage}
          alt="placeholder with gray background and no foreground text"
          width={300}
          height={150}
        />
      </div>
    </Stack>
  ),
}

export const Playground: Story = {
  ...Template,
}

export const Responsive: Story = {
  ...Template,
  args: {
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
  },
}

export const ResponsiveBaseScale: Story = {
  ...Template,
  args: {
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
  },
}
