import React from 'react'
import {StoryFn, Meta} from '@storybook/react'
import clsx from 'clsx'
import {Pillar, PillarIconColors} from '.'
import {Stack, Grid, FrostedGlassVFX, Box, ThemeProvider, Image} from '..'
import {CopilotIcon, RocketIcon, GitBranchIcon} from '@primer/octicons-react'
import startShape from '../fixtures/images/testimonial-bg-1.png'
import endShape from '../fixtures/images/testimonial-bg-2.png'

import styles from './Pillar.stories.module.css'

export default {
  title: 'Components/Pillar/features',
  component: Pillar,
} as Meta<typeof Pillar>

export const Icon: StoryFn<typeof Pillar> = () => {
  return (
    <Pillar>
      <Pillar.Icon icon={<RocketIcon />} />
      <Pillar.Heading>Code search & code view</Pillar.Heading>
      <Pillar.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Pillar.Description>
    </Pillar>
  )
}

export const IconColors: StoryFn<typeof Pillar> = () => {
  return (
    <Grid>
      {PillarIconColors.map((color, id) => {
        return (
          <Grid.Column key={id} span={4}>
            <Pillar>
              <Pillar.Icon icon={<CopilotIcon />} color={color} />
              <Pillar.Heading>Collaboration is the key to DevOps success</Pillar.Heading>
              <Pillar.Description>
                This Pillar uses the <b>{color}</b> icon color
              </Pillar.Description>
            </Pillar>
          </Grid.Column>
        )
      })}
    </Grid>
  )
}

export const WithIconSVG = () => (
  <Pillar>
    <Pillar.Icon
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="56"
          viewBox="0 0 56 56"
          width="56"
          aria-label="GitHub Actions marketing icon"
        >
          <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeWidth="2" transform="translate(5 5)">
            <g strokeLinejoin="round" transform="translate(5 4)">
              <g transform="translate(12)">
                <g stroke="#2088ff">
                  <path d="m0 5h20" />
                  <path d="m0 1h10" />
                  <path d="m0 14h20" />
                  <path d="m0 10h10" />
                </g>
                <path d="m0 30h10" stroke="#79b8ff" />
                <path d="m0 34h10" stroke="#79b8ff" />
              </g>
              <g stroke="#79b8ff">
                <rect height="6" rx="3" width="6" y="29" />
                <path d="m12 20h10" />
                <path d="m12 24h17" />
                <rect height="6" rx="3" width="6" y="19" />
              </g>
            </g>
            <g strokeLinejoin="round">
              <path
                d="m39.0491803 31.0125732c4.4182609 0 8 3.5817392 8 8 0 4.4182609-3.5817391 8-8 8-4.4182608 0-8-3.5817391-8-8 0-4.4182608 3.5817392-8 8-8z"
                stroke="#2088ff"
              />
              <path
                d="m38.116802 35.7611499 3.845906 2.3959271c.4687613.2920296.6120308.9087724.3200013 1.3775338-.0820762.1317473-.1936951.2425793-.3260199.3237212l-3.8459059 2.3583203c-.4708158.2887056-1.0865296.141076-1.3752352-.3297398-.0964582-.1573023-.1475125-.338226-.1475125-.5227477v-4.7542474c0-.5522847.4477152-1 1-1 .1869258 0 .3701096.0523925.5287662.1512325z"
                fillRule="nonzero"
                stroke="#2088ff"
              />
              <path d="m0 38v-36c0-1.15997107.77207302-2 2-2h38c1.227927 0 2 .84002893 2 2v25" stroke="#79b8ff" />
            </g>
            <path d="m8.01306152 30v2" fillRule="nonzero" stroke="#79b8ff" />
            <g stroke="#2088ff" strokeLinejoin="round">
              <path d="m10.5599344 15-3.06918743 3.0651125-1.49074697-1.4854753" />
              <path d="m10.5599344 6-3.06918743 3.06511252-1.49074697-1.4854753" />
            </g>
          </g>
        </svg>
      }
    />
    <Pillar.Heading>Code search & code view</Pillar.Heading>
    <Pillar.Description>
      Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
    </Pillar.Description>
  </Pillar>
)
WithIconSVG.storyName = 'Icon (native)'

