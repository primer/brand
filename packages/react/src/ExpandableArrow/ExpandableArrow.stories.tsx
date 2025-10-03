import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {ExpandableArrow} from '.'

const meta = {
  title: 'Components/ExpandableArrow',
  component: ExpandableArrow,
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

export const ExpandOnHover: Story = {
  render: () => {
    const [isHovered, setIsHovered] = React.useState(false)
    return (
      <div
        style={{cursor: 'pointer'}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ExpandableArrow expanded={isHovered} />
      </div>
    )
  },
}
