import React from 'react'
import {Meta, StoryFn} from '@storybook/react'
import {Icon, iconColors} from '.'
import {CopilotIcon, RocketIcon, ZapIcon} from '@primer/octicons-react'
import {Heading, Stack} from '../'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon/Features',
  component: Icon,
}

export default meta

export const WithBackground: StoryFn<typeof Icon> = () => <Icon hasBackground icon={ZapIcon} color="lemon" />

export const Colors: StoryFn<typeof Icon> = () => (
  <Stack direction="vertical" gap={16}>
    <Stack direction="horizontal" gap={16} flexWrap="wrap" padding="none">
      {iconColors.map(color => (
        <Icon key={color} icon={RocketIcon} color={color} hasBackground />
      ))}
    </Stack>
    <Stack direction="horizontal" gap={16} flexWrap="wrap" padding="none">
      {iconColors.map(color => (
        <Icon key={color} icon={RocketIcon} color={color} size="large" />
      ))}
    </Stack>
  </Stack>
)

export const Sizes: StoryFn<typeof Icon> = () => (
  <Stack direction="vertical" gap={48} padding="none">
    <Stack direction="vertical" gap={16} padding="none">
      <Heading size="5" as="h2">
        Small
      </Heading>
      <Stack direction="horizontal" gap={16} flexWrap="wrap" padding="none">
        {iconColors.map(color => (
          <Icon key={color} icon={CopilotIcon} color={color} size="small" />
        ))}
      </Stack>
    </Stack>
    <Stack direction="vertical" gap={16} padding="none">
      <Heading size="5" as="h2">
        Medium
      </Heading>
      <Stack direction="horizontal" gap={16} flexWrap="wrap" padding="none">
        {iconColors.map(color => (
          <Icon key={color} icon={CopilotIcon} color={color} size="medium" />
        ))}
      </Stack>
    </Stack>
    <Stack direction="vertical" gap={16} padding="none">
      <Heading size="5" as="h2">
        Large
      </Heading>
      <Stack direction="horizontal" gap={16} flexWrap="wrap" padding="none">
        {iconColors.map(color => (
          <Icon key={color} icon={CopilotIcon} color={color} size="large" />
        ))}
      </Stack>
    </Stack>
  </Stack>
)
