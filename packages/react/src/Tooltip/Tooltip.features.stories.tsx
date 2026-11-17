import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Button, Box, Stack} from '..'
import {Tooltip} from './Tooltip'
import {ScreenFullIcon} from '@primer/octicons-react'
import {IconButton} from '../IconButton'

const meta = {
  title: 'Components/Tooltip/Features',
  component: Tooltip,
  args: {
    text: 'Tooltip text',
    children: <Button>Button</Button>,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const AnchorHasMargin: Story = {
  render: () => (
    <Box padding="spacious">
      <Tooltip text="Tooltip is still centered">
        <Button style={{marginLeft: '16px'}}>Button has 16px margin left</Button>
      </Tooltip>
    </Box>
  ),
}

export const LabelType: Story = {
  render: () => (
    <Box padding="spacious">
      <IconButton icon={ScreenFullIcon} aria-label="Go fullscreen" />
    </Box>
  ),
}

export const AllDirections: Story = {
  render: () => (
    <Stack gap="spacious" padding="spacious" direction="horizontal" style={{flexWrap: 'wrap'}}>
      <Tooltip direction="nw" text="Supplementary text">
        <Button>Northwest</Button>
      </Tooltip>
      <Tooltip direction="n" text="Supplementary text">
        <Button>North</Button>
      </Tooltip>
      <Tooltip direction="ne" text="Supplementary text">
        <Button>Northeast</Button>
      </Tooltip>
      <Tooltip direction="e" text="Supplementary text">
        <Button>East</Button>
      </Tooltip>
      <Tooltip direction="se" text="Supplementary text">
        <Button>Southeast</Button>
      </Tooltip>
      <Tooltip direction="s" text="Supplementary text">
        <Button>South</Button>
      </Tooltip>
      <Tooltip direction="sw" text="Supplementary text">
        <Button>Southwest</Button>
      </Tooltip>
      <Tooltip direction="w" text="Supplementary text">
        <Button>West</Button>
      </Tooltip>
    </Stack>
  ),
}

export const WithMediumDelay: Story = {
  render: () => (
    <Box padding="spacious">
      <Tooltip text="Tooltip delayed by 400ms" delay="medium">
        <Button>Medium delay</Button>
      </Tooltip>
    </Box>
  ),
}

export const WithLongDelay: Story = {
  render: () => (
    <Box padding="spacious">
      <Tooltip text="Tooltip delayed by 1200ms" delay="long">
        <IconButton icon={ScreenFullIcon} aria-label="Open fullscreen" />
      </Tooltip>
    </Box>
  ),
}

export const MultilineText: Story = {
  render: () => (
    <Box padding="spacious">
      <Tooltip
        direction="e"
        text="Random long text that needs to be wrapped and be multipline and have some paddings around"
      >
        <Button>Multiline East</Button>
      </Tooltip>
    </Box>
  ),
}

export const CalculatedDirection: Story = {
  render: () => (
    <Stack gap="spacious" padding="spacious" direction="horizontal">
      <Tooltip direction="w" text="But appears in the east direction due to not having enough space in the west">
        <Button>West</Button>
      </Tooltip>

      <Tooltip text="The direction here is north by default but there is not enough room in the north therefore the tooltip appears in the south">
        <Button>North</Button>
      </Tooltip>
    </Stack>
  ),
}
