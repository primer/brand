import React, {useCallback, useEffect, useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {SubNav, SubNavProps} from './SubNav'
import {Box} from '../Box'
import {Hero} from '../Hero'
import {Grid} from '../Grid'
import {Heading} from '../Heading'
import {Text} from '../Text'
import {RedlineBackground} from '../component-helpers'
import {Stack} from '../Stack'
import {expect, userEvent, within} from 'storybook/test'
import {Button} from '../Button'
import {waitFor} from '@testing-library/dom'

const meta = {
  title: 'Components/SubNav/Features',
  component: SubNav,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SubNav>

export default meta
type Story = StoryObj<SubNavProps>

const DropdownTemplate = (args: SubNavProps) => {
  return (
    <main>
      <Box paddingBlockStart={64} backgroundColor="subtle" style={{position: 'relative', zIndex: 32}}></Box>
      <SubNav {...args}>
        <SubNav.Heading href="#">Features</SubNav.Heading>
        <SubNav.Link href="#">Actions</SubNav.Link>
        <SubNav.Link href="#">Packages</SubNav.Link>
        <SubNav.Link href="#">Security</SubNav.Link>
        <SubNav.Link href="#">Codespaces</SubNav.Link>
        <SubNav.Link href="#" aria-current="page">
          Copilot
          <SubNav.SubMenu>
            <SubNav.Link href="#">Copilot feature page one</SubNav.Link>
            <SubNav.Link href="#">Copilot feature page two</SubNav.Link>
            <SubNav.Link href="#">Copilot feature page three</SubNav.Link>
            <SubNav.Link href="#">Copilot feature page four</SubNav.Link>
          </SubNav.SubMenu>
        </SubNav.Link>
        <SubNav.Link href="#">Code review</SubNav.Link>
        <SubNav.Link href="#">Search</SubNav.Link>
        <SubNav.Link href="#">Issues</SubNav.Link>
        <SubNav.Link href="#">Discussions</SubNav.Link>
      </SubNav>
      <Grid>
        <Grid.Column>
          <Hero align="center">
            <Hero.Label>Copilot Enterprise</Hero.Label>
            <Hero.Heading>The world&apos;s most widely adopted AI tool.</Hero.Heading>
            <Hero.PrimaryAction href="#">Get started with Copilot</Hero.PrimaryAction>
          </Hero>
        </Grid.Column>
      </Grid>
    </main>
  )
}

export const DropdownVariant: Story = {
  render: DropdownTemplate,
}

export const NarrowDropdownVariant: Story = {
  render: args => <DropdownTemplate {...args} />,
  globals: {
    viewport: {value: 'iphonex'},
  },
}

export const NarrowDropdownVariantMenuOpen: Story = {
  render: args => <DropdownTemplate {...args} />,
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByTestId('SubNav-root-button'))
    const overlayMenu = canvas.getByTestId('SubNav-root-overlay')
    const firstLink = within(overlayMenu).getAllByRole('link')[0]
    expect(firstLink).toHaveFocus()
  },
}

export const WithShadow: Story = {
  render: args => <DropdownTemplate {...args} hasShadow />,
}

const SubHeadingTemplate = (args: SubNavProps) => (
  <SubNav {...args}>
    <SubNav.Heading href="#">AI</SubNav.Heading>
    <SubNav.SubHeading href="#">GitHub Copilot</SubNav.SubHeading>
    <SubNav.Link href="#">For business</SubNav.Link>
    <SubNav.Link href="#" aria-current="page">
      Extensions
    </SubNav.Link>
    <SubNav.Link href="#">Tutorials</SubNav.Link>
    <SubNav.Link href="#">
      What&apos;s new
      <SubNav.SubMenu>
        <SubNav.Link href="#">Sub-feature page one</SubNav.Link>
        <SubNav.Link href="#">Sub-feature page two</SubNav.Link>
        <SubNav.Link href="#">Sub-feature page three</SubNav.Link>
        <SubNav.Link href="#">Sub-feature page four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href="#">Plans & pricing</SubNav.Link>
    <SubNav.Action href="#">Call to action</SubNav.Action>
  </SubNav>
)

export const SubHeading: Story = {
  render: SubHeadingTemplate,
}

export const SubHeadingNarrow: Story = {
  render: SubHeadingTemplate,
  globals: {
    viewport: {value: 'iphonex'},
  },
}

export const SubHeadingNarrowOpen: Story = {
  render: SubHeadingTemplate,
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByTestId('SubNav-root-button'))
  },
}

