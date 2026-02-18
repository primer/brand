import React from 'react'
import type {Meta} from '@storybook/react'
import {Button} from '../Button'

import {CTABanner} from './CTABanner'
import {Grid, InlineLink, Section, Stack, Text, TextCursorAnimation, ThemeProvider} from '../'

import lightNarrowBg from '../fixtures/images/light-vertical-banner.png'
import lightWideBg from '../fixtures/images/light-horizontal-banner.png'
import darkNarrowBg from '../fixtures/images/dark-vertical-banner-alt.png'
import darkWideBg from '../fixtures/images/dark-horizontal-banner-alt.png'
import darkNarrowBg2 from '../fixtures/images/dark-vertical-banner-alt-2.png'
import darkWideBg2 from '../fixtures/images/dark-horizontal-banner-alt-2.png'
import placeholderImage from '../fixtures/images/placeholder.png'

export default {
  title: 'Components/CTABanner/Features',
  component: CTABanner,
} as Meta<typeof CTABanner>

export const Variants = () => (
  <Stack direction="vertical" gap="spacious" padding="none">
    <CTABanner variant="default">
      <CTABanner.Heading>Default</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button variant="accent">Get started for free</Button>
        <Button>View docs</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
    <CTABanner variant="balanced">
      <CTABanner.Heading>Balanced</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.Image src={placeholderImage} alt="Blank image" />
      <CTABanner.ButtonGroup>
        <Button variant="accent">Get started for free</Button>
        <Button>View docs</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
    <CTABanner variant="minimal">
      <CTABanner.Heading>Minimal</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button variant="accent">Get started for free</Button>
        <Button>View docs</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
  </Stack>
)

export const WithAccentButton = () => (
  <CTABanner>
    <CTABanner.Heading size="2">Start coding in seconds with Codespaces</CTABanner.Heading>
    <CTABanner.ButtonGroup>
      <Button variant="accent">Get started for free</Button>
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

export const WithGridLines = () => (
  <CTABanner hasGridLines>
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
  <CTABanner>
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

export const AlignedStart = () => (
  <CTABanner align="start">
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
  <Text as="p" size="100" variant="muted">
    Already have Visual Studio Code? <InlineLink href="#">Open now</InlineLink>
  </Text>
)

export const WithTrailingComponent = () => (
  <CTABanner trailingComponent={ExampleTrailingComponent}>
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

export const WithLeadingComponent = () => (
  <CTABanner leadingComponent={() => <TextCursorAnimation>Ready to start building?</TextCursorAnimation>}>
    {/* Display added here to evidence that size can't be overrided as a design rule  */}
    <CTABanner.Heading size="display">Safe and secure</CTABanner.Heading>
    <CTABanner.Description>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
      aperiam, eaque ipsa quae.
    </CTABanner.Description>

    <CTABanner.ButtonGroup>
      <Button>Get started for free</Button>
      <Button>View docs</Button>
    </CTABanner.ButtonGroup>
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
    <CTABanner>
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
    <CTABanner>
      <CTABanner.Heading>Subtle (default)</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
    <CTABanner backgroundColor="default">
      <CTABanner.Heading>Canvas default</CTABanner.Heading>
      <CTABanner.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
    <CTABanner backgroundColor="var(--base-color-scale-blue-0)">
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
    <CTABanner backgroundColor="cyan">
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
    <CTABanner backgroundColor={{narrow: 'yellow', regular: 'orange', wide: 'beige'}}>
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

function WithImageExample() {
  return (
    <Stack direction="vertical">
      <CTABanner hasGridLines>
        <CTABanner.Heading>Start coding in seconds with Codespaces</CTABanner.Heading>
        <CTABanner.Description>Get real-time suggestions and ship confidently.</CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button>Get started for free</Button>
          <Button>View docs</Button>
        </CTABanner.ButtonGroup>
        <CTABanner.Image src={placeholderImage} alt="Blank image" />
      </CTABanner>
      <CTABanner
        variant="balanced"
        hasGridLines
        leadingComponent={() => <TextCursorAnimation>Ready to start building?</TextCursorAnimation>}
      >
        {/* Display added here to evidence that size can't be overrided as a design rule  */}
        <CTABanner.Heading size="display">Safe and secure</CTABanner.Heading>
        <CTABanner.Description>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae.
        </CTABanner.Description>

        <CTABanner.ButtonGroup>
          <Button>Get started for free</Button>
          <Button>View docs</Button>
        </CTABanner.ButtonGroup>
        <CTABanner.Image src={placeholderImage} alt="Blank image" />
      </CTABanner>
      <CTABanner variant="minimal" hasGridLines>
        {/* Display added here to evidence that size can't be overrided as a design rule  */}
        <CTABanner.Heading size="display">Start coding in seconds with Codespaces</CTABanner.Heading>
        <CTABanner.Description>Get real-time suggestions and ship confidently.</CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button>Get started for free</Button>
          <Button>View docs</Button>
        </CTABanner.ButtonGroup>
        <CTABanner.Image src={placeholderImage} alt="Blank image" />
      </CTABanner>
    </Stack>
  )
}

export const WithImage = () => <WithImageExample />
export const WithImageAtTabletViewport = () => <WithImageExample />
WithImageAtTabletViewport.globals = {
  viewport: {value: 'ipad'},
}
export const WithImageAtMobileViewport = () => <WithImageExample />
WithImageAtMobileViewport.globals = {
  viewport: {value: 'iphonexr'},
}
