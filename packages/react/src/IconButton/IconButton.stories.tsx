import type {Meta, StoryObj} from '@storybook/react'
import {HeartIcon, SearchIcon, XIcon} from '@primer/octicons-react'

import {defaultIconButtonSize, defaultIconButtonVariant, IconButton, IconButtonSizes, IconButtonVariants} from '.'
import {TooltipDirections} from '../Tooltip'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: HeartIcon,
    'aria-label': 'Favorite',
    variant: defaultIconButtonVariant,
    size: defaultIconButtonSize,
    disabled: false,
    inactive: false,
    loading: false,
    rounded: false,
    tooltipDirection: 's',
  },
  argTypes: {
    icon: {
      control: {type: 'select'},
      options: ['Heart', 'Search', 'Close'],
      mapping: {
        Heart: HeartIcon,
        Search: SearchIcon,
        Close: XIcon,
      },
    },
    variant: {
      control: {type: 'inline-radio'},
      options: [...IconButtonVariants],
    },
    size: {
      control: {type: 'inline-radio'},
      options: [...IconButtonSizes],
    },
    tooltipDirection: {
      control: {type: 'select'},
      options: [...TooltipDirections],
    },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: args => (
    <IconButton
      icon={args.icon}
      aria-label={args['aria-label']}
      variant={args.variant}
      size={args.size}
      disabled={args.disabled}
      inactive={args.inactive}
      loading={args.loading}
      rounded={args.rounded}
      tooltipDirection={args.tooltipDirection}
    />
  ),
}

export const Default: Story = {
  render: () => <IconButton icon={HeartIcon} aria-label="Favorite" />,
}