const ActiveSubHeadingTemplate = (args: SubNavProps) => (
  <SubNav {...args}>
    <SubNav.Heading href="#">AI</SubNav.Heading>
    <SubNav.SubHeading href="#" aria-current="page">
      Copilot
    </SubNav.SubHeading>
    <SubNav.Link href="#">For business</SubNav.Link>
    <SubNav.Link href="#">Extensions</SubNav.Link>
    <SubNav.Link href="#">Tutorials</SubNav.Link>
    <SubNav.Link href="#">
      What&apos;s new
      <SubNav.SubMenu>
        <SubNav.Link href="#">Sub-feature page one</SubNav.Link>
        <SubNav.Link href="#">Sub-feature page two</SubNav.Link>
        <SubNav.Link href="#">Sub-feature page three</SubNav.Link>
        <SubNav.Link href="#">Sub-feature page four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href="#">Plans & pricing</SubNav.Link>
    <SubNav.Action href="#">Call to action</SubNav.Action>
  </SubNav>
)

export const ActiveSubHeading: Story = {
  render: ActiveSubHeadingTemplate,
}

export const ActiveSubHeadingNarrow: Story = {
  render: ActiveSubHeadingTemplate,
  globals: {
    viewport: {value: 'iphonex'},
  },
}

export const ActiveSubHeadingNarrowOpen: Story = {
  render: ActiveSubHeadingTemplate,
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByTestId('SubNav-root-button'))
  },
}

const FullWidthTemplate = (args: SubNavProps) => (
  <SubNav {...args} fullWidth>
    <SubNav.Heading href="#">Features</SubNav.Heading>
    <SubNav.Link href="#">Actions</SubNav.Link>
    <SubNav.Link href="#">Packages</SubNav.Link>
    <SubNav.Link href="#">Security</SubNav.Link>
    <SubNav.Link href="#">Codespaces</SubNav.Link>
    <SubNav.Link href="#" aria-current="page">
      Copilot
      <SubNav.SubMenu>
        <SubNav.Link href="#">Copilot feature page one</SubNav.Link>
        <SubNav.Link href="#">Copilot feature page two</SubNav.Link>
        <SubNav.Link href="#">Copilot feature page three</SubNav.Link>
        <SubNav.Link href="#">Copilot feature page four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href="#">Code review</SubNav.Link>
    <SubNav.Link href="#">Search</SubNav.Link>
    <SubNav.Action href="#">Call to action</SubNav.Action>
  </SubNav>
)

export const FullWidth: Story = {
  render: FullWidthTemplate,
}

export const FullWidthNarrow: Story = {
  render: FullWidthTemplate,
  globals: {
    viewport: {value: 'iphonex'},
  },
}

const LongerHeadingTemplate = (args: SubNavProps) => (
  <SubNav {...args} fullWidth>
    <SubNav.Heading href="#">A longer heading</SubNav.Heading>
    <SubNav.Link href="#">Actions</SubNav.Link>
    <SubNav.Link href="#">Packages</SubNav.Link>
    <SubNav.Link href="#">Security</SubNav.Link>
    <SubNav.Link href="#">Codespaces</SubNav.Link>
    <SubNav.Link href="#" aria-current="page">
      Copilot
      <SubNav.SubMenu>
        <SubNav.Link href="#">Copilot feature page one</SubNav.Link>
        <SubNav.Link href="#">Copilot feature page two</SubNav.Link>
        <SubNav.Link href="#">Copilot feature page three</SubNav.Link>
        <SubNav.Link href="#">Copilot feature page four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href="#">Code review</SubNav.Link>
    <SubNav.Link href="#">Search</SubNav.Link>
    <SubNav.Action href="#">Call to action</SubNav.Action>
  </SubNav>
)

export const LongerHeading: Story = {
  render: LongerHeadingTemplate,
}

const AnchorNavVariantData = {
  ['Scale']: 'scale',
  ['AI']: 'ai',
  ['Security']: 'security',
  ['Reliability']: 'reliability',
}

