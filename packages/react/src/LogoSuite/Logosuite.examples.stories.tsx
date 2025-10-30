import React from 'react'
import type {Meta} from '@storybook/react'
import {LogoSuite} from './LogoSuite'
import {Grid} from '../Grid'
import {Hero} from '../Hero'
import {logos} from './LogoSuite.fixtures'

export default {
  title: 'Components/LogoSuite/Examples',
  component: LogoSuite,
} as Meta<typeof LogoSuite>

export const FollowingHero = () => (
  <>
    <Grid>
      <Grid.Column>
        <Hero align="center">
          <Hero.Heading>The AI Powered Developer Platform.</Hero.Heading>
          <Hero.Description size="500">To Build, Scale, and Deliver Secure Software.</Hero.Description>
          <Hero.PrimaryAction href="#">Start a free trial</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#" hasArrow={false}>
            Contact sales
          </Hero.SecondaryAction>
        </Hero>
      </Grid.Column>
    </Grid>
    <LogoSuite hasDivider={false}>
      <LogoSuite.Heading visuallyHidden>Our customers</LogoSuite.Heading>
      <LogoSuite.Logobar marquee marqueeSpeed="slow">
        {logos.slice(0, 4)}
      </LogoSuite.Logobar>
    </LogoSuite>
  </>
)

export const WithLinks = () => (
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
)
