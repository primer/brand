import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {Card, CardIconColors} from '.'
import {Stack, LabelColors} from '..'
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
      <Card.Icon icon={RocketIcon} />
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const IconColors: ComponentStory<typeof Card> = () => {
  return (
    <Stack padding={'none'} direction="horizontal" gap={'normal'} style={{flexWrap: 'wrap'}}>
      {CardIconColors.map((color, id) => {
        return (
          <Card key={id} href="https://github.com" style={{maxWidth: '25%'}}>
            <Card.Icon icon={CopilotIcon} hasBackground color={color} />
            <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
            <Card.Description>
              This Card uses the <b>{color}</b> icon color
            </Card.Description>
          </Card>
        )
      })}
    </Stack>
  )
}

export const WithIconSVG = () => (
  <Card href="https://github.com">
    <Card.Icon
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20">
          <path
            d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"
            fill="currentColor"
          ></path>
        </svg>
      }
      hasBackground
      color="purple"
    />
    <Card.Heading>Code search & code view</Card.Heading>
    <Card.Description>
      Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
    </Card.Description>
  </Card>
)
WithIconSVG.storyName = 'Icon (native)'

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

export const Image: ComponentStory<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="" />
      <Card.Heading>Code search & code view</Card.Heading>
      <Card.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Card.Description>
    </Card>
  )
}

export const ImageAndLabel: ComponentStory<typeof Card> = () => {
  return (
    <Card href="https://github.com">
      <Card.Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="" />
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
    heading: 'GitHub Actions cheat sheet and more',
    description: (
      <React.Fragment>
        In a recent TechTarget study, 70 percent of organizations reported they had adopted DevOps. Must be associated
        with a current GitHub for Startups partner.
      </React.Fragment>
    )
  },
  {
    href: 'https://github.com',
    icon: GitBranchIcon,
    iconColor: 'teal',
    heading: 'How healthy teams build better software',
    description: <React.Fragment>Everything you need to know about getting started with GitHub Actions.</React.Fragment>
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
    <Stack padding={'none'} direction="horizontal" gap={'normal'}>
      {fixtureData.map(({heading, description, href, icon, iconColor}, id) => {
        return (
          <Card key={id} href={href} style={{width: '33.3333%'}}>
            <Card.Icon icon={icon} hasBackground color={iconColor} />
            <Card.Heading>{heading}</Card.Heading>
            <Card.Description>{description}</Card.Description>
          </Card>
        )
      })}
    </Stack>
  )
}
