import React from 'react'
import type {Meta} from '@storybook/react'

import {BreakoutBanner} from './BreakoutBanner'
import {Link} from '../Link'
import {Stack} from '../Stack'

import lightNarrowBg from '../fixtures/images/light-vertical-banner.png'
import lightWideBg from '../fixtures/images/light-horizontal-banner.png'
import darkNarrowBg from '../fixtures/images/dark-vertical-banner.png'
import darkWideBg from '../fixtures/images/dark-horizontal-banner.png'

import {LogoGithubIcon} from '@primer/octicons-react'
import {ThemeProvider} from '../ThemeProvider'

export default {
  title: 'Components/BreakoutBanner/Features',
  component: BreakoutBanner,
} as Meta<typeof BreakoutBanner>

export const CustomBackgroundColors = () => (
  <Stack direction="vertical">
    <BreakoutBanner backgroundColor="default">
      <BreakoutBanner.Heading>Default</BreakoutBanner.Heading>
      <BreakoutBanner.LinkGroup>
        <Link href="#">Primary action</Link>
      </BreakoutBanner.LinkGroup>
    </BreakoutBanner>
    <BreakoutBanner backgroundColor="subtle">
      <BreakoutBanner.Heading>Subtle</BreakoutBanner.Heading>
      <BreakoutBanner.LinkGroup>
        <Link href="#">Primary action</Link>
      </BreakoutBanner.LinkGroup>
    </BreakoutBanner>
    <BreakoutBanner backgroundColor="var(--base-color-scale-blue-0)">
      <BreakoutBanner.Heading>Base color</BreakoutBanner.Heading>
      <BreakoutBanner.LinkGroup>
        <Link href="#">Primary action</Link>
      </BreakoutBanner.LinkGroup>
    </BreakoutBanner>
    <BreakoutBanner backgroundColor="var(--base-color-scale-blue-0)">
      <BreakoutBanner.Heading>Custom</BreakoutBanner.Heading>
      <BreakoutBanner.LinkGroup>
        <Link href="#">Primary action</Link>
      </BreakoutBanner.LinkGroup>
    </BreakoutBanner>
    <BreakoutBanner backgroundColor={{narrow: 'yellow', regular: 'orange', wide: 'beige'}}>
      <BreakoutBanner.Heading>Responsive</BreakoutBanner.Heading>
      <BreakoutBanner.LinkGroup>
        <Link href="#">Primary action</Link>
      </BreakoutBanner.LinkGroup>
    </BreakoutBanner>
  </Stack>
)

export const ResponsiveBackgroundImage = args => (
  <BreakoutBanner
    backgroundImageSrc={
      args.backgroundImageSrc || {
        narrow: lightNarrowBg,
        regular: lightWideBg,
        wide: lightWideBg,
      }
    }
  >
    <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>

    <BreakoutBanner.LinkGroup>
      <Link href="#">Primary action</Link>
      <Link href="#">Secondary Action</Link>
    </BreakoutBanner.LinkGroup>
  </BreakoutBanner>
)

export const ResponsiveBackgroundImageDark = () => (
  <ResponsiveBackgroundImage
    backgroundImageSrc={{
      narrow: darkNarrowBg,
      regular: darkWideBg,
      wide: darkWideBg,
    }}
  />
)
ResponsiveBackgroundImageDark.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <Story />
    </ThemeProvider>
  ),
]

export const AlignedCenter = () => (
  <BreakoutBanner align="center" leadingVisual={<LogoGithubIcon size="medium" />}>
    <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>

    <BreakoutBanner.LinkGroup>
      <Link href="#">Primary Action</Link>
      <Link href="#">Secondary Action</Link>
    </BreakoutBanner.LinkGroup>
  </BreakoutBanner>
)

export const OptionalDescription = () => (
  <BreakoutBanner>
    <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>
    <BreakoutBanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </BreakoutBanner.Description>
    <BreakoutBanner.LinkGroup>
      <Link href="#">Primary action</Link>
      <Link href="#">Secondary action</Link>
    </BreakoutBanner.LinkGroup>
  </BreakoutBanner>
)

export const VerticallyStackedLinks = () => (
  <BreakoutBanner>
    <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>
    <BreakoutBanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </BreakoutBanner.Description>
    <BreakoutBanner.LinkGroup direction="vertical" gap="condensed">
      <Link href="#">Primary action</Link>
      <Link href="#" arrowDirection="end">
        Secondary action
      </Link>
    </BreakoutBanner.LinkGroup>
  </BreakoutBanner>
)
