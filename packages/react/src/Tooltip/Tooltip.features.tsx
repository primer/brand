import React from 'react'
import {Button, Box, Link, Stack} from '..'
import {Tooltip} from './Tooltip'
import {BookIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Tooltip/Features',
  component: Tooltip,
}

export const AnchorHasMargin = () => (
  <Box padding="spacious">
    <Tooltip text="Tooltip is still centered">
      <Button sx={{marginLeft: 3}}>Button has 16px margin Left</Button>
    </Tooltip>
  </Box>
)

export const LabelType = () => (
  <Box padding="spacious">
    <Tooltip text="Contribution Documentation for 'Primer React'" type="label">
      <Link href="https://github.com/primer/react/contributor-docs/CONTRIBUTING.md">
        <BookIcon />
      </Link>
    </Tooltip>
  </Box>
)

// As a supplementary description for a button
export const DescriptionType = () => (
  <Box padding="spacious">
    <Tooltip text="Supplementary text" direction="n">
      <Button>Save</Button>
    </Tooltip>
  </Box>
)

export const AllDirections = () => (
  <Stack gap="spacious" padding="spacious">
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
    <Tooltip direction="ne" text="Supplementary text">
      <Button>North East</Button>
    </Tooltip>
    <Tooltip direction="nw" text="Supplementary text">
      <Button>North West</Button>
    </Tooltip>
    <Tooltip direction="se" text="Supplementary text">
      <Button>Southeast</Button>
    </Tooltip>
    <Tooltip direction="sw" text="Supplementary text">
      <Button>Southwest</Button>
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
  <Stack gap="spacious" padding="spacious">
    <Tooltip direction="w" text="But appears in the east direction due to not having enough space in the west">
      <Button>West</Button>
    </Tooltip>

    <Tooltip text="The direction here is north by default but there is not enough space in the north therefore the tooltip appears in the south">
      <Button>North</Button>
    </Tooltip>
  </Stack>
)
