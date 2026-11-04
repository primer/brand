import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {LogoGithubIcon, MarkGithubIcon} from '@primer/octicons-react'
import {userEvent, within} from 'storybook/test'
import {LogoSuite} from './LogoSuite'
import {Grid} from '../Grid'
import {Box, Image, Stack, Text} from '../'
import pinterestLogo from '../fixtures/images/logos/pinterest.png'
import shopifyLogo from '../fixtures/images/logos/shopify.png'
import twilioLogo from '../fixtures/images/logos/twilio.png'
import uberLogo from '../fixtures/images/logos/uber.png'
import vercelLogo from '../fixtures/images/logos/vercel.png'
import linkedinLogo from '../fixtures/images/logos/linkedin-color.svg'
import microsoftLogo from '../fixtures/images/logos/microsoft-color.svg'
import xboxLogo from '../fixtures/images/logos/xbox-color.png'
import {AzureLogo} from '../fixtures/third-party-logos/AzureLogo'
import {MicrosoftCopilotLogo} from '../fixtures/third-party-logos/MicrosoftCopilotLogo'
import {MicrosoftLogo} from '../fixtures/third-party-logos/MicrosoftLogo'
import {VisualStudioCodeLogo} from '../fixtures/third-party-logos/VisualStudioCodeLogo'
import {VisualStudioLogo} from '../fixtures/third-party-logos/VisualStudioLogo'
import {logos} from './LogoSuite.fixtures'

const meta = {
  title: 'Components/LogoSuite/Features',
  component: LogoSuite,
} satisfies Meta<typeof LogoSuite>

export default meta
type Story = StoryObj<typeof meta>

export const AlignStart = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite align="start">
        <LogoSuite.Heading>Start alignment</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>uu
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const AlignCenter = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite align="center">
        <LogoSuite.Heading>Center alignment</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const AlignJustify = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite align="justify">
        <LogoSuite.Heading>Justified alignment</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const TakeoverButton = () => {
  return (
    <Grid>
      <Grid.Column>
        <LogoSuite hasDivider={false}>
          <LogoSuite.Heading>Idle</LogoSuite.Heading>
          <LogoSuite.Logobar takeoverButton={{label: 'Learn more', href: '#'}}>{logos.slice(0, 8)}</LogoSuite.Logobar>
        </LogoSuite>
      </Grid.Column>
      <Grid.Column>
        <LogoSuite hasDivider={false}>
          <LogoSuite.Heading>Hover enabled</LogoSuite.Heading>
          <LogoSuite.Logobar data-testid="hover-enabled-logobar" takeoverButton={{label: 'Learn more', href: '#'}}>
            {logos.slice(0, 8)}
          </LogoSuite.Logobar>
        </LogoSuite>
      </Grid.Column>
    </Grid>
  )
}

TakeoverButton.parameters = {
  pseudo: {hover: ['[data-testid="hover-enabled-logobar"]']},
}

export const DefaultVariant = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const EmphasisVariant = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar variant="emphasis">{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const MutedVariant = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar variant="muted">{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const WithoutDivider = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite hasDivider={false}>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const CondensedGap = () => (
  <Grid>
    <Grid.Column>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar gap="condensed">{logos.slice(0, 6)}</LogoSuite.Logobar>
      </LogoSuite>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
        <LogoSuite.Logobar gap="condensed" marquee marqueeSpeed="idle">
          {logos.slice(0, 12)}
        </LogoSuite.Logobar>
      </LogoSuite>
    </Grid.Column>
  </Grid>
)

export const Marquee = () => (
  <LogoSuite>
    <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar marquee>{logos.slice(0, 12)}</LogoSuite.Logobar>
  </LogoSuite>
)

Marquee.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)

  await new Promise(resolve => setTimeout(resolve, 3000))

  const pauseButton = canvas.getByLabelText('Pause animation')
  await userEvent.click(pauseButton)
}

export const IdleMarqueeSpeed = () => (
  <LogoSuite>
    <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar marquee marqueeSpeed="idle">
      {logos.slice(0, 12)}
    </LogoSuite.Logobar>
  </LogoSuite>
)

