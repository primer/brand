import React from 'react'
import type {Meta} from '@storybook/react'
import {Button, Box, Link, Stack} from '..'
import {Tooltip} from './Tooltip'
import {ScreenFullIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Tooltip/Features',
  component: Tooltip,
} as Meta<typeof Tooltip>

export const AnchorHasMargin = () => (
  <Box padding="spacious">
    <Tooltip text="Tooltip is still centered">
      <Button style={{marginLeft: '16px'}}>Button has 16px margin left</Button>
    </Tooltip>
  </Box>
)

export const LabelType = () => (
  <Box padding="spacious">
    <Tooltip text="Go fullscreen" type="label">
      <Button hasArrow={false}>
        <ScreenFullIcon />
      </Button>
    </Tooltip>
  </Box>
)

export const AllDirections = () => (
  <Stack gap="spacious" padding="spacious" direction="horizontal">
    <Tooltip direction="n" text="Supplementary text">
      <Button>North</Button>
    </Tooltip>
    <Tooltip direction="s" text="Supplementary text">
      <Button>South</Button>
    </Tooltip>
    <Tooltip direction="e" text="Supplementary text">
      <Button>East</Button>
    </Tooltip>
    <Tooltip direction="w" text="Supplementary text">
      <Button>West</Button>
    </Tooltip>
  </Stack>
)

export const MultilineText = () => (
  <Box padding="spacious">
    <Tooltip
      direction="e"
      text="Random long text that needs to be wrapped and be multipline and have some paddings around"
    >
      <Button>Multiline East</Button>
    </Tooltip>
  </Box>
)

export const CalculatedDirection = () => (
  <Stack gap="spacious" padding="spacious" direction="horizontal">
    <Tooltip direction="w" text="But appears in the east direction due to not having enough space in the west">
      <Button>West</Button>
    </Tooltip>

    <Tooltip text="The direction here is north by default but there is not enough space in the north therefore the tooltip appears in the south">
      <Button>North</Button>
    </Tooltip>
  </Stack>
)
