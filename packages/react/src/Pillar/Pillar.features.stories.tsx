import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {Pillar, type PillarIconProps} from '.'
import {InlineCode, Stack} from '..'
import {CopilotIcon, RocketIcon, GitBranchIcon} from '@primer/octicons-react'

import placeholderImage from '../fixtures/images/placeholder.png'
import {logos} from '../LogoSuite/LogoSuite.fixtures'

const meta = {
  title: 'Components/Pillar/features',
  component: Pillar,
} satisfies Meta<typeof Pillar>

export default meta
type Story = StoryObj<typeof meta>

export const WithIcon: Story = {
  render: () => (
    <Pillar>
      <Pillar.Icon icon={<RocketIcon />} />
      <Pillar.Heading>Code search & code view</Pillar.Heading>
      <Pillar.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Pillar.Description>
    </Pillar>
  ),
}

export const WithImage: Story = {
  render: () => (
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
  ),
}

export const WithInlineCode: Story = {
  name: 'With InlineCode',
  render: () => (
    <Pillar>
      <Pillar.Icon icon={<CopilotIcon />} />
      <Pillar.Heading>
        Connect your tools with <InlineCode>/mcp</InlineCode>
      </Pillar.Heading>
      <Pillar.Description>
        Run <InlineCode>npm install @primer/react-brand@latest --save-exact</InlineCode> to update Primer Brand.
      </Pillar.Description>
    </Pillar>
  ),
}

export const InlineCodeStacked: Story = {
  render: () => (
    <Stack direction={{narrow: 'vertical', regular: 'horizontal'}} gap="spacious" padding="spacious">
      <Pillar style={{flex: 1}}>
        <Pillar.Icon icon={<CopilotIcon />} />
        <Pillar.Heading>
          Review designs with <InlineCode>/critique</InlineCode>
        </Pillar.Heading>
        <Pillar.Description>
          Run <InlineCode>/typeset</InlineCode> to refine typography, then use <InlineCode>/polish</InlineCode> for a
          final pass.
        </Pillar.Description>
      </Pillar>
      <Pillar style={{flex: 1}}>
        <Pillar.Icon icon={<GitBranchIcon />} />
        <Pillar.Heading>
          Connect repositories through <InlineCode>/mcp</InlineCode>
        </Pillar.Heading>
        <Pillar.Description>
          Search <InlineCode>/issues</InlineCode>, inspect <InlineCode>/labels</InlineCode>, and summarize the next
          task.
        </Pillar.Description>
      </Pillar>
      <Pillar style={{flex: 1}}>
        <Pillar.Icon icon={<RocketIcon />} />
        <Pillar.Heading>
          Ship changes using <InlineCode>/fleet</InlineCode>
        </Pillar.Heading>
        <Pillar.Description>
          Select a model with <InlineCode>/model</InlineCode> and execute independent work in parallel.
        </Pillar.Description>
      </Pillar>
    </Stack>
  ),
}

export const WithIconSVG: Story = {
  name: 'Icon (native)',
  render: () => (
    <Pillar>
      <Pillar.Icon hasBackground={false} icon={logos[4]} />
      <Pillar.Heading>Code search & code view</Pillar.Heading>
      <Pillar.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Pillar.Description>
    </Pillar>
  ),
}

export const Link: Story = {
  render: () => (
    <Pillar>
      <Pillar.Heading>Code search & code view</Pillar.Heading>
      <Pillar.Description>
        Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
      </Pillar.Description>
      <Pillar.Link href="https://github.com">Read the documentation</Pillar.Link>
    </Pillar>
  ),
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

export const Stacked: Story = {
  render: () => (
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
  ),
}

export const StackedCentered: Story = {
  render: () => (
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
  ),
}

export const StackedWithLink: Story = {
  render: () => (
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
  ),
}

export const FullWidth: Story = {
  render: () => (
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
  ),
}

export const WithBorder: Story = {
  render: () => (
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
  ),
}
