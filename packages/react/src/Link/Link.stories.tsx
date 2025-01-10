import type {Meta, StoryObj} from '@storybook/react'

import {Link, LinkArrowDirections, LinkSizes, LinkVariants, type LinkProps} from '.'

const meta: Meta<LinkProps> = {
  title: 'Components/Link',
  component: Link,
  args: {
    children: 'Learn more',
    size: 'medium',
    arrowDirection: 'end',
    variant: 'default',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    arrowDirection: {
      options: LinkArrowDirections,
      control: {type: 'inline-radio'},
    },
    size: {
      options: LinkSizes,
      control: {type: 'inline-radio'},
    },
    variant: {
      options: LinkVariants,
      control: {type: 'inline-radio'},
    },
  },
}

export default meta

type Story = StoryObj<LinkProps>

export const Default: Story = {}
