import React from 'react'
import type {Meta} from '@storybook/react'
import {Label} from '.'
import {Box, Stack, Text} from '../'
import {CopilotIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Label/Features',
  component: Label,
} as Meta<typeof Label>

export const Sizes = () => (
  <Stack direction="horizontal" alignItems="center" flexWrap="wrap">
    <Text>Issue #123</Text>
    <Label size="small">Bug</Label>
    <Label size="medium">Needs review</Label>
    <Label size="large">Blocked</Label>
  </Stack>
)

export const Color = () => (
  <Stack alignItems="flex-start" direction="horizontal" flexWrap="wrap">
    <Text>Issue #123</Text>
    <Label>Default</Label>
    <Label color="blue">Blue</Label>
    <Label color="blue-purple">Blue purple</Label>
    <Label color="coral">Coral</Label>
    <Label color="green">Green</Label>
    <Label color="green-blue">Green blue</Label>
    <Label color="green-blue-purple">Green blue purple</Label>
    <Label color="gray">Gray</Label>
    <Label color="indigo">Indigo</Label>
    <Label color="lemon">Lemon</Label>
    <Label color="lime">Lime</Label>
    <Label color="orange">Orange</Label>
    <Label color="pink">Pink</Label>
    <Label color="pink-blue">Pink blue</Label>
    <Label color="purple">Purple</Label>
    <Label color="purple-red">Purple red</Label>
    <Label color="red">Red</Label>
    <Label color="red-orange">Red orange</Label>
    <Label color="teal">Teal</Label>
    <Label color="yellow">Yellow</Label>
  </Stack>
)

export const WithLeadingVisualSVG = () => (
  <Stack direction="horizontal" alignItems="center" padding="none">
    <Text>Issue #123</Text>
    <Label
      leadingVisual={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-label="Magnifying glass icon"
        >
          <path
            d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"
            fill="currentColor"
          ></path>
        </svg>
      }
    >
      Search result
    </Label>
  </Stack>
)
WithLeadingVisualSVG.storyName = 'Leading visual (native)'

export const WithOcticon = () => (
  <Stack direction="horizontal" alignItems="center" padding="none">
    <Text>Issue #123</Text>
    <Label leadingVisual={<CopilotIcon />}>Copilot</Label>
  </Stack>
)
WithOcticon.storyName = 'With an Octicon'

export const WithOcticonLarge = () => (
  <Stack direction="horizontal" alignItems="center" padding="none">
    <Text>Issue #123</Text>
    <Label size="large" leadingVisual={() => <CopilotIcon size={24} />}>
      Copilot
    </Label>
  </Stack>
)
WithOcticonLarge.storyName = 'With an Octicon (large)'

export const WithOcticonColor = () => (
  <Stack direction="horizontal" alignItems="center" padding="none">
    <Text>Issue #123</Text>
    <Label color="blue-purple" leadingVisual={<CopilotIcon />}>
      Copilot
    </Label>
  </Stack>
)
WithOcticonColor.storyName = 'With an Octicon and color'

export const WithReflow = () => (
  <Box style={{width: 200}}>
    <Stack direction="vertical" alignItems="flex-start" padding="none">
      <Text>Issue #123</Text>
      <Label leadingVisual={<CopilotIcon />}>Label reflows if the metadata is too long</Label>
    </Stack>
  </Box>
)
WithOcticonColor.storyName = 'With an Octicon and color'
