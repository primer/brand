import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Icon, iconColors, namedIconSizes, numericIconSizes} from '.'
import {CopilotIcon, RocketIcon, ZapIcon} from '@primer/octicons-react'
import {Heading, Stack} from '../'

const meta = {
  title: 'Components/Icon/Features',
  component: Icon,
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof Icon>

export const WithBackground: Story = {
  render: () => <Icon hasBackground icon={ZapIcon} color="lemon" />,
}

export const Colors: Story = {
  render: () => (
    <Stack direction="vertical" gap={16}>
      <Stack direction="horizontal" gap={16} flexWrap="wrap" padding="none">
        {iconColors.map(color => (
          <Icon key={color} icon={RocketIcon} color={color} />
        ))}
      </Stack>
      <Stack direction="horizontal" gap={16} flexWrap="wrap" padding="none">
        {iconColors.map(color => (
          <Icon key={color} icon={RocketIcon} color={color} hasBackground />
        ))}
      </Stack>
    </Stack>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack direction="vertical" gap={48} padding="none">
      <Stack direction="vertical" gap={16} padding="none">
        <Heading size="5" as="h2">
          Named sizes
        </Heading>
        <Stack direction="horizontal" gap={16} flexWrap="wrap" padding="none">
          {namedIconSizes.map(size => (
            <Icon key={size} icon={CopilotIcon} size={size} color="green" hasBackground />
          ))}
        </Stack>
      </Stack>
      <Stack direction="vertical" gap={16} padding="none">
        <Heading size="5" as="h2">
          Numeric sizes
        </Heading>
        <Stack direction="horizontal" gap={16} flexWrap="wrap" padding="none">
          {numericIconSizes.map(size => (
            <Icon key={size} icon={CopilotIcon} size={size} color="green" hasBackground />
          ))}
        </Stack>
      </Stack>
    </Stack>
  ),
}

export const AcceptsJSX: Story = {
  render: () => <Icon icon={<CopilotIcon />} color="green" hasBackground />,
}
