import React from 'react'
import {Grid, Hero} from '../..'

export type HeaderHeroBlockProps = {
  heading: string
  description: string
  primaryCTA?: {
    href: string
    title: string
  }
  secondaryCTA?: {
    href: string
    title: string
  }
}

export const HeaderHeroBlock = ({heading, description, primaryCTA, secondaryCTA}: HeaderHeroBlockProps) => {
  return (
    <Grid>
      <Grid.Column>
        <Hero align="center">
          <Hero.Heading>{heading}</Hero.Heading>
          <Hero.Description>{description}</Hero.Description>
          {primaryCTA && <Hero.PrimaryAction href={primaryCTA.href}>{primaryCTA.title}</Hero.PrimaryAction>}
          {secondaryCTA && <Hero.SecondaryAction href={secondaryCTA.href}>{secondaryCTA.title}</Hero.SecondaryAction>}
        </Hero>
      </Grid.Column>
    </Grid>
  )
}
