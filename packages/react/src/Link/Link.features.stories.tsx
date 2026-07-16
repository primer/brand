import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Link, type LinkProps} from '.'
import {Stack} from '../Stack'
import baseMeta from './Link.stories'

const meta: Meta<LinkProps> = {...baseMeta, title: 'Components/Link/Features'}
export default meta

type Story = StoryObj<LinkProps>

export const Sizes: Story = {
  render: () => (
    <Stack direction="vertical" alignItems="flex-start" padding="none">
      <Link href="#" size="small">
        Small size
      </Link>
      <Link href="#" size="medium">
        Medium size
      </Link>
      <Link href="#" size="large">
        Large size
      </Link>
    </Stack>
  ),
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
