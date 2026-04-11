import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {GlobeIcon} from '@primer/octovisuals-react'
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

const meta = {
  title: 'Components/CTABanner/Features',
  component: CTABanner,
} satisfies Meta<typeof CTABanner>

export default meta
type Story = StoryObj<typeof meta>

const ExampleTrailingComponent = () => (
  <Text as="p" size="100" variant="muted">
    Already have Visual Studio Code? <InlineLink href="#">Open now</InlineLink>
  </Text>
)

const GlobeOctovisual = () => <GlobeIcon size={64} />

const designTokenOverrides = `
  .custom-colors {
    --brand-CTABanner-shadow-color-start: var(--base-color-scale-purple-5);
    --brand-CTABanner-shadow-color-end: var(--base-color-scale-red-5);
  }
`

const ResponsiveBackgroundImageExample = ({
  backgroundImageSrc = {
    narrow: lightNarrowBg,
    regular: lightWideBg,
    wide: lightWideBg,
  },
}: {
  backgroundImageSrc?: React.ComponentProps<typeof CTABanner>['backgroundImageSrc']
}) => (
  <CTABanner backgroundImageSrc={backgroundImageSrc}>
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

export const Variants: Story = {
  render: () => (
    <Stack direction="vertical" gap="spacious" padding="none">
      <CTABanner variant="default">
        <CTABanner.Heading>Default</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button variant="accent">Get started for free</Button>
          <Button>View docs</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
      <CTABanner variant="balanced">
        <CTABanner.Heading>Balanced</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button variant="accent">Get started for free</Button>
          <Button>View docs</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
    </Stack>
  ),
}

export const WithAccentButton: Story = {
  render: () => (
    <CTABanner>
      <CTABanner.Heading size="2">Start coding in seconds with Codespaces</CTABanner.Heading>
      <CTABanner.ButtonGroup>
        <Button variant="accent">Get started for free</Button>
        <Button>View docs</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
  ),
}

export const WithBorder: Story = {
  render: () => (
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
  ),
}

export const WithGridLines: Story = {
  render: () => (
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
  ),
}

export const WithNoShadow: Story = {
  render: () => (
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
  ),
}

export const AlignedStart: Story = {
  render: () => (
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
  ),
}

export const WithTrailingComponent: Story = {
  render: () => (
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
  ),
}

export const WithLeadingComponent: Story = {
  render: () => (
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
  ),
}

export const WithOctovisualLeadingComponent: Story = {
  render: () => (
    <CTABanner leadingComponent={GlobeOctovisual}>
      <CTABanner.Heading>Build for teams everywhere</CTABanner.Heading>
      <CTABanner.Description>
        Use Octovisuals with CTABanner to add a more expressive visual treatment to campaign and product call-to-action
        moments.
      </CTABanner.Description>
      <CTABanner.ButtonGroup>
        <Button>Explore Octovisuals</Button>
        <Button>Read the docs</Button>
      </CTABanner.ButtonGroup>
    </CTABanner>
  ),
}

export const CustomShadow: Story = {
  render: () => (
    <div className="custom-colors">
      <style>{designTokenOverrides}</style>
      <CTABanner>
        <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
    </div>
  ),
}

export const CustomBackgroundColors: Story = {
  render: () => (
    <Stack direction="vertical">
      <CTABanner>
        <CTABanner.Heading>Subtle (default)</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
      <CTABanner backgroundColor="default">
        <CTABanner.Heading>Canvas default</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
      <CTABanner backgroundColor="var(--base-color-scale-blue-0)">
        <CTABanner.Heading>Base scale blue 0</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
      <CTABanner backgroundColor="cyan">
        <CTABanner.Heading>Cyan</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
      <CTABanner backgroundColor={{narrow: 'yellow', regular: 'orange', wide: 'beige'}}>
        <CTABanner.Heading>Responsive</CTABanner.Heading>
        <CTABanner.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </CTABanner.Description>
        <CTABanner.ButtonGroup>
          <Button>Primary Action</Button>
          <Button>Secondary Action</Button>
        </CTABanner.ButtonGroup>
      </CTABanner>
    </Stack>
  ),
}

export const ResponsiveBackgroundImage: Story = {
  render: args => <ResponsiveBackgroundImageExample backgroundImageSrc={args.backgroundImageSrc} />,
}

export const ResponsiveBackgroundImageDark: Story = {
  render: () => (
    <Stack padding="none" gap="spacious">
      <ResponsiveBackgroundImageExample
        backgroundImageSrc={{
          narrow: darkNarrowBg,
          regular: darkWideBg,
          wide: darkWideBg,
        }}
      />
      <ResponsiveBackgroundImageExample
        backgroundImageSrc={{
          narrow: darkNarrowBg2,
          regular: darkWideBg2,
          wide: darkWideBg2,
        }}
      />
    </Stack>
  ),
  decorators: [
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
  ],
}

export const WithImage: Story = {
  render: () => <WithImageExample />,
}

export const WithImageAtTabletViewport: Story = {
  render: () => <WithImageExample />,
  globals: {
    viewport: {value: 'ipad'},
  },
}

export const WithImageAtMobileViewport: Story = {
  render: () => <WithImageExample />,
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const WithInlineCodeElement: Story = {
  render: () => (
    <Stack direction="vertical" gap="spacious" padding="none">
      <Stack direction="vertical" gap="normal">
        <Text as="p">Default variant:</Text>
        <CTABanner>
          <CTABanner.Heading>
            Use any <code>/model</code> parallelize with <code>/fleet</code>
          </CTABanner.Heading>
          <CTABanner.Description>
            Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models at
            once.
          </CTABanner.Description>
          <CTABanner.ButtonGroup>
            <Button>Get started</Button>
          </CTABanner.ButtonGroup>
        </CTABanner>
      </Stack>
      <Stack direction="vertical" gap="normal">
        <Text as="p">Custom background color:</Text>
        <CTABanner backgroundColor="default" hasBorder>
          <CTABanner.Heading>
            Use any <code>/model</code> parallelize with <code>/fleet</code>
          </CTABanner.Heading>
          <CTABanner.Description>
            Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models at
            once.
          </CTABanner.Description>
          <CTABanner.ButtonGroup>
            <Button>Get started</Button>
          </CTABanner.ButtonGroup>
        </CTABanner>
      </Stack>
      <Stack direction="vertical" gap="normal">
        <Text as="p">Balanced variant:</Text>
        <CTABanner variant="balanced">
          <CTABanner.Heading>
            Use any <code>/model</code> parallelize with <code>/fleet</code>
          </CTABanner.Heading>
          <CTABanner.Description>
            Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models at
            once.
          </CTABanner.Description>
          <CTABanner.ButtonGroup>
            <Button>Get started</Button>
          </CTABanner.ButtonGroup>
          <CTABanner.Image src={placeholderImage} alt="Blank image" />
        </CTABanner>
      </Stack>
      <Stack direction="vertical" gap="normal">
        <Text as="p">Minimal variant:</Text>
        <CTABanner variant="minimal">
          <CTABanner.Heading>
            Use any <code>/model</code> parallelize with <code>/fleet</code>
          </CTABanner.Heading>
          <CTABanner.Description>
            Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models at
            once.
          </CTABanner.Description>
          <CTABanner.ButtonGroup>
            <Button>Get started</Button>
          </CTABanner.ButtonGroup>
        </CTABanner>
      </Stack>
      <Stack direction="vertical" gap="normal">
        <Text as="p">Dark mode:</Text>
        <ThemeProvider colorMode="dark">
          <Section backgroundColor="default">
            <CTABanner>
              <CTABanner.Heading>
                Use any <code>/model</code> parallelize with <code>/fleet</code>
              </CTABanner.Heading>
              <CTABanner.Description>
                Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple
                models at once.
              </CTABanner.Description>
              <CTABanner.ButtonGroup>
                <Button>Get started</Button>
              </CTABanner.ButtonGroup>
            </CTABanner>
          </Section>
        </ThemeProvider>
      </Stack>
      <Stack direction="vertical" gap="normal">
        <Text as="p">Start aligned with border:</Text>
        <CTABanner align="start" hasBorder>
          <CTABanner.Heading>
            Use any <code>/model</code> parallelize with <code>/fleet</code>
          </CTABanner.Heading>
          <CTABanner.Description>
            Use <code>/model</code> to switch, then <code>/fleet</code> to execute in parallel or run multiple models at
            once.
          </CTABanner.Description>
          <CTABanner.ButtonGroup>
            <Button>Get started</Button>
          </CTABanner.ButtonGroup>
        </CTABanner>
      </Stack>
    </Stack>
  ),
}
