import type {Meta, StoryObj} from '@storybook/react'

import {type LinkProps} from '.'
import baseMeta from './Link.stories'

const meta: Meta<LinkProps> = {...baseMeta, title: 'Components/Link/Features'}
export default meta

type Story = StoryObj<LinkProps>

export const Large: Story = {
  args: {
    size: 'large',
    href: '#',
    children: 'Large size',
  },
}

export const ArrowStart: Story = {
  args: {
    children: 'Back to schedule',
    arrowDirection: 'start',
  },
}

export const NoArrow: Story = {
  args: {
    arrowDirection: 'none',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Accent variant',
  },
}

export const ExternalLink: Story = {
  args: {
    isExternal: true,
    children: 'External link',
  },
}
