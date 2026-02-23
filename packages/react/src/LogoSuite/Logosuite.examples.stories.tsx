import React from 'react'
import type {Meta} from '@storybook/react'
import {LogoSuite} from './LogoSuite'
import {Hero} from '../Hero'
import {logos} from './LogoSuite.fixtures'
import defaultPlaceholderImgae from '../fixtures/images/placeholder.png'
import {Box} from '../Box'

export default {
  title: 'Components/LogoSuite/Examples',
  component: LogoSuite,
} as Meta<typeof LogoSuite>

export const FollowingHero = () => (
  <Box paddingBlockEnd={24}>
    <Hero variant="gridline-expressive">
      <Hero.Heading>The AI Powered Developer Platform.</Hero.Heading>
      <Hero.Description>To Build, Scale, and Deliver Secure Software.</Hero.Description>
      <Hero.PrimaryAction href="#">Start a free trial</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#" hasArrow={false}>
        Contact sales
      </Hero.SecondaryAction>
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
)

FollowingHero.parameters = {
  layout: 'fullscreen',
}

export const WithLinks = () => (
  <>
    <LogoSuite>
      <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
      <LogoSuite.Logobar>
        {logos.slice(0, 4).map(logo => (
          <a href="/#" key={logo.key}>
            {logo}
          </a>
        ))}
      </LogoSuite.Logobar>
    </LogoSuite>
    <LogoSuite>
      <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
      <LogoSuite.Logobar marquee>
        {logos.slice(0, 8).map(logo => (
          <a href="/#" key={logo.key}>
            {logo}
          </a>
        ))}
      </LogoSuite.Logobar>
    </LogoSuite>
  </>
)
