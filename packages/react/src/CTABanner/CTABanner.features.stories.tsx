import React from 'react'
import {Meta} from '@storybook/react'
import {ActionMenu} from '../ActionMenu'
import {Button} from '../Button'

import {CTABanner} from './CTABanner'
import {Grid, Section, Stack, ThemeProvider} from '../'

import lightNarrowBg from '../fixtures/images/light-vertical-banner.png'
import lightWideBg from '../fixtures/images/light-horizontal-banner.png'
import darkNarrowBg from '../fixtures/images/dark-vertical-banner-alt.png'
import darkWideBg from '../fixtures/images/dark-horizontal-banner-alt.png'
import darkNarrowBg2 from '../fixtures/images/dark-vertical-banner-alt-2.png'
import darkWideBg2 from '../fixtures/images/dark-horizontal-banner-alt-2.png'

export default {
  title: 'Components/CTABanner/Features',
  component: CTABanner,
} as Meta<typeof CTABanner>

export const WithAccentButton = () => (
  <CTABanner hasShadow={false} align="center">
    <CTABanner.Heading size="2">Start coding in seconds with Codespaces</CTABanner.Heading>
    <CTABanner.ButtonGroup>
      <Button variant="accent" hasArrow={false}>
        Get started for free
      </Button>
      <Button>View docs</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
)

export const WithBorder = () => (
  <CTABanner hasBorder>
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Primary Action</Button>
      <Button>Secondary Action</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
)

export const WithNoShadow = () => (
  <CTABanner hasShadow={false}>
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Primary Action</Button>
      <Button>Secondary Action</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
)

export const AlignedCenter = () => (
  <CTABanner align="center">
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Primary Action</Button>
      <Button>Secondary Action</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
)

const ExampleTrailingComponent = () => (
  <ActionMenu>
    <ActionMenu.Button>Open menu</ActionMenu.Button>
    <ActionMenu.Overlay aria-label="GitHub features">
      <ActionMenu.Item value="Copilot" selected>
        Copilot
      </ActionMenu.Item>
      <ActionMenu.Item value="Codespaces">Codespaces</ActionMenu.Item>
      <ActionMenu.Item value="CodeQL">CodeQL</ActionMenu.Item>
    </ActionMenu.Overlay>
  </ActionMenu>
)

export const WithTrailingComponent = () => (
  <CTABanner trailingComponent={ExampleTrailingComponent}>
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
  </CTABanner>
)

const designTokenOverrides = `
  .custom-colors {
    --brand-CTABanner-shadow-color-start: var(--base-color-scale-purple-5);
    --brand-CTABanner-shadow-color-end: var(--base-color-scale-red-5);
  }
`

export const CustomShadow = () => (
  <div className="custom-colors">
    <style>{designTokenOverrides}</style>
    <CTABanner align="center">
      <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
  </div>
)

export const CustomBackgroundColors = () => (
  <Stack direction="vertical">
    <CTABanner hasShadow={false}>
      <CTABanner.Heading>Default</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
    <CTABanner hasShadow={false} backgroundColor="subtle">
      <CTABanner.Heading>Subtle</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
    <CTABanner hasShadow={false} backgroundColor="var(--base-color-scale-blue-0)">
      <CTABanner.Heading>Base scale blue 0</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
    <CTABanner hasShadow={false} backgroundColor="cyan">
      <CTABanner.Heading>Cyan</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
    <CTABanner hasShadow={false} backgroundColor={{narrow: 'yellow', regular: 'orange', wide: 'beige'}}>
      <CTABanner.Heading>Responsive</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
  </Stack>
)

export const ResponsiveBackgroundImage = args => (
  <CTABanner
    align="center"
    hasShadow={false}
    backgroundImageSrc={
      args.backgroundImageSrc || {
        narrow: lightNarrowBg,
        regular: lightWideBg,
        wide: lightWideBg,
      }
    }
  >
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description variant="default">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Primary Action</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
)

export const ResponsiveBackgroundImageDark = () => (
  <Stack padding="none" gap="spacious">
    <ResponsiveBackgroundImage
      backgroundImageSrc={{
        narrow: darkNarrowBg,
        regular: darkWideBg,
        wide: darkWideBg,
      }}
    />{' '}
    <ResponsiveBackgroundImage
      backgroundImageSrc={{
        narrow: darkNarrowBg2,
        regular: darkWideBg2,
        wide: darkWideBg2,
      }}
    />
  </Stack>
)
ResponsiveBackgroundImageDark.decorators = [
  Story => (
    <ThemeProvider colorMode="dark">
      <Section backgroundColor="default">
        <Grid>
          <Grid.Column>
            <Story />
          </Grid.Column>
        </Grid>
      </Section>
    </ThemeProvider>
  ),
]
