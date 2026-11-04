import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {LogoGithubIcon, MarkGithubIcon} from '@primer/octicons-react'
import {LogoSuite} from './LogoSuite'
import {Hero} from '../Hero'
import {logos} from './LogoSuite.fixtures'
import defaultPlaceholderImgae from '../fixtures/images/placeholder.png'
import {Box} from '../Box'
import {Image} from '../Image'
import {AzureLogo} from '../fixtures/third-party-logos/AzureLogo'
import {MicrosoftCopilotLogo} from '../fixtures/third-party-logos/MicrosoftCopilotLogo'
import {MicrosoftLogo} from '../fixtures/third-party-logos/MicrosoftLogo'
import {VisualStudioCodeLogo} from '../fixtures/third-party-logos/VisualStudioCodeLogo'
import {VisualStudioLogo} from '../fixtures/third-party-logos/VisualStudioLogo'

import linkedinLogo from '../fixtures/images/logos/linkedin-color.svg'
import microsoftLogo from '../fixtures/images/logos/microsoft-color.svg'
// Official Xbox asset from uhf.microsoft.com/images/xbox/RW4ESm.png.
import xboxLogo from '../fixtures/images/logos/xbox-color.png'

const meta = {
  title: 'Components/LogoSuite/Examples',
  component: LogoSuite,
} satisfies Meta<typeof LogoSuite>

export default meta
type Story = StoryObj<typeof meta>

export const FollowingHero: Story = {
  render: () => (
    <Box paddingBlockEnd={24}>
      <Hero variant="gridline-expressive">
        <Hero.Heading>The AI Powered Developer Platform.</Hero.Heading>
        <Hero.Description>To Build, Scale, and Deliver Secure Software.</Hero.Description>
        <Hero.PrimaryAction href="#">Start a free trial</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">Contact sales</Hero.SecondaryAction>
        <Hero.Image
          position="block-end"
          src={defaultPlaceholderImgae}
          alt="placeholder image, blank with gray solid fill"
        />
      </Hero>

      <LogoSuite variant="gridline-expressive">
        <LogoSuite.Heading visuallyHidden>Our customers</LogoSuite.Heading>
        <LogoSuite.Logobar marquee marqueeSpeed="slow">
          {logos.slice(0, 8)}
        </LogoSuite.Logobar>
      </LogoSuite>
    </Box>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const WithLinks: Story = {
  render: () => (
    <>
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Featured platforms</LogoSuite.Heading>
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
      <LogoSuite>
        <LogoSuite.Heading visuallyHidden>Featured platforms marquee</LogoSuite.Heading>
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
    </>
  ),
}

export const WithLinkedIcons: Story = {
  render: () => (
    <LogoSuite variant="gridline">
      <LogoSuite.Heading>More ways to get started with GitHub Copilot</LogoSuite.Heading>
      <LogoSuite.Logobar marquee>
        <a href="#github" aria-label="GitHub">
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
        <a href="#microsoft" aria-label="Microsoft">
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
        <a href="#microsoft-2" aria-label="Microsoft">
          <MicrosoftLogo />
        </a>
      </LogoSuite.Logobar>
    </LogoSuite>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    colorMode: 'dark',
  },
}
