import React from 'react'
import {Meta} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {linkTo} from '@storybook/addon-links'

import {SubNav} from './SubNav'
import {Box} from '../Box'
import {Hero} from '../Hero'
import {Grid} from '../Grid'
import {Heading} from '../Heading'
import {Text} from '../Text'
import {RedlineBackground} from '../component-helpers'
import {Stack} from '../Stack'
import {expect, userEvent, within} from '@storybook/test'
import {Button} from '../Button'

export default {
  title: 'Components/SubNav/Features',
  component: SubNav,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as Meta<typeof SubNav>

export const DropdownVariant = ({hasShadow, ...args}) => (
  <main>
    <Box paddingBlockStart={64} backgroundColor="subtle" style={{position: 'relative', zIndex: 32}}></Box>
    <SubNav {...args} hasShadow={hasShadow}>
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
DropdownVariant.parameters = {
  layout: 'fullscreen',
}

export const NarrowDropdownVariant = args => <DropdownVariant {...args} />
NarrowDropdownVariant.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'iphonex',
  },
}

export const NarrowDropdownVariantMenuOpen = args => <NarrowDropdownVariant {...args} />

NarrowDropdownVariantMenuOpen.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'iphonex',
  },
}
NarrowDropdownVariantMenuOpen.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('SubNav-root-button'))
  const overlayMenu = canvas.getByTestId('SubNav-root-overlay')
  const firstLink = within(overlayMenu).getAllByRole('link')[0]
  expect(firstLink).toHaveFocus()
}

export const WithShadow = args => <DropdownVariant {...args} hasShadow={true} />
WithShadow.parameters = {
  layout: 'fullscreen',
}

export const FullWidth = args => (
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
FullWidth.parameters = {
  layout: 'fullscreen',
}

export const FullWidthNarrow = args => <FullWidth {...args} />
FullWidthNarrow.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'iphonex',
  },
}

export const LongerHeading = args => (
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
LongerHeading.parameters = {
  layout: 'fullscreen',
}

const AnchorNavVariantData = {
  ['Scale']: 'scale',
  ['AI']: 'ai',
  ['Security']: 'security',
  ['Reliability']: 'reliability',
}

export const AnchorNavVariant = args => (
  <main>
    <Box paddingBlockStart={64} backgroundColor="subtle" style={{position: 'relative', zIndex: 32}}></Box>
    <SubNav {...args}>
      <SubNav.Heading
        href="https://github.com/enterprise/"
        onClick={e => {
          e.preventDefault()
          linkTo('Components/SubNav/Features', 'AnchorNavVariant')
        }}
      >
        Enterprise
      </SubNav.Heading>
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
AnchorNavVariant.parameters = {
  layout: 'fullscreen',
}

const customViewports = {
  Narrow: {
    name: 'Narrow',
    styles: {
      width: '280px',
      height: '600px',
    },
  },
}

export const NarrowAnchorNavVariant = args => <AnchorNavVariant {...args} />
NarrowAnchorNavVariant.parameters = {
  layout: 'fullscreen',
  viewport: {
    viewports: customViewports,
    defaultViewport: 'Narrow',
  },
}

export const NarrowAnchorNavVariantMenuOpen = args => <NarrowAnchorNavVariant {...args} />
NarrowAnchorNavVariantMenuOpen.parameters = {
  layout: 'fullscreen',
  viewport: {
    viewports: customViewports,
    defaultViewport: 'Narrow',
  },
}
NarrowAnchorNavVariantMenuOpen.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('SubNav-root-button'))
  const overlayMenu = canvas.getByTestId('SubNav-root-overlay')
  const firstLink = within(overlayMenu).getAllByRole('link')[0]
  expect(firstLink).toHaveFocus()
}
