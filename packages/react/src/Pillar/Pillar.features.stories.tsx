import React from 'react'
import type {StoryFn, Meta} from '@storybook/react'
import {Pillar, type PillarIconProps} from '.'
import {Stack} from '..'
import {CopilotIcon, RocketIcon, GitBranchIcon} from '@primer/octicons-react'

import placeholderImage from '../fixtures/images/placeholder.png'
import {logos} from '../LogoSuite/LogoSuite.fixtures'

export default {
  title: 'Components/Pillar/features',
  component: Pillar,
} as Meta<typeof Pillar>

export const WithIcon: StoryFn<typeof Pillar> = () => {
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

export const WithImage: StoryFn<typeof Pillar> = () => {
  return (
    <Pillar>
      <Pillar.Image
        aspectRatio="16:10"
        src={placeholderImage}
        alt="placeholder, blank area with a gray background color"
      />
      <Pillar.Heading>Code search & code view</Pillar.Heading>
      <Pillar.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Pillar.Description>
    </Pillar>
  )
}

export const WithIconSVG = () => (
  <Pillar>
    <Pillar.Icon hasBackground={false} icon={logos[4]} />
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
    heading: 'Collaboration is the key to DevOps success',
    description: 'Everything you need to know about getting started with GitHub Actions.',
  },
  {
    href: 'https://github.com',
    icon: <RocketIcon />,
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
    heading: 'How healthy teams build better software',
    description: (
      <React.Fragment>Everything you need to know about getting started with GitHub Actions.</React.Fragment>
    ),
  },
]

type FixtureData = {
  href: string
  icon: PillarIconProps['icon']
  heading: string | React.ReactElement | React.ReactElement[]
  description: string | React.ReactElement | React.ReactElement[]
}[]

export const Stacked: StoryFn<typeof Pillar> = () => {
  return (
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="spacious" padding="spacious">
      {fixtureData.map(({heading, description, icon}, id) => {
        return (
          <Pillar key={id} style={{flex: 1}}>
            <Pillar.Icon icon={icon} />
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
      {fixtureData.map(({heading, description, icon}, id) => {
        return (
          <Pillar align="center" key={id} style={{flex: 1}}>
            <Pillar.Icon icon={icon} />
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
      {fixtureData.map(({heading, description, icon, href}, id) => {
        return (
          <Pillar key={id} style={{flex: 1}}>
            <Pillar.Icon icon={icon} />
            <Pillar.Heading>{heading}</Pillar.Heading>
            <Pillar.Description>{description}</Pillar.Description>
            <Pillar.Link href={href}>Read the documentation</Pillar.Link>
          </Pillar>
        )
      })}
    </Stack>
  )
}

export const FullWidth: StoryFn<typeof Pillar> = () => {
  return (
    <Pillar fullWidth>
      <Pillar.Image
        aspectRatio="16:10"
        src={placeholderImage}
        alt="placeholder, blank area with a gray background color"
      />
      <Pillar.Heading>Code search & code view</Pillar.Heading>
      <Pillar.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Pillar.Description>
    </Pillar>
  )
}

export const WithBorder: StoryFn<typeof Pillar> = () => {
  return (
    <Pillar hasBorder>
      <Pillar.Image
        aspectRatio="16:10"
        src={placeholderImage}
        alt="placeholder, blank area with a gray background color"
      />
      <Pillar.Heading>Code search & code view</Pillar.Heading>
      <Pillar.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Pillar.Description>
    </Pillar>
  )
}