const AnchorNavVariantTemplate = (args: SubNavProps) => (
  <main>
    <Box paddingBlockStart={64} backgroundColor="subtle" style={{position: 'relative', zIndex: 32}}></Box>
    <SubNav {...args}>
      <SubNav.Heading href="https://github.com/enterprise/">Enterprise</SubNav.Heading>
      <SubNav.Link href="#" aria-current="page">
        Overview
        <SubNav.SubMenu variant="anchor">
          {Object.entries(AnchorNavVariantData).map(([label, href]) => (
            <SubNav.Link key={label} href={`#${href}`}>
              {label}
            </SubNav.Link>
          ))}
        </SubNav.SubMenu>
      </SubNav.Link>
      <SubNav.Link href="https://github.com/enterprise/advanced-security">Advanced Security</SubNav.Link>
      <SubNav.Link href="https://github.com/features/copilot#enterprise">Copilot Enterprise</SubNav.Link>
      <SubNav.Link href="https://github.com/premium-support">Premium Support</SubNav.Link>
    </SubNav>
    <Box style={{paddingBlockEnd: '100dvh'}}>
      {Object.entries(AnchorNavVariantData).map(([key, value]) => (
        <RedlineBackground key={key} style={{scrollPaddingTop: 64}}>
          <Stack key={value} id={value} direction="vertical" style={{justifyContent: 'center', height: 1000}}>
            <Heading>{key}</Heading>
            <Text as="p">SubNav is a component that allows users to navigate to different sections of a page.</Text>
            <Button>Learn more</Button>
          </Stack>
        </RedlineBackground>
      ))}
    </Box>
  </main>
)

export const AnchorNavVariant: Story = {
  render: AnchorNavVariantTemplate,
}

export const NarrowAnchorNavVariant: Story = {
  render: AnchorNavVariantTemplate,
  globals: {
    viewport: {value: 'iphone5'},
  },
}

export const NarrowAnchorNavVariantMenuOpen: Story = {
  render: AnchorNavVariantTemplate,
  globals: {
    viewport: {value: 'iphone5'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByTestId('SubNav-root-button'))
    const overlayMenu = canvas.getByTestId('SubNav-root-overlay')
    const firstLink = within(overlayMenu).getAllByRole('link')[0]
    expect(firstLink).toHaveFocus()
  },
}

export const AnchorNavDefaultLinkVariant: Story = {
  render: args => (
    <SubNav {...args}>
      <SubNav.Heading href="#">Heading</SubNav.Heading>
      <SubNav.Link href="#" variant="default">
        Link
      </SubNav.Link>
      <SubNav.Link href="#" variant="default">
        Link
      </SubNav.Link>
      <SubNav.Link href="#" variant="default">
        Link
      </SubNav.Link>
      <SubNav.Link href="#" variant="default">
        Link
      </SubNav.Link>
      <SubNav.Link href="#" variant="default">
        Link
      </SubNav.Link>
      <SubNav.Link href="#" variant="default">
        Link
      </SubNav.Link>
      <SubNav.Action href="#">Primary CTA</SubNav.Action>
    </SubNav>
  ),
}

export const ForwardedRefs = () => {
  const subNavRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | null>(null)

  useEffect(() => {
    if (subNavRef.current) {
      setHeight(subNavRef.current.offsetHeight)
    }
  }, [subNavRef])

  return (
    <>
      <SubNav ref={subNavRef}>
        <SubNav.Heading href="#">Heading</SubNav.Heading>
        <SubNav.Link href="#">Link </SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Link href="#">Link</SubNav.Link>
        <SubNav.Action href="#">Primary CTA</SubNav.Action>
      </SubNav>
      <Box paddingBlockStart={64}>
        <Text as="p" align="center">
          SubNav rendered height: {height}px
        </Text>
      </Box>
    </>
  )
}

export const KeyboardNavigation: Story = {
  render: DropdownTemplate,
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const {getByRole} = within(canvasElement)

    const expandButton = getByRole('button', {name: 'Navigation menu. Current page: Copilot'})
    await userEvent.click(expandButton)
    expect(expandButton).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Actions'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Packages'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Security'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Codespaces'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Copilot'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Copilot feature page one'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Copilot feature page two'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Copilot feature page three'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Copilot feature page four'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Code review'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Search'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Issues'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Discussions'})).toHaveFocus()

    await userEvent.tab()
    // We have to wait here because the focus trap we're using takes a moment to update the focus
    waitFor(() => {
      expect(getByRole('link', {name: 'Features'})).toHaveFocus()
    })

    await userEvent.tab()
    expect(expandButton).toHaveFocus()

    await userEvent.tab({shift: true})
    expect(getByRole('link', {name: 'Features'})).toHaveFocus()

    await userEvent.tab({shift: true})
    expect(getByRole('link', {name: 'Discussions'})).toHaveFocus()
  },
}

