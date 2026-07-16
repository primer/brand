import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {Text} from '../Text'
import {ExpandableArrow} from '.'

const meta = {
  title: 'Components/ExpandableArrow',
  component: ExpandableArrow,
  decorators: [
    Story => (
      <Text>
        <Story />
      </Text>
    ),
  ],
} satisfies Meta<typeof ExpandableArrow>

export default meta
type Story = StoryObj<typeof ExpandableArrow>

export const Default: Story = {
  render: args => <ExpandableArrow {...args} />,
  args: {
    expanded: false,
  },
}

export const Expanded: Story = {
  render: args => <ExpandableArrow {...args} />,
  args: {
    expanded: true,
  },
}

const ExpandOnHoverStory = () => {
  const [isHovered, setIsHovered] = React.useState(false)
  return (
    <span
      style={{display: 'block', cursor: 'pointer'}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ExpandableArrow expanded={isHovered} />
    </span>
  )
}

export const ExpandOnHover: Story = {
  render: ExpandOnHoverStory,
}
