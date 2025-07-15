import React, {useEffect} from 'react'
import type {Meta, StoryFn} from '@storybook/react'
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
import {waitFor} from '@testing-library/dom'

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

export const SubHeading = args => (
  <SubNav {...args}>
    <SubNav.Heading href="#">AI</SubNav.Heading>
    <SubNav.SubHeading href="#">Copilot</SubNav.SubHeading>
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
SubHeading.parameters = {
  layout: 'fullscreen',
}

export const SubHeadingNarrow = args => <SubHeading {...args} />
SubHeadingNarrow.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'iphonex',
  },
}

export const SubHeadingNarrowOpen = args => <SubHeading {...args} />
SubHeadingNarrowOpen.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'iphonex',
  },
}
SubHeadingNarrowOpen.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('SubNav-root-button'))
}

export const ActiveSubHeading = args => (
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
ActiveSubHeading.parameters = {
  layout: 'fullscreen',
}

export const ActiveSubHeadingNarrow = args => <ActiveSubHeading {...args} />
ActiveSubHeadingNarrow.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'iphonex',
  },
}

export const ActiveSubHeadingNarrowOpen = args => <ActiveSubHeading {...args} />
ActiveSubHeadingNarrowOpen.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'iphonex',
  },
}
ActiveSubHeadingNarrowOpen.play = async ({canvasElement}) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('SubNav-root-button'))
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

const AnchorNavVariantTemplate: StoryFn<typeof SubNav> = args => (
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

export const AnchorNavVariant = AnchorNavVariantTemplate.bind({})

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

export const AnchorNavDefaultLinkVariant = args => (
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
)

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

export const KeyboardNavigation = args => <NarrowDropdownVariant {...args} />

KeyboardNavigation.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'iphonex',
  },
}
KeyboardNavigation.play = async ({canvasElement}) => {
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
}

export const AnchorNavVariantKeyboardNavigation = AnchorNavVariant.bind({})

AnchorNavVariantKeyboardNavigation.play = async ({canvasElement}) => {
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
}
