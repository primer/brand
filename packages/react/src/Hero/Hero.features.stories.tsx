import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {HeartFillIcon, PlayIcon, StarFillIcon} from '@primer/octicons-react'

import {Hero} from '.'
import {Button} from '../Button'
import {ActionMenu} from '../ActionMenu'
import {Grid} from '../Grid'
import {EyebrowBanner} from '../EyebrowBanner'
import {InlineCode} from '../InlineCode'
import placeholderImage from '../fixtures/images/placeholder.png'

const meta = {
  title: 'Components/Hero/Features',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Centered: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Primary action
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const WithIncreasedContrastDescription: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description variant="default">
        This description has increased contrast for better readability. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Primary action
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const WithInlineCode: Story = {
  name: 'With InlineCode',
  render: () => (
    <Hero align="center">
      <Hero.Label>GitHub Copilot</Hero.Label>
      <Hero.Heading>Build and debug directly from your terminal</Hero.Heading>
      <Hero.Description>
        Use <InlineCode wrap={false}>/mcp</InlineCode> to connect your tools, then run{' '}
        <InlineCode>npm install @primer/react-brand@latest --save-exact</InlineCode> to update Primer Brand.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Get started
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const InlineCodeInHeadingAndDescription: Story = {
  render: () => (
    <Hero align="start">
      <Hero.Label>GitHub Copilot</Hero.Label>
      <Hero.Heading>
        Review with <InlineCode wrap={false}>/critique</InlineCode>, refine with{' '}
        <InlineCode wrap={false}>/typeset</InlineCode>, and finish with <InlineCode wrap={false}>/polish</InlineCode>
      </Hero.Heading>
      <Hero.Description>
        Connect <InlineCode wrap={false}>/mcp</InlineCode>, choose a model through{' '}
        <InlineCode wrap={false}>/model</InlineCode>, and delegate parallel tasks with{' '}
        <InlineCode wrap={false}>/fleet</InlineCode>.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Start building
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const WithAnimatedLabel: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label animate animationDelay={1000}>
        Animated label
      </Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description variant="muted">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Primary action
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const WithIncreasedContrastLabel: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label animate variant="default">
        Label with higher initial contrast
      </Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description variant="muted">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Primary action
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const WithPrimaryButton: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Label>GitHub Issues</Hero.Label>
      <Hero.Heading>Project planning for developers</Hero.Heading>
      <Hero.Description variant="muted">
        Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize
        large projects as tables, boards, or roadmaps, and automate everything with code.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Start using projects
        </Button>
        <Button as="a" href="#" trailingVisual={<PlayIcon />}>
          What is GitHub Issues
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const WithoutDescription: Story = {
  render: () => (
    <Hero>
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Primary action
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const WithLegacyPrimaryAndSecondaryActions: Story = {
  render: () => (
    <Hero>
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
      <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
    </Hero>
  ),
}

export const WithActionMenu: Story = {
  render: () => (
    <Hero>
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup>
        <ActionMenu mode="split-button">
          <ActionMenu.Button as="a" href="#test">
            Primary actions
          </ActionMenu.Button>
          <ActionMenu.Overlay aria-label="More actions">
            <ActionMenu.Item as="a" href="#contact-sales">
              Contact sales
            </ActionMenu.Item>
            <ActionMenu.Item as="a" href="#view-pricing">
              View pricing
            </ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
        <ActionMenu>
          <ActionMenu.Button>Secondary actions</ActionMenu.Button>
          <ActionMenu.Overlay aria-label="More actions">
            <ActionMenu.Item value="Contact sales">Contact sales</ActionMenu.Item>
            <ActionMenu.Item value="View pricing">View pricing</ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

const ExampleTrailingComponent = () => (
  <ActionMenu>
    <ActionMenu.Button>Open menu</ActionMenu.Button>
    <ActionMenu.Overlay aria-label="GitHub features">
      <ActionMenu.Item value="Copilot" selected>
        Copilot
      </ActionMenu.Item>
      <ActionMenu.Item value="Codespaces">Codespaces</ActionMenu.Item>
      <ActionMenu.Item value="CodeQL">CodeQL</ActionMenu.Item>
    </ActionMenu.Overlay>
  </ActionMenu>
)

export const WithTrailingComponent: Story = {
  render: () => (
    <Grid>
      <Grid.Column>
        <Hero trailingComponent={ExampleTrailingComponent}>
          <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
        </Hero>
      </Grid.Column>
    </Grid>
  ),
}

export const WithMediaTrailingComponent: Story = {
  render: () => (
    <Hero
      trailingComponent={() => (
        <picture>
          <img src={placeholderImage} alt="Placeholder trailing visual" width={64} height={64} />
        </picture>
      )}
    >
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>Build, scale, and deliver secure software with GitHub.</Hero.Description>
    </Hero>
  ),
}

export const WithCustomClassnames: Story = {
  render: () => (
    <Hero className="test-class" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading className="test-class">This is my super sweet hero heading</Hero.Heading>
      <Hero.Description className="test-class">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup className="test-class">
        <Button as="a" href="#" className="test-class">
          Primary action
        </Button>
        <Button as="a" href="#" className="test-class">
          Secondary action
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const WithCustomHeadingAndDescriptionSizes: Story = {
  render: () => (
    <Hero className="test-class" align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading size="4">This is my super sweet hero heading</Hero.Heading>
      <Hero.Description size="200">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#" className="test-class">
          Primary action
        </Button>
        <Button as="a" href="#" className="test-class">
          Secondary action
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const WithCustomIconAndVariant: Story = {
  name: 'With custom icon and variant',
  render: () => (
    <Hero align="center">
      <Hero.Label>Label</Hero.Label>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#" leadingVisual={<HeartFillIcon />}>
          Primary action with leading icon
        </Button>
        <Button as="a" href="#" trailingVisual={<StarFillIcon />} variant="subtle">
          Subtle action with trailing icon
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const NarrowView: Story = {
  render: () => (
    <Hero>
      <Hero.Label>Projects</Hero.Label>
      <Hero.Heading>Project planning for developers</Hero.Heading>
      <Hero.Description>
        Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize
        large projects as spreadsheets or boards, and automate everything with code.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Watch video
        </Button>
        <Button as="a" href="#">
          Start using project tables
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const NarrowViewCentered: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Heading>Project planning for developers</Hero.Heading>
      <Hero.Description>
        Create issues, break them into tasks, track relationships, add custom fields, and have conversations. Visualize
        large projects as spreadsheets or boards, and automate everything with code.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Watch video
        </Button>
        <Button as="a" href="#">
          Start using project tables
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const Eyebrow: Story = {
  render: args => (
    <Hero align={args.align}>
      <Hero.Eyebrow>
        <EyebrowBanner href="http://githubuniverse.com/">
          <EyebrowBanner.Visual>
            <img
              width="44"
              height="44"
              alt=""
              aria-hidden="true"
              src="https://github.githubassets.com/assets/eyebrow-23@2x-563f292d9e30.png"
            />
          </EyebrowBanner.Visual>
          <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
          <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
        </EyebrowBanner>
      </Hero.Eyebrow>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Primary action
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}

export const EyebrowCentered: Story = {
  render: () => (
    <Hero align="center">
      <Hero.Eyebrow>
        <EyebrowBanner href="http://githubuniverse.com/">
          <EyebrowBanner.Visual>
            <img
              width="44"
              height="44"
              alt=""
              aria-hidden="true"
              src="https://github.githubassets.com/assets/eyebrow-23@2x-563f292d9e30.png"
            />
          </EyebrowBanner.Visual>
          <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
          <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
        </EyebrowBanner>
      </Hero.Eyebrow>
      <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
      <Hero.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Hero.Description>
      <Hero.ButtonGroup>
        <Button as="a" href="#">
          Primary action
        </Button>
      </Hero.ButtonGroup>
    </Hero>
  ),
}