export const Link: StoryFn<typeof Pillar> = () => {
  return (
    <Pillar>
      <Pillar.Heading>Code search & code view</Pillar.Heading>
      <Pillar.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Pillar.Description>
      <Pillar.Link href="https://github.com">Read the documentation</Pillar.Link>
    </Pillar>
  )
}

const fixtureData: FixtureData = [
  {
    href: 'https://github.com',
    icon: <CopilotIcon />,
    iconColor: PillarIconColors[5],
    heading: 'Collaboration is the key to DevOps success',
    description: 'Everything you need to know about getting started with GitHub Actions.',
  },
  {
    href: 'https://github.com',
    icon: <RocketIcon />,
    iconColor: PillarIconColors[5],
    heading: 'GitHub Actions cheat sheet and more',
    description: (
      <React.Fragment>
        In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps. Must be associated
        with a current GitHub for Startups partner.
      </React.Fragment>
    ),
  },
  {
    href: 'https://github.com',
    icon: <GitBranchIcon />,
    iconColor: PillarIconColors[5],
    heading: 'How healthy teams build better software',
    description: (
      <React.Fragment>Everything you need to know about getting started with GitHub Actions.</React.Fragment>
    ),
  },
]

type FixtureData = {
  href: string
  icon?: React.ReactNode
  iconColor?: (typeof PillarIconColors)[number]
  heading: string | React.ReactElement | React.ReactElement[]
  description: string | React.ReactElement | React.ReactElement[]
}[]

export const Stacked: StoryFn<typeof Pillar> = () => {
  return (
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="spacious" padding="spacious">
      {fixtureData.map(({heading, description, icon, iconColor}, id) => {
        return (
          <Pillar key={id} style={{flex: 1}}>
            <Pillar.Icon icon={icon} color={iconColor} />
            <Pillar.Heading>{heading}</Pillar.Heading>
            <Pillar.Description>{description}</Pillar.Description>
          </Pillar>
        )
      })}
    </Stack>
  )
}

export const StackedCentered: StoryFn<typeof Pillar> = () => {
  return (
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="spacious" padding="spacious">
      {fixtureData.map(({heading, description, icon, iconColor}, id) => {
        return (
          <Pillar align="center" key={id} style={{flex: 1}}>
            <Pillar.Icon icon={icon} color={iconColor} />
            <Pillar.Heading>{heading}</Pillar.Heading>
            <Pillar.Description>{description}</Pillar.Description>
          </Pillar>
        )
      })}
    </Stack>
  )
}

export const StackedWithLink: StoryFn<typeof Pillar> = () => {
  return (
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="spacious" padding="spacious">
      {fixtureData.map(({heading, description, icon, iconColor, href}, id) => {
        return (
          <Pillar key={id} style={{flex: 1}}>
            <Pillar.Icon icon={icon} color={iconColor} />
            <Pillar.Heading>{heading}</Pillar.Heading>
            <Pillar.Description>{description}</Pillar.Description>
            <Pillar.Link href={href}>Read the documentation</Pillar.Link>
          </Pillar>
        )
      })}
    </Stack>
  )
}

export const FrostedGlassEffect: StoryFn<typeof Pillar> = () => {
  return (
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="spacious" padding="spacious">
      {fixtureData.map(({heading, description, icon, iconColor}, id) => {
        return (
          <FrostedGlassVFX key={id}>
            <Box backgroundColor="subtle" borderRadius="xlarge" padding="normal">
              <Pillar key={id} style={{flex: 1}}>
                <Pillar.Icon icon={icon} color={iconColor} />
                <Pillar.Heading>{heading}</Pillar.Heading>
                <Pillar.Description>{description}</Pillar.Description>
              </Pillar>
            </Box>
          </FrostedGlassVFX>
        )
      })}
    </Stack>
  )
}
FrostedGlassEffect.decorators = [
  Story => (
    <ThemeProvider colorMode="light" className={styles.container} tabIndex={0}>
      <Box backgroundColor="subtle" paddingBlockStart={128} paddingBlockEnd={128} className={styles.innerContainer}>
        <Image src={startShape} alt="Starting shape" className={clsx(styles.exampleShape)} width={612} />
        <Image src={endShape} alt="Ending shape" className={styles.exampleShape} width={612} />
        <Grid>
          <Grid.Column>
            <Story />
          </Grid.Column>
        </Grid>
      </Box>
    </ThemeProvider>
  ),
]
FrostedGlassEffect.parameters = {
  layout: 'full',
}