export const AnchorNavVariantKeyboardNavigation: Story = {
  render: AnchorNavVariantTemplate,
  play: async ({canvasElement}) => {
    const {getByRole, getAllByRole} = within(canvasElement)

    await userEvent.tab()
    expect(getByRole('link', {name: 'Enterprise'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Overview'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Advanced Security'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Copilot Enterprise'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Premium Support'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Scale'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'AI'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Security'})).toHaveFocus()

    await userEvent.tab()
    expect(getByRole('link', {name: 'Reliability'})).toHaveFocus()

    await userEvent.tab()
    expect(getAllByRole('button', {name: 'Learn more'})[0]).toHaveFocus()

    await userEvent.tab({shift: true})
    expect(getByRole('link', {name: 'Reliability'})).toHaveFocus()

    await userEvent.tab({shift: true})
    expect(getByRole('link', {name: 'Security'})).toHaveFocus()

    await userEvent.tab({shift: true})
    expect(getByRole('link', {name: 'AI'})).toHaveFocus()

    await userEvent.tab({shift: true})
    expect(getByRole('link', {name: 'Scale'})).toHaveFocus()

    await userEvent.tab({shift: true})
    expect(getByRole('link', {name: 'Premium Support'})).toHaveFocus()
  },
}

const NoActiveLinksTemplate = (args: SubNavProps) => (
  <main>
    <Box paddingBlockStart={64} backgroundColor="subtle" style={{position: 'relative', zIndex: 32}}></Box>
    <SubNav {...args}>
      <SubNav.Heading href="#">Features</SubNav.Heading>
      <SubNav.Link href="#">Actions</SubNav.Link>
      <SubNav.Link href="#">Packages</SubNav.Link>
      <SubNav.Link href="#">Security</SubNav.Link>
      <SubNav.Link href="#">Codespaces</SubNav.Link>
      <SubNav.Link href="#">Copilot</SubNav.Link>
      <SubNav.Link href="#">Code review</SubNav.Link>
      <SubNav.Link href="#">Search</SubNav.Link>
      <SubNav.Link href="#">Issues</SubNav.Link>
      <SubNav.Link href="#">Discussions</SubNav.Link>
      <SubNav.Action href="#">Get started</SubNav.Action>
    </SubNav>
    <Grid>
      <Grid.Column>
        <Hero align="center">
          <Hero.Label>GitHub Features</Hero.Label>
          <Hero.Heading>Choose the tools that work best for your team.</Hero.Heading>
          <Hero.Description>
            This story demonstrates the SubNav component when no links have aria-current=&quot;page&quot; set, which
            should result in no separator being visible according to the test expectations.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Explore features</Hero.PrimaryAction>
        </Hero>
      </Grid.Column>
    </Grid>
  </main>
)

export const NoActiveLinks: Story = {
  name: 'With no aria-current set',
  render: NoActiveLinksTemplate,
}

export const NoActiveLinksNarrow: Story = {
  name: 'With no aria-current set (narrow)',
  render: NoActiveLinksTemplate,
  globals: {
    viewport: {value: 'iphonex'},
  },
}

const DelayedActiveTemplate = (args: SubNavProps) => {
  const [activeLink, setActiveLink] = useState<string | null>(null)

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault()
    setActiveLink(null)
    setTimeout(() => {
      setActiveLink(label)
    }, 500)
  }, [])

  useEffect(() => {
    // set an initial active link after a delay
    const delay = setTimeout(() => {
      setActiveLink('Actions')
    }, 1000)

    return () => clearTimeout(delay)
  }, [])

  return (
    <main>
      <Box paddingBlockStart={64} backgroundColor="subtle" style={{position: 'relative', zIndex: 32}}></Box>
      <SubNav {...args}>
        <SubNav.Heading href="#">Features</SubNav.Heading>
        {['Actions', 'Packages', 'Security', 'Codespaces', 'Copilot', 'Code review', 'Search'].map(label => (
          <SubNav.Link
            key={label}
            href="#"
            aria-current={activeLink === label ? 'page' : undefined}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, label)}
          >
            {label}
          </SubNav.Link>
        ))}
      </SubNav>
      <Grid>
        <Grid.Column>
          <Hero align="center">
            <Hero.Label>GitHub Features</Hero.Label>
            <Hero.Heading>Choose the tools that work best for your team.</Hero.Heading>
            <Hero.Description>
              This story shows active link handling. Specifically, how it doesn&apos;t cause layout shift when
              navigating between sub nav links.
            </Hero.Description>
          </Hero>
        </Grid.Column>
      </Grid>
    </main>
  )
}

export const DelayedActiveLink: Story = {
  name: 'Delayed active link (layout shift test)',
  render: DelayedActiveTemplate,
}