export const SlowerMarqueeSpeed = () => (
  <LogoSuite>
    <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar marquee marqueeSpeed="slow">
      {logos.slice(0, 12)}
    </LogoSuite.Logobar>
  </LogoSuite>
)

export const VisibleHeading = () => (
  <LogoSuite>
    <LogoSuite.Heading>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
  </LogoSuite>
)

export const HeadingLevel = () => (
  <LogoSuite>
    <LogoSuite.Heading as="h4">Heading</LogoSuite.Heading>
    <LogoSuite.Description>The heading above is rendered as a h4</LogoSuite.Description>
    <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
  </LogoSuite>
)

export const VisibleHeadingWithDescription = () => (
  <LogoSuite>
    <LogoSuite.Heading>Heading</LogoSuite.Heading>
    <LogoSuite.Description>
      Trusted by more than 90% of Fortune 100 companies, over 100 million users, and backed by Microsoft
    </LogoSuite.Description>
    <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
  </LogoSuite>
)

export const WithRasterLogos = () => (
  <LogoSuite>
    <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar>
      <Image alt="Uber" src={uberLogo} />
      <Image alt="Vercel" src={vercelLogo} />
      <Image alt="Shopify" src={shopifyLogo} />
      <Image alt="Pinterest" src={pinterestLogo} />
      <Image alt="Twilio" src={twilioLogo} />
    </LogoSuite.Logobar>
  </LogoSuite>
)

export const GridLineExpressive = () => (
  <LogoSuite variant="gridline-expressive">
    <LogoSuite.Heading>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
  </LogoSuite>
)

