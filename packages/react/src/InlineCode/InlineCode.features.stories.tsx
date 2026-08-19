import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {
  Box,
  BoxBackgroundColors,
  Grid,
  Heading,
  HeadingSizes,
  Stack,
  Text,
  TextSizes,
  ThemeProvider,
  UnorderedList,
} from '../'
import {InlineCode} from '.'

const scaleColumnSpans = [8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3] as const

const meta = {
  title: 'Components/InlineCode/Features',
  component: InlineCode,
} satisfies Meta<typeof InlineCode>

export default meta
type Story = StoryObj<typeof InlineCode>

export const InBodyText: Story = {
  render: () => (
    <Text as="p">
      Install Primer Brand with <InlineCode>npm install @primer/react-brand</InlineCode>.
    </Text>
  ),
}

export const InHeading: Story = {
  render: () => (
    <Heading>
      Work directly with your GitHub Issues via <InlineCode>/mcp</InlineCode> support
    </Heading>
  ),
}

export const TypographicInheritance: Story = {
  render: () => (
    <Stack gap="spacious">
      <Heading size="1">
        Run <InlineCode>/mcp</InlineCode> from a heading
      </Heading>

      <Text as="p" size="600">
        Install Primer Brand with <InlineCode>npm install @primer/react-brand</InlineCode>.
      </Text>

      <Text as="em">
        Inline code works with font decorations, like <InlineCode>font-style: italic</InlineCode>.
      </Text>

      <Text weight="extrabold">
        It also sits alongside different font <InlineCode>font-weight</InlineCode> values.
      </Text>

      <UnorderedList>
        <UnorderedList.Item>
          Review issues with <InlineCode>/issues</InlineCode>
        </UnorderedList.Item>
        <UnorderedList.Item>
          Refine typography with <InlineCode>/typeset</InlineCode>
        </UnorderedList.Item>
        <UnorderedList.Item>
          Finish with <InlineCode>/polish</InlineCode>
        </UnorderedList.Item>
      </UnorderedList>

      <Text as="p">
        Inline code can be resized by wrapping it in an inner{' '}
        <Text size="700">
          <InlineCode>Text</InlineCode>
        </Text>{' '}
        component.
      </Text>
    </Stack>
  ),
}

export const TextScale: Story = {
  render: () => (
    <Stack direction="vertical" gap="condensed" padding="none">
      {TextSizes.map((size, index) => (
        <Box key={size} borderBlockEndWidth="thin" borderColor="default" borderStyle="solid" padding="normal">
          <Grid enableGutters={false}>
            <Grid.Column span={{xsmall: 12, medium: scaleColumnSpans[index]}}>
              <Text as="p" size={size}>
                This paragraph uses <InlineCode>{`size="${size}"`}</InlineCode> for its inline code.
              </Text>
            </Grid.Column>
          </Grid>
        </Box>
      ))}
    </Stack>
  ),
}

export const HeadingScale: Story = {
  render: () => (
    <Stack direction="vertical" gap="condensed" padding="none">
      {HeadingSizes.map((size, index) => (
        <Box key={size} borderBlockEndWidth="thin" borderColor="default" borderStyle="solid" padding="normal">
          <Grid enableGutters={false}>
            <Grid.Column span={{xsmall: 12, medium: scaleColumnSpans[index]}}>
              <Heading size={size}>
                This heading uses <InlineCode>{`size="${size}"`}</InlineCode> for its inline code.
              </Heading>
            </Grid.Column>
          </Grid>
        </Box>
      ))}
    </Stack>
  ),
}

export const Wrapped: Story = {
  render: () => (
    <Grid enableGutters={false}>
      <Grid.Column span={{xsmall: 12, medium: 3}}>
        <Text as="p">
          Use <InlineCode>/mcp</InlineCode> to review <InlineCode>/issues</InlineCode>, then run{' '}
          <InlineCode>/polish</InlineCode> for a final pass.
        </Text>
      </Grid.Column>
    </Grid>
  ),
}

export const ColorModes: Story = {
  render: () => (
    <Stack direction="vertical" padding="none">
      <ThemeProvider colorMode="light">
        <Box backgroundColor="default" padding="normal">
          <Text as="p">
            Use <InlineCode>/mcp</InlineCode> in light mode.
          </Text>
        </Box>
      </ThemeProvider>
      <ThemeProvider colorMode="dark">
        <Box backgroundColor="default" padding="normal">
          <Text as="p">
            Use <InlineCode>/mcp</InlineCode> in dark mode.
          </Text>
        </Box>
      </ThemeProvider>
    </Stack>
  ),
}

export const BackgroundColors: Story = {
  render: () => (
    <Stack direction="vertical" gap="none" padding="none">
      {BoxBackgroundColors.map(backgroundColor => (
        <Box key={backgroundColor} backgroundColor={backgroundColor} padding="normal">
          <Text as="p">
            {backgroundColor}: Use <InlineCode>/mcp</InlineCode> in your workflow.
          </Text>
        </Box>
      ))}
    </Stack>
  ),
}
