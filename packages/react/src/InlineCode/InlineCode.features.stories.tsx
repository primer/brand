import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {useTranslation} from 'react-i18next'
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
  render: function InBodyTextStory() {
    const {t} = useTranslation('InlineCode')

    return (
      <Text as="p">
        {t('install_primer_prefix')} <InlineCode>npm install @primer/react-brand</InlineCode>
        {t('install_primer_suffix')}
      </Text>
    )
  },
}

export const InHeading: Story = {
  render: function InHeadingStory() {
    const {t} = useTranslation('InlineCode')

    return (
      <Heading>
        {t('issues_support_prefix')} <InlineCode wrap={false}>/mcp</InlineCode> {t('issues_support_suffix')}
      </Heading>
    )
  },
}

export const TypographicInheritance: Story = {
  render: function TypographicInheritanceStory() {
    const {t} = useTranslation('InlineCode')

    return (
      <Stack gap="spacious">
        <Heading size="1">
          {t('heading_command_prefix')} <InlineCode wrap={false}>/mcp</InlineCode> {t('heading_command_suffix')}
        </Heading>
        <Text as="p" size="600">
          {t('install_primer_prefix')} <InlineCode>npm install @primer/react-brand</InlineCode>
          {t('install_primer_suffix')}
        </Text>
        <Text as="em">
          {t('font_decoration_prefix')} <InlineCode>font-style: italic</InlineCode>
          {t('font_decoration_suffix')}
        </Text>
        <Text weight="extrabold">
          {t('font_weight_prefix')} <InlineCode>font-weight</InlineCode> {t('font_weight_suffix')}
        </Text>
        <UnorderedList>
          <UnorderedList.Item>
            {t('review_issues_prefix')} <InlineCode wrap={false}>/issues</InlineCode>
          </UnorderedList.Item>
          <UnorderedList.Item>
            {t('refine_typography_prefix')} <InlineCode wrap={false}>/typeset</InlineCode>
          </UnorderedList.Item>
          <UnorderedList.Item>
            {t('finish_prefix')} <InlineCode wrap={false}>/polish</InlineCode>
          </UnorderedList.Item>
        </UnorderedList>
        <Text as="p">
          {t('resize_prefix')}{' '}
          <Text size="700">
            <InlineCode>Text</InlineCode>
          </Text>{' '}
          {t('resize_suffix')}
        </Text>
      </Stack>
    )
  },
}

export const TextScale: Story = {
  render: function TextScaleStory() {
    const {t} = useTranslation('InlineCode')

    return (
      <Stack direction="vertical" gap="condensed" padding="none">
        {TextSizes.map((size, index) => (
          <Box key={size} borderBlockEndWidth="thin" borderColor="default" borderStyle="solid" padding="normal">
            <Grid enableGutters={false}>
              <Grid.Column span={{xsmall: 12, medium: scaleColumnSpans[index]}}>
                <Text as="p" size={size}>
                  {t('paragraph_size_prefix')} <InlineCode>{`size="${size}"`}</InlineCode> {t('paragraph_size_suffix')}
                </Text>
              </Grid.Column>
            </Grid>
          </Box>
        ))}
      </Stack>
    )
  },
}

export const HeadingScale: Story = {
  render: function HeadingScaleStory() {
    const {t} = useTranslation('InlineCode')

    return (
      <Stack direction="vertical" gap="condensed" padding="none">
        {HeadingSizes.map((size, index) => (
          <Box key={size} borderBlockEndWidth="thin" borderColor="default" borderStyle="solid" padding="normal">
            <Grid enableGutters={false}>
              <Grid.Column span={{xsmall: 12, medium: scaleColumnSpans[index]}}>
                <Heading size={size}>
                  {t('heading_size_prefix')} <InlineCode>{`size="${size}"`}</InlineCode> {t('heading_size_suffix')}
                </Heading>
              </Grid.Column>
            </Grid>
          </Box>
        ))}
      </Stack>
    )
  },
}

export const Wrapped: Story = {
  render: function WrappedStory() {
    const {t} = useTranslation('InlineCode')

    return (
      <Grid enableGutters={false}>
        <Grid.Column span={{xsmall: 12, medium: 3}}>
          <Stack direction="vertical" gap="normal" padding="none">
            <Text as="p">
              {t('long_wrap_prefix')} <InlineCode>npm install @primer/react-brand@latest --save-exact</InlineCode>
              {t('long_wrap_suffix')}
            </Text>
            <Text as="p">
              {t('short_nowrap_prefix')} <InlineCode wrap={false}>/mcp</InlineCode>
              {t('short_nowrap_suffix')}
            </Text>
          </Stack>
        </Grid.Column>
      </Grid>
    )
  },
}

export const ColorModes: Story = {
  render: function ColorModesStory() {
    const {t} = useTranslation('InlineCode')

    return (
      <Stack direction="vertical" padding="none">
        <ThemeProvider colorMode="light">
          <Box backgroundColor="default" padding="normal">
            <Text as="p">
              {t('light_mode_prefix')} <InlineCode wrap={false}>/mcp</InlineCode> {t('light_mode_suffix')}
            </Text>
          </Box>
        </ThemeProvider>
        <ThemeProvider colorMode="dark">
          <Box backgroundColor="default" padding="normal">
            <Text as="p">
              {t('dark_mode_prefix')} <InlineCode wrap={false}>/mcp</InlineCode> {t('dark_mode_suffix')}
            </Text>
          </Box>
        </ThemeProvider>
      </Stack>
    )
  },
}

export const BackgroundColors: Story = {
  render: function BackgroundColorsStory() {
    const {t} = useTranslation('InlineCode')

    return (
      <Stack direction="vertical" gap="none" padding="none">
        {BoxBackgroundColors.map(backgroundColor => (
          <Box key={backgroundColor} backgroundColor={backgroundColor} padding="normal">
            <Text as="p">
              {backgroundColor}: {t('workflow_prefix')} <InlineCode wrap={false}>/mcp</InlineCode>{' '}
              {t('workflow_suffix')}
            </Text>
          </Box>
        ))}
      </Stack>
    )
  },
}

export const Uppercase: Story = {
  render: function UppercaseStory() {
    const {t} = useTranslation('InlineCode')

    return (
      <Stack direction="vertical" gap="condensed" padding="none">
        {HeadingSizes.map((size, index) => (
          <Box key={size} borderBlockEndWidth="thin" borderColor="default" borderStyle="solid" padding="normal">
            <Grid enableGutters={false}>
              <Grid.Column span={{xsmall: 12, medium: scaleColumnSpans[index]}}>
                <Heading size={size}>
                  {t('heading_size_prefix')}{' '}
                  <InlineCode style={{textTransform: 'uppercase'}}>{`size="${size}"`}</InlineCode>{' '}
                  {t('heading_size_suffix')}
                </Heading>
              </Grid.Column>
            </Grid>
          </Box>
        ))}
      </Stack>
    )
  },
}