export const GridLineKitchenSink: Story = {
  name: 'GridLine kitchen sink',
  render: () => (
    <Stack padding="none" gap="none">
      <Box paddingBlockStart={24}>
        <Text as="p" align="center" variant="muted">
          Kitchen sink of all features using the GridLine variant
        </Text>
      </Box>
      <Box marginBlockStart={24} borderBlockStartWidth="thin" borderStyle="solid" borderColor="muted">
        <LogoSuite variant="gridline">
          <LogoSuite.Heading visuallyHidden>Visually hidden heading</LogoSuite.Heading>
          <LogoSuite.Logobar data-testid="gridline-hover-enabled-logobar">
            <Image alt="Uber" src={uberLogo} />
            <Image alt="Vercel" src={vercelLogo} />
            <Image alt="Shopify" src={shopifyLogo} />
            <Image alt="Pinterest" src={pinterestLogo} />
            <Image alt="Twilio" src={twilioLogo} />
          </LogoSuite.Logobar>
        </LogoSuite>

        <LogoSuite variant="gridline">
          <LogoSuite.Heading visuallyHidden>Visually hidden heading</LogoSuite.Heading>
          <LogoSuite.Logobar data-testid="gridline-hover-enabled-logobar" marquee>
            <Image alt="Uber" src={uberLogo} />
            <Image alt="Vercel" src={vercelLogo} />
            <Image alt="Shopify" src={shopifyLogo} />
            <Image alt="Pinterest" src={pinterestLogo} />
            <Image alt="Twilio" src={twilioLogo} />
          </LogoSuite.Logobar>
        </LogoSuite>

        <LogoSuite variant="gridline">
          <LogoSuite.Heading>Heading only, static logos</LogoSuite.Heading>
          <LogoSuite.Logobar>
            <Image alt="Uber" src={uberLogo} />
            <Image alt="Vercel" src={vercelLogo} />
            <Image alt="Shopify" src={shopifyLogo} />
            <Image alt="Pinterest" src={pinterestLogo} />
            <Image alt="Twilio" src={twilioLogo} />
          </LogoSuite.Logobar>
        </LogoSuite>
      </Box>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Linked full-color wordmarks, static</LogoSuite.Heading>
        <LogoSuite.Logobar>
          <a href="#microsoft">
            <Image alt="Microsoft" src={microsoftLogo} />
          </a>
          <a href="#xbox">
            <Image alt="Xbox" src={xboxLogo} />
          </a>
          <a href="#github" aria-label="GitHub">
            <LogoGithubIcon size={24} />
          </a>
          <a href="#linkedin">
            <Image alt="LinkedIn" src={linkedinLogo} />
          </a>
          <a href="#microsoft-2">
            <Image alt="Microsoft" src={microsoftLogo} />
          </a>
          <a href="#xbox-2">
            <Image alt="Xbox" src={xboxLogo} />
          </a>
          <a href="#github-2" aria-label="GitHub">
            <LogoGithubIcon size={24} />
          </a>
          <a href="#linkedin-2">
            <Image alt="LinkedIn" src={linkedinLogo} />
          </a>
          <a href="#microsoft-3">
            <Image alt="Microsoft" src={microsoftLogo} />
          </a>
          <a href="#xbox-3">
            <Image alt="Xbox" src={xboxLogo} />
          </a>
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Linked full-color wordmarks, emphasis</LogoSuite.Heading>
        <LogoSuite.Logobar variant="emphasis">
          <a href="#microsoft-emphasis">
            <Image alt="Microsoft" src={microsoftLogo} />
          </a>
          <a href="#xbox-emphasis">
            <Image alt="Xbox" src={xboxLogo} />
          </a>
          <a href="#github-emphasis" aria-label="GitHub">
            <LogoGithubIcon size={24} />
          </a>
          <a href="#linkedin-emphasis">
            <Image alt="LinkedIn" src={linkedinLogo} />
          </a>
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Linked full-color wordmarks, marquee</LogoSuite.Heading>
        <LogoSuite.Logobar marquee>
          <a href="#microsoft-marquee">
            <Image alt="Microsoft" src={microsoftLogo} />
          </a>
          <a href="#xbox-marquee">
            <Image alt="Xbox" src={xboxLogo} />
          </a>
          <a href="#github-marquee" aria-label="GitHub">
            <LogoGithubIcon size={24} />
          </a>
          <a href="#linkedin-marquee">
            <Image alt="LinkedIn" src={linkedinLogo} />
          </a>
          <a href="#microsoft-marquee-2">
            <Image alt="Microsoft" src={microsoftLogo} />
          </a>
          <a href="#xbox-marquee-2">
            <Image alt="Xbox" src={xboxLogo} />
          </a>
          <a href="#github-marquee-2" aria-label="GitHub">
            <LogoGithubIcon size={24} />
          </a>
          <a href="#linkedin-marquee-2">
            <Image alt="LinkedIn" src={linkedinLogo} />
          </a>
          <a href="#microsoft-marquee-3">
            <Image alt="Microsoft" src={microsoftLogo} />
          </a>
          <a href="#xbox-marquee-3">
            <Image alt="Xbox" src={xboxLogo} />
          </a>
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Linked full-color icons, marquee</LogoSuite.Heading>
        <LogoSuite.Logobar marquee>
          <a href="#github-icon" aria-label="GitHub">
            <MarkGithubIcon size={44} />
          </a>
          <a href="#visual-studio-code" aria-label="Visual Studio Code">
            <VisualStudioCodeLogo />
          </a>
          <a href="#visual-studio" aria-label="Visual Studio">
            <VisualStudioLogo />
          </a>
          <a href="#azure" aria-label="Azure">
            <AzureLogo />
          </a>
          <a href="#microsoft-icon" aria-label="Microsoft">
            <MicrosoftLogo />
          </a>
          <a href="#microsoft-copilot" aria-label="Microsoft Copilot">
            <MicrosoftCopilotLogo />
          </a>
          <a href="#github-enterprise" aria-label="GitHub Enterprise">
            <MarkGithubIcon size={44} />
          </a>
          <a href="#github-copilot" aria-label="GitHub Copilot">
            <MicrosoftCopilotLogo />
          </a>
          <a href="#azure-2" aria-label="Azure">
            <AzureLogo />
          </a>
          <a href="#microsoft-icon-2" aria-label="Microsoft">
            <MicrosoftLogo />
          </a>
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Heading only, static logos + takeover button</LogoSuite.Heading>
        <LogoSuite.Logobar
          data-testid="gridline-hover-enabled-logobar"
          takeoverButton={{label: 'Learn more', href: '#'}}
        >
          <Image alt="Uber" src={uberLogo} />
          <Image alt="Vercel" src={vercelLogo} />
          <Image alt="Shopify" src={shopifyLogo} />
          <Image alt="Pinterest" src={pinterestLogo} />
          <Image alt="Twilio" src={twilioLogo} />
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Heading only, with marquee</LogoSuite.Heading>
        <LogoSuite.Logobar marquee>
          <Image alt="Uber" src={uberLogo} />
          <Image alt="Vercel" src={vercelLogo} />
          <Image alt="Shopify" src={shopifyLogo} />
          <Image alt="Pinterest" src={pinterestLogo} />
          <Image alt="Twilio" src={twilioLogo} />
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Heading + static logos</LogoSuite.Heading>
        <LogoSuite.Description>+ an optional description</LogoSuite.Description>
        <LogoSuite.Logobar>
          <Image alt="Uber" src={uberLogo} />
          <Image alt="Vercel" src={vercelLogo} />
          <Image alt="Shopify" src={shopifyLogo} />
          <Image alt="Pinterest" src={pinterestLogo} />
          <Image alt="Twilio" src={twilioLogo} />
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Heading + marquee</LogoSuite.Heading>
        <LogoSuite.Description>+ an optional description</LogoSuite.Description>
        <LogoSuite.Logobar marquee>
          <Image alt="Uber" src={uberLogo} />
          <Image alt="Vercel" src={vercelLogo} />
          <Image alt="Shopify" src={shopifyLogo} />
          <Image alt="Pinterest" src={pinterestLogo} />
          <Image alt="Twilio" src={twilioLogo} />
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Emphasis logobar variant</LogoSuite.Heading>
        <LogoSuite.Logobar variant="emphasis">{logos.slice(0, 5)}</LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Emphasis logobar variant, with marquee</LogoSuite.Heading>
        <LogoSuite.Logobar variant="emphasis" marquee>
          {logos.slice(0, 8)}
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline" hasDivider={false}>
        <LogoSuite.Heading>No bottom divider</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Condensed gap</LogoSuite.Heading>
        <LogoSuite.Logobar gap="condensed">{logos.slice(0, 6)}</LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Slow marquee speed</LogoSuite.Heading>
        <LogoSuite.Logobar marquee marqueeSpeed="slow">
          {logos.slice(0, 8)}
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline">
        <LogoSuite.Heading>Idle marquee (paused)</LogoSuite.Heading>
        <LogoSuite.Logobar marquee marqueeSpeed="idle">
          {logos.slice(0, 8)}
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline" align="start">
        <LogoSuite.Heading>Start alignment</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline" align="justify">
        <LogoSuite.Heading>Justified alignment</LogoSuite.Heading>
        <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
      </LogoSuite>
    </Stack>
  ),
  parameters: {
    layout: 'fullscreen',
    pseudo: {hover: ['[data-testid="gridline-hover-enabled-logobar"]']},
  },
}

