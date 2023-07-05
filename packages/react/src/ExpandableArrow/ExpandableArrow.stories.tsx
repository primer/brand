import {Meta, StoryFn} from '@storybook/react'
import React from 'react'
import {ExpandableArrow} from '.'

export default {
  title: 'Components/ExpandableArrow',
  component: ExpandableArrow,
} as Meta<typeof ExpandableArrow>

const Template: StoryFn<typeof ExpandableArrow> = args => <ExpandableArrow {...args} />

export const Default = Template.bind({})
Default.args = {
  expanded: false,
}

export const Expanded = Template.bind({})
Expanded.args = {
  expanded: true,
}

export const ExpandOnHover = () => {
  const [isHovered, setIsHovered] = React.useState(false)
  return (
    <div style={{cursor: 'pointer'}} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <ExpandableArrow expanded={isHovered} />
    </div>
  )
}
