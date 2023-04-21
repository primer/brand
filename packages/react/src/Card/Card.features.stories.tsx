import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {Card, CardIconColors} from '.'
import {Text, Stack, LabelColors} from '..'
import {CopilotIcon, RocketIcon, GitBranchIcon} from '@primer/octicons-react'

export default {
  title: 'Components/Card/features',
  component: Card
} as ComponentMeta<typeof Card>

export const CTAText: ComponentStory<typeof Card> = () => {
  return (
    <Card ctaText="Dicover how" href="https://github.com">
      <Card.Heading>GitHub Actions cheat sheet</Card.Heading>
      <Card.Description>
        In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.
      </Card.Description>
    </Card>
  )
}

export const Label: ComponentStory<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Label>Limited</Card.Label>
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const Icon: ComponentStory<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Icon icon={CopilotIcon} color="purple" hasBackground />
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const IconAndLabel: ComponentStory<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Icon icon={GitBranchIcon} color="purple" hasBackground />
      <Card.Label color="blue-purple">Beta</Card.Label>
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

const fixtureData: FixtureData = [
  {
    href: 'https://github.com',
    icon: CopilotIcon,
    iconColor: 'indigo',
    heading: 'Collaboration is the key to DevOps success',
    description: 'Everything you need to know about getting started with GitHub Actions.'
  },
  {
    href: 'https://github.com',
    icon: RocketIcon,
    iconColor: 'purple',
    heading: 'GitHub Actions cheat sheet',
    description: (
      <React.Fragment>
        <p>
          In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps.{' '}
          <Text size="300" variant="muted">
            Must be associated with a current GitHub for Startups partner.
          </Text>
        </p>
      </React.Fragment>
    )
  },
  {
    href: 'https://github.com',
    icon: GitBranchIcon,
    iconColor: 'teal',
    heading: 'How healthy teams build better software',
    description: (
      <React.Fragment>
        <p>Everything you need to know about getting started with GitHub Actions.</p>
      </React.Fragment>
    )
  }
]

type FixtureData = {
  href: string
  icon?: React.ReactNode
  iconColor?: typeof CardIconColors[number]
  label?: string
  labelColor?: typeof LabelColors[number]
  heading: string | React.ReactElement | React.ReactElement[]
  description: string | React.ReactElement | React.ReactElement[]
}[]

export const Stacked: ComponentStory<typeof Card> = () => {
  return (
    <Stack direction="horizontal" gap={'spacious'}>
      {fixtureData.map(({heading, description, href, icon, iconColor}, id) => {
        return (
          <Card key={id} href={href}>
            <Card.Icon icon={icon} hasBackground color={iconColor} />
            <Card.Heading>{heading}</Card.Heading>
            <Card.Description>{description}</Card.Description>
          </Card>
        )
      })}
    </Stack>
  )
}