export const GridLineExpressiveKitchenSink = () => (
  <Stack padding="none" gap="none">
    <Box paddingBlockStart={24}>
      <Text as="p" align="center" variant="muted">
        Kitchen sink of all features using the GridLine expressive variant
      </Text>
    </Box>
    <Box marginBlockStart={24} borderBlockStartWidth="thin" borderStyle="solid" borderColor="muted">
      <LogoSuite variant="gridline-expressive">
        <LogoSuite.Heading visuallyHidden>Visually hidden heading</LogoSuite.Heading>
        <LogoSuite.Logobar data-testid="hover-enabled-logobar">
          <Image alt="Uber" src={uberLogo} />
          <Image alt="Vercel" src={vercelLogo} />
          <Image alt="Shopify" src={shopifyLogo} />
          <Image alt="Pinterest" src={pinterestLogo} />
          <Image alt="Twilio" src={twilioLogo} />
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline-expressive">
        <LogoSuite.Heading visuallyHidden>Visually hidden heading</LogoSuite.Heading>
        <LogoSuite.Logobar data-testid="hover-enabled-logobar" marquee>
          <Image alt="Uber" src={uberLogo} />
          <Image alt="Vercel" src={vercelLogo} />
          <Image alt="Shopify" src={shopifyLogo} />
          <Image alt="Pinterest" src={pinterestLogo} />
          <Image alt="Twilio" src={twilioLogo} />
        </LogoSuite.Logobar>
      </LogoSuite>

      <LogoSuite variant="gridline-expressive">
        <LogoSuite.Heading>Heading only, static logos</LogoSuite.Heading>
        <LogoSuite.Logobar>
          <Image alt="Uber" src={uberLogo} />
          <Image alt="Vercel" src={vercelLogo} />
          <Image alt="Shopify" src={shopifyLogo} />
          <Image alt="Pinterest" src={pinterestLogo} />
          <Image alt="Twilio" src={twilioLogo} />
        </LogoSuite.Logobar>
      </LogoSuite>
    </Box>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Linked full-color wordmarks, static</LogoSuite.Heading>
      <LogoSuite.Logobar>
        <a href="#expressive-microsoft">
          <Image alt="Microsoft" src={microsoftLogo} />
        </a>
        <a href="#expressive-xbox">
          <Image alt="Xbox" src={xboxLogo} />
        </a>
        <a href="#expressive-github" aria-label="GitHub">
          <LogoGithubIcon size={24} />
        </a>
        <a href="#expressive-linkedin">
          <Image alt="LinkedIn" src={linkedinLogo} />
        </a>
        <a href="#expressive-microsoft-2">
          <Image alt="Microsoft" src={microsoftLogo} />
        </a>
        <a href="#expressive-xbox-2">
          <Image alt="Xbox" src={xboxLogo} />
        </a>
        <a href="#expressive-github-2" aria-label="GitHub">
          <LogoGithubIcon size={24} />
        </a>
        <a href="#expressive-linkedin-2">
          <Image alt="LinkedIn" src={linkedinLogo} />
        </a>
        <a href="#expressive-microsoft-3">
          <Image alt="Microsoft" src={microsoftLogo} />
        </a>
        <a href="#expressive-xbox-3">
          <Image alt="Xbox" src={xboxLogo} />
        </a>
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Linked full-color wordmarks, emphasis</LogoSuite.Heading>
      <LogoSuite.Logobar variant="emphasis">
        <a href="#expressive-microsoft-emphasis">
          <Image alt="Microsoft" src={microsoftLogo} />
        </a>
        <a href="#expressive-xbox-emphasis">
          <Image alt="Xbox" src={xboxLogo} />
        </a>
        <a href="#expressive-github-emphasis" aria-label="GitHub">
          <LogoGithubIcon size={24} />
        </a>
        <a href="#expressive-linkedin-emphasis">
          <Image alt="LinkedIn" src={linkedinLogo} />
        </a>
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Linked full-color wordmarks, marquee</LogoSuite.Heading>
      <LogoSuite.Logobar marquee>
        <a href="#expressive-microsoft-marquee">
          <Image alt="Microsoft" src={microsoftLogo} />
        </a>
        <a href="#expressive-xbox-marquee">
          <Image alt="Xbox" src={xboxLogo} />
        </a>
        <a href="#expressive-github-marquee" aria-label="GitHub">
          <LogoGithubIcon size={24} />
        </a>
        <a href="#expressive-linkedin-marquee">
          <Image alt="LinkedIn" src={linkedinLogo} />
        </a>
        <a href="#expressive-microsoft-marquee-2">
          <Image alt="Microsoft" src={microsoftLogo} />
        </a>
        <a href="#expressive-xbox-marquee-2">
          <Image alt="Xbox" src={xboxLogo} />
        </a>
        <a href="#expressive-github-marquee-2" aria-label="GitHub">
          <LogoGithubIcon size={24} />
        </a>
        <a href="#expressive-linkedin-marquee-2">
          <Image alt="LinkedIn" src={linkedinLogo} />
        </a>
        <a href="#expressive-microsoft-marquee-3">
          <Image alt="Microsoft" src={microsoftLogo} />
        </a>
        <a href="#expressive-xbox-marquee-3">
          <Image alt="Xbox" src={xboxLogo} />
        </a>
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Linked full-color icons, marquee</LogoSuite.Heading>
      <LogoSuite.Logobar marquee>
        <a href="#expressive-github-icon" aria-label="GitHub">
          <MarkGithubIcon size={44} />
        </a>
        <a href="#expressive-visual-studio-code" aria-label="Visual Studio Code">
          <VisualStudioCodeLogo />
        </a>
        <a href="#expressive-visual-studio" aria-label="Visual Studio">
          <VisualStudioLogo />
        </a>
        <a href="#expressive-azure" aria-label="Azure">
          <AzureLogo />
        </a>
        <a href="#expressive-microsoft-icon" aria-label="Microsoft">
          <MicrosoftLogo />
        </a>
        <a href="#expressive-microsoft-copilot" aria-label="Microsoft Copilot">
          <MicrosoftCopilotLogo />
        </a>
        <a href="#expressive-github-enterprise" aria-label="GitHub Enterprise">
          <MarkGithubIcon size={44} />
        </a>
        <a href="#expressive-github-copilot" aria-label="GitHub Copilot">
          <MicrosoftCopilotLogo />
        </a>
        <a href="#expressive-azure-2" aria-label="Azure">
          <AzureLogo />
        </a>
        <a href="#expressive-microsoft-icon-2" aria-label="Microsoft">
          <MicrosoftLogo />
        </a>
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Heading only, static logos + takeover button</LogoSuite.Heading>
      <LogoSuite.Logobar data-testid="hover-enabled-logobar" takeoverButton={{label: 'Learn more', href: '#'}}>
        <Image alt="Uber" src={uberLogo} />
        <Image alt="Vercel" src={vercelLogo} />
        <Image alt="Shopify" src={shopifyLogo} />
        <Image alt="Pinterest" src={pinterestLogo} />
        <Image alt="Twilio" src={twilioLogo} />
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Heading only, with marquee</LogoSuite.Heading>
      <LogoSuite.Logobar marquee>
        <Image alt="Uber" src={uberLogo} />
        <Image alt="Vercel" src={vercelLogo} />
        <Image alt="Shopify" src={shopifyLogo} />
        <Image alt="Pinterest" src={pinterestLogo} />
        <Image alt="Twilio" src={twilioLogo} />
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Heading + static logos</LogoSuite.Heading>
      <LogoSuite.Description>+ an optional description</LogoSuite.Description>
      <LogoSuite.Logobar>
        <Image alt="Uber" src={uberLogo} />
        <Image alt="Vercel" src={vercelLogo} />
        <Image alt="Shopify" src={shopifyLogo} />
        <Image alt="Pinterest" src={pinterestLogo} />
        <Image alt="Twilio" src={twilioLogo} />
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Heading + marquee</LogoSuite.Heading>
      <LogoSuite.Description>+ an optional description</LogoSuite.Description>
      <LogoSuite.Logobar marquee>
        <Image alt="Uber" src={uberLogo} />
        <Image alt="Vercel" src={vercelLogo} />
        <Image alt="Shopify" src={shopifyLogo} />
        <Image alt="Pinterest" src={pinterestLogo} />
        <Image alt="Twilio" src={twilioLogo} />
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Emphasis logobar variant</LogoSuite.Heading>
      <LogoSuite.Logobar variant="emphasis">{logos.slice(0, 5)}</LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Emphasis logobar variant, with marquee</LogoSuite.Heading>
      <LogoSuite.Logobar variant="emphasis" marquee>
        {logos.slice(0, 8)}
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive" hasDivider={false}>
      <LogoSuite.Heading>No bottom divider</LogoSuite.Heading>
      <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Condensed gap</LogoSuite.Heading>
      <LogoSuite.Logobar gap="condensed">{logos.slice(0, 6)}</LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Slow marquee speed</LogoSuite.Heading>
      <LogoSuite.Logobar marquee marqueeSpeed="slow">
        {logos.slice(0, 8)}
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive">
      <LogoSuite.Heading>Idle marquee (paused)</LogoSuite.Heading>
      <LogoSuite.Logobar marquee marqueeSpeed="idle">
        {logos.slice(0, 8)}
      </LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive" align="start">
      <LogoSuite.Heading>Start alignment</LogoSuite.Heading>
      <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
    </LogoSuite>

    <LogoSuite variant="gridline-expressive" align="justify">
      <LogoSuite.Heading>Justified alignment</LogoSuite.Heading>
      <LogoSuite.Logobar>{logos.slice(0, 4)}</LogoSuite.Logobar>
    </LogoSuite>
  </Stack>
)

GridLineExpressiveKitchenSink.storyName = 'GridLine expressive kitchen sink'

GridLineExpressiveKitchenSink.parameters = {
  layout: 'fullscreen',
  pseudo: {hover: ['[data-testid="hover-enabled-logobar"]']},
}
