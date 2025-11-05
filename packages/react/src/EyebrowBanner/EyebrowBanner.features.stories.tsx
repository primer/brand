import React from 'react'
import type {Meta} from '@storybook/react'
import {EyebrowBanner, EyebrowBannerIconColors, EyebrowBannerLabelColors} from '.'
import {Stack} from '../Stack'
import {MarkGithubIcon, SparkleFillIcon} from '@primer/octicons-react'
import backgroundImageDark from '../fixtures/images/background-stars.png'
import backgroundImageLight from '../recipes/FeaturePreviewLPs/fixtures/images/other/light-bg.png'
import {ThemeProvider} from '../ThemeProvider'
import {Box} from '../Box'

export default {
  title: 'Components/EyebrowBanner/Features',
  component: EyebrowBanner,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof EyebrowBanner>

export const Variations = () => (
  <Stack>
    <EyebrowBanner href="/">
      <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
      <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
    </EyebrowBanner>
    <EyebrowBanner href="/">
      <EyebrowBanner.Visual>
        <img
          width="44"
          height="44"
          alt=""
          aria-hidden="true"
          src="https://github.githubassets.com/assets/eyebrow-23@2x-563f292d9e30.png"
        />
      </EyebrowBanner.Visual>
      <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
      <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
    </EyebrowBanner>
    <EyebrowBanner href="/">
      <EyebrowBanner.Visual>
        <MarkGithubIcon size={44} fill="var(--brand-color-text-default)" />
      </EyebrowBanner.Visual>
      <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
      <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
    </EyebrowBanner>
    <EyebrowBanner href="/">
      <EyebrowBanner.Label>NEW</EyebrowBanner.Label>
      <EyebrowBanner.Heading>GitHub Copilot now available for Business</EyebrowBanner.Heading>
    </EyebrowBanner>
    <EyebrowBanner href="/">
      <EyebrowBanner.Label>NEW</EyebrowBanner.Label>
      <EyebrowBanner.Heading>GitHub Copilot now available for Business</EyebrowBanner.Heading>
      <EyebrowBanner.SubHeading>Harnessed for productivity. Designed for collaboration. </EyebrowBanner.SubHeading>
    </EyebrowBanner>
    <EyebrowBanner href="/">
      <EyebrowBanner.Label>UPDATE</EyebrowBanner.Label>
      <EyebrowBanner.Heading>Now supports multiple languages</EyebrowBanner.Heading>
    </EyebrowBanner>
  </Stack>
)

export const OnCustomBackgroundDark = () => <Variations />

OnCustomBackgroundDark.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <div
        className="p-3"
        style={{backgroundImage: `url(${backgroundImageDark})`, backgroundSize: 'cover', height: '100vh'}}
      >
        <Story />
      </div>
    </ThemeProvider>
  ),
]
OnCustomBackgroundDark.parameters = {
  layout: 'fullscreen',
}

export const OnCustomBackgroundLight = () => <Variations />

OnCustomBackgroundLight.decorators = [
  Story => (
    <ThemeProvider colorMode="light">
      <div
        className="p-3"
        style={{backgroundImage: `url(${backgroundImageLight})`, backgroundSize: 'cover', height: '100vh'}}
      >
        <Story />
      </div>
    </ThemeProvider>
  ),
]
OnCustomBackgroundLight.parameters = {
  layout: 'fullscreen',
}

export const Labels = () => (
  <Stack>
    {EyebrowBannerLabelColors.map(color => (
      <EyebrowBanner href="/" key={color}>
        <EyebrowBanner.Label color={color}>{color}</EyebrowBanner.Label>
        <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
      </EyebrowBanner>
    ))}
  </Stack>
)

export const LabelsDark = () => <Labels />

LabelsDark.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <Box backgroundColor="default">
        <Story />
      </Box>
    </ThemeProvider>
  ),
]

export const Icons = () => (
  <Stack direction="horizontal">
    <Stack>
      {EyebrowBannerIconColors.map(color => (
        <EyebrowBanner href="/" key={color}>
          <EyebrowBanner.Visual icon={<SparkleFillIcon />} color={color}></EyebrowBanner.Visual>
          <EyebrowBanner.Heading>color: {color}</EyebrowBanner.Heading>
          <EyebrowBanner.SubHeading>hasBackground: false</EyebrowBanner.SubHeading>
        </EyebrowBanner>
      ))}
    </Stack>
    <Stack>
      {EyebrowBannerIconColors.map(color => (
        <EyebrowBanner href="/" key={color}>
          <EyebrowBanner.Visual icon={<SparkleFillIcon />} color={color} hasBackground></EyebrowBanner.Visual>
          <EyebrowBanner.Heading>color: {color}</EyebrowBanner.Heading>
          <EyebrowBanner.SubHeading>hasBackground: true</EyebrowBanner.SubHeading>
        </EyebrowBanner>
      ))}
    </Stack>
  </Stack>
)

export const IconsDark = () => <Icons />

IconsDark.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <Box backgroundColor="default">
        <Story />
      </Box>
    </ThemeProvider>
  ),
]
