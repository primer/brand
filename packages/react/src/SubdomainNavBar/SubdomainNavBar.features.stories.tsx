import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {GlobeIcon} from '@primer/octicons-react'
import {expect, userEvent, within} from 'storybook/test'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {waitFor} from '@testing-library/dom'

import {ActionMenu, Button, Heading, Hero, Link, River, SubdomainNavBar, Text, Token} from '..'
import type {SubdomainNavBarHandle} from '.'
import placeholderImage from '../fixtures/images/placeholder.png'
import {groupedSearchResults, navigationLinks, searchResults} from './SubdomainNavBar.stories.fixtures'

type MetaProps = React.ComponentProps<typeof SubdomainNavBar>

const meta = {
  title: 'Components/SubdomainNavBar/Features',
  component: SubdomainNavBar,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        desktop1440: {
          name: 'Desktop 1440',
          styles: {
            width: '1440px',
            height: '900px',
          },
          type: 'desktop',
        },
        desktop1024: {
          name: 'Desktop 1024',
          styles: {
            width: '1024px',
            height: '768px',
          },
          type: 'desktop',
        },
        tablet800: {
          name: 'Tablet 800',
          styles: {
            width: '800px',
            height: '900px',
          },
          type: 'tablet',
        },
      },
    },
  },
} satisfies Meta<MetaProps>

export default meta

type Story = StoryObj<MetaProps>

const withFullPageFixture = Story => (
  <div style={{display: 'flow-root'}}>
    <Story />
    <div style={{maxWidth: 1280, margin: '100px auto'}}>
      <Hero align="center">
        <Hero.Heading>This is my super sweet Nav Bar</Hero.Heading>
        <Hero.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
          turpis felis nam pulvinar risus elementum.
        </Hero.Description>
        <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
        <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
      </Hero>
      <Heading as="h2" style={{textAlign: 'center'}}>
        ...
      </Heading>
      <River>
        <River.Visual>
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        </River.Visual>
        <River.Content>
          <Heading>Heading</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
      <River align="end">
        <River.Visual>
          <img src={placeholderImage} alt="placeholder, blank area with a gray background color" />
        </River.Visual>
        <River.Content>
          <Heading>Heading</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
    </div>
  </div>
)

export const NoSearch: Story = {
  decorators: [withFullPageFixture],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/">
      {navigationLinks.slice(0, 6).map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
}

export const SearchOpen: Story = {
  decorators: [withFullPageFixture],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/">
      {navigationLinks.slice(0, 6).map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
  parameters: {
    axe: {
      timeout: 5000,
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Search Site title search'}))
    await expect(canvas.getByRole('combobox')).toHaveFocus()
  },
}

export const SearchResultsVisible: Story = {
  decorators: [withFullPageFixture],
  render: function Render() {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [visibleSearchResults, setVisibleSearchResults] = React.useState<typeof searchResults | undefined>([])
    const [searchTerm, setSearchTerm] = React.useState('')

    const handleChange = () => {
      if (!inputRef.current) return
      if (inputRef.current.value.length === 0) {
        setVisibleSearchResults(undefined)
        return
      }
      if (inputRef.current.value.length > 2) {
        window.setTimeout(() => setVisibleSearchResults(searchResults), 1000)
        setSearchTerm(inputRef.current.value)
      }
    }

    return (
      <SubdomainNavBar title="Site title" titleHref="/">
        {navigationLinks.slice(0, 6).map(link => (
          <SubdomainNavBar.Link key={link} href={`#${link}`}>
            {link
              .toLowerCase()
              .split(' ')
              .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
              .join(' ')}
          </SubdomainNavBar.Link>
        ))}
        <SubdomainNavBar.Search
          ref={inputRef}
          searchTerm={searchTerm}
          searchResults={visibleSearchResults}
          onSubmit={event => event.preventDefault()}
          onChange={handleChange}
        />
        <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
        <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
      </SubdomainNavBar>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Search Site title search'}))
    await userEvent.type(canvas.getByRole('combobox'), 'devops')
    await expect(canvas.getByRole('combobox')).toHaveFocus()
  },
}

export const SearchKeyboardShortcut: Story = {
  render: function Render() {
    const [searchTerm, setSearchTerm] = React.useState('')

    return (
      <>
        <SubdomainNavBar title="GitHub Docs" titleHref="/" fullWidth fixed={false}>
          <SubdomainNavBar.Link href="#guides">Guides</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#api">API</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#changelog">Changelog</SubdomainNavBar.Link>
          <SubdomainNavBar.Search
            placeholder="Search docs"
            keyboardShortcut="/"
            searchTerm={searchTerm}
            searchResults={[]}
            onSubmit={event => event.preventDefault()}
            onChange={event => setSearchTerm(event.currentTarget.value)}
          />
          <SubdomainNavBar.PrimaryAction href="#start">Get started</SubdomainNavBar.PrimaryAction>
        </SubdomainNavBar>
        <Text as="p" style={{margin: '32px auto', maxWidth: 1280, padding: '0 24px'}}>
          Press <kbd style={{fontFamily: 'var(--brand-fontStack-monospace)'}}>/</kbd> to open search.
        </Text>
      </>
    )
  },
  play: ({canvasElement}) => {
    canvasElement.ownerDocument.defaultView?.focus()
  },
}

export const SearchCustomKeyboardShortcut: Story = {
  render: function Render() {
    const [searchTerm, setSearchTerm] = React.useState('')

    return (
      <>
        <SubdomainNavBar title="GitHub Docs" titleHref="/" fullWidth fixed={false}>
          <SubdomainNavBar.Link href="#guides">Guides</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#api">API</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#changelog">Changelog</SubdomainNavBar.Link>
          <SubdomainNavBar.Search
            placeholder="Search docs"
            keyboardShortcut="Command+Option+k"
            shortcutLabel="⌘+⌥+k"
            searchTerm={searchTerm}
            searchResults={[]}
            onSubmit={event => event.preventDefault()}
            onChange={event => setSearchTerm(event.currentTarget.value)}
          />
          <SubdomainNavBar.PrimaryAction href="#start">Get started</SubdomainNavBar.PrimaryAction>
        </SubdomainNavBar>
        <Text as="p" style={{margin: '32px auto', maxWidth: 1280, padding: '0 24px'}}>
          Press <kbd style={{fontFamily: 'var(--brand-fontStack-monospace)'}}>⌘+⌥+k</kbd> to open search.
        </Text>
      </>
    )
  },
  play: ({canvasElement}) => {
    canvasElement.ownerDocument.defaultView?.focus()
  },
}

export const GroupedSearchResultsVisible: Story = {
  render: () => (
    <SubdomainNavBar title="GitHub Docs" titleHref="/" fullWidth fixed={false}>
      <SubdomainNavBar.Link href="#item-1">Item 1</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#item-2">Item 2</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#item-3">Item 3</SubdomainNavBar.Link>
      <SubdomainNavBar.Search
        placeholder="Search ..."
        keyboardShortcut="/"
        searchTerm="How do i"
        searchResults={groupedSearchResults}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.SecondaryAction href="#">Contact sales</SubdomainNavBar.SecondaryAction>
      <SubdomainNavBar.PrimaryAction href="#">Get started</SubdomainNavBar.PrimaryAction>
    </SubdomainNavBar>
  ),
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Search ... search'}))
    await expect(canvas.getByRole('dialog')).toBeVisible()
    await expect(canvas.getAllByRole('option')).toHaveLength(7)
  },
  name: 'Grouped Search Results Visible',
}

export const OverflowMenuOpen: Story = {
  decorators: [withFullPageFixture],
  tags: ['visual-viewport-1440x900', 'visual-screenshot-viewport'],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/">
      {navigationLinks.map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
  globals: {
    viewport: {value: 'desktop1440'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await canvasElement.ownerDocument.fonts.ready
    const moreButton = canvas.getByRole('button', {name: 'More'})
    await waitFor(() => expect(moreButton).toBeVisible())
    const firstOverflowedItem = canvasElement.querySelector('[data-navitemid][aria-hidden="true"]')
    await expect(firstOverflowedItem).not.toBeVisible()
    await userEvent.click(moreButton)
    await expect(moreButton).toHaveAttribute('aria-expanded', 'true')
    const resourcesLink = canvas.getByRole('link', {name: 'Resources'})
    await expect(resourcesLink).toBeVisible()
    await expect(resourcesLink.closest('[id]')).toBeVisible()
  },
  name: 'Overflow Menu Open',
}

export const DesktopPillStates: Story = {
  tags: ['visual-viewport-1440x900'],
  render: () => (
    <SubdomainNavBar title="Site title">
      <SubdomainNavBar.Link href="#default">Default</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#hover">Hover</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#focus">Focus</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#current" aria-current="page">
        Current
      </SubdomainNavBar.Link>
    </SubdomainNavBar>
  ),
  globals: {
    viewport: {value: 'desktop1440'},
  },
  parameters: {
    pseudo: {
      hover: ['a[href="#hover"]'],
      focusVisible: ['a[href="#focus"]'],
    },
  },
}

export const TabletView: Story = {
  decorators: [withFullPageFixture],
  tags: ['visual-viewport-800x900'],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/">
      {navigationLinks.slice(0, 6).map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
  globals: {
    viewport: {value: 'tablet800'},
  },
  parameters: {
    pseudo: {
      focusVisible: ['[data-testid="SubdomainNavBar-menuButton"]'],
    },
  },
  name: 'Tablet View',
}

export const TabletMenuOpen: Story = {
  name: 'Tablet Menu Open',
  tags: ['visual-viewport-800x900'],
  render: function Render() {
    const [selectedLanguage, setSelectedLanguage] = React.useState('English')

    return (
      <SubdomainNavBar
        title="GitHub Docs"
        titleHref="/"
        fullWidth
        fixed={false}
        leadingComponent={<Token>v1.5.3</Token>}
        trailingComponent={
          <ActionMenu size="small" onSelect={setSelectedLanguage} selectionVariant="single">
            <ActionMenu.Button variant="secondary" leadingVisual={<GlobeIcon />}>
              {selectedLanguage}
            </ActionMenu.Button>
            <ActionMenu.Overlay aria-label="Select language">
              {['English', 'Deutsch', 'Español', 'Français', '日本語'].map(language => (
                <ActionMenu.Item key={language} value={language} selected={language === selectedLanguage}>
                  {language}
                </ActionMenu.Item>
              ))}
            </ActionMenu.Overlay>
          </ActionMenu>
        }
      >
        <SubdomainNavBar.Link href="#default">Default</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#hover">Hover</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#focus">Focus</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#active">Active</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#current" aria-current="page">
          Current
        </SubdomainNavBar.Link>
        <SubdomainNavBar.Search
          placeholder="Search ..."
          keyboardShortcut="/"
          searchTerm="How do i"
          searchResults={groupedSearchResults}
          onSubmit={event => event.preventDefault()}
          onChange={() => undefined}
        />
        <SubdomainNavBar.SecondaryAction href="#">Contact sales</SubdomainNavBar.SecondaryAction>
        <SubdomainNavBar.PrimaryAction href="#">Get started</SubdomainNavBar.PrimaryAction>
      </SubdomainNavBar>
    )
  },
  globals: {
    viewport: {value: 'tablet800'},
  },
  parameters: {
    pseudo: {
      hover: ['a[href="#hover"]'],
      focusVisible: ['a[href="#focus"]', '[data-testid="SubdomainNavBar-menuButton"]'],
      active: ['a[href="#active"]'],
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const searchButton = canvas.getByRole('button', {name: 'Search ... search'})
    await userEvent.click(canvas.getByRole('button', {name: 'Menu'}))

    const closeButton = canvas.getByRole('button', {name: 'Close'})
    const menu = canvasElement.ownerDocument.getElementById(closeButton.getAttribute('aria-controls') as string)
    const searchRect = searchButton.parentElement?.getBoundingClientRect()
    const menuRect = menu?.getBoundingClientRect()
    const navBarRect = closeButton.closest('header')?.getBoundingClientRect()
    const menuStyles = menu ? getComputedStyle(menu) : undefined
    const closeButtonStyles = getComputedStyle(closeButton)
    const closeIconBars = closeButton.querySelector('[aria-hidden="true"]')?.children
    const menuContent = menu?.firstElementChild
    const leadingComponent = menuContent?.firstElementChild
    const linkList = menuContent?.lastElementChild
    const menuFooter = menu?.lastElementChild
    const actionArea = menuFooter?.firstElementChild
    const trailingComponent = menuFooter?.lastElementChild
    const backdrop = canvasElement.querySelector('.SubdomainNavBar-menu-backdrop')

    await expect(closeButton).toHaveAttribute('aria-expanded', 'true')
    await expect(closeButtonStyles.zIndex).toBe('3')
    await expect(
      Array.from(closeIconBars ?? []).every(bar => {
        const barStyles = getComputedStyle(bar)
        const [originX, originY] = barStyles.transformOrigin.split(' ').map(Number.parseFloat)

        return originX === Number.parseFloat(barStyles.width) / 2 && originY === Number.parseFloat(barStyles.height) / 2
      }),
    ).toBe(true)
    await expect(Math.abs((menuRect?.left ?? 0) - (searchRect?.left ?? 0))).toBeLessThanOrEqual(1)
    await expect(Math.abs((menuRect?.right ?? 0) - (navBarRect?.right ?? 0))).toBeLessThanOrEqual(1)
    await expect(menuStyles?.borderInlineStartWidth).toBe('1px')
    await expect(menuStyles?.borderInlineEndWidth).toBe('1px')
    await expect(menuStyles?.borderBlockEndWidth).toBe('1px')
    await expect(menuStyles?.borderBlockEndColor).toBe(menuStyles?.borderInlineStartColor)
    await expect(getComputedStyle(leadingComponent as Element).borderBlockEndWidth).toBe('0px')
    await expect(getComputedStyle(linkList as Element).borderBlockStartWidth).toBe('1px')
    await expect(getComputedStyle(linkList as Element).borderBlockEndWidth).toBe('0px')
    await expect(getComputedStyle(menuFooter as Element).borderBlockStartWidth).toBe('1px')
    await expect(getComputedStyle(actionArea as Element).borderBlockStartWidth).toBe('0px')
    await expect(getComputedStyle(trailingComponent as Element).borderBlockStartWidth).toBe('1px')
    await expect(backdrop).toBeInTheDocument()
    await expect(getComputedStyle(backdrop as Element).animationName).toBe('fade-in')
  },
}

export const MobileView: Story = {
  decorators: [withFullPageFixture],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/">
      {navigationLinks.slice(0, 6).map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
  globals: {
    viewport: {value: 'iphonex'},
  },
}

export const MobileMenuOpen: Story = {
  decorators: [withFullPageFixture],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/">
      {navigationLinks.slice(0, 6).map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Menu'}))
    const closeButton = canvas.getByRole('button', {name: 'Close'})
    const menu = canvasElement.ownerDocument.getElementById(closeButton.getAttribute('aria-controls') as string)
    const linkList = menu?.firstElementChild?.lastElementChild
    const menuFooter = menu?.lastElementChild
    const actionArea = menuFooter?.firstElementChild
    const backdrop = canvasElement.querySelector('.SubdomainNavBar-menu-backdrop')
    await expect(closeButton).toHaveAttribute('aria-expanded', 'true')
    await expect(getComputedStyle(closeButton).zIndex).toBe('3')
    await expect(menu?.getBoundingClientRect().height).toBeGreaterThan(0)
    await expect(getComputedStyle(linkList as Element).borderBlockEndWidth).toBe('0px')
    await expect(getComputedStyle(menuFooter as Element).borderBlockStartWidth).toBe('1px')
    await expect(getComputedStyle(actionArea as Element).borderBlockStartWidth).toBe('0px')
    await expect(backdrop).toBeInTheDocument()
    await expect(getComputedStyle(backdrop as Element).animationName).toBe('fade-in')
  },
}

export const MobileMenuOpenManyItems: Story = {
  decorators: [withFullPageFixture],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/">
      {navigationLinks.slice(0, 10).map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
  globals: {
    viewport: {value: 'iphone5'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Menu'}))
  },
}

export const MobileSearchResultsVisible: Story = {
  decorators: [withFullPageFixture],
  render: function Render() {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [visibleSearchResults, setVisibleSearchResults] = React.useState<typeof searchResults | undefined>([])
    const [searchTerm, setSearchTerm] = React.useState('')

    const handleChange = () => {
      if (!inputRef.current) return
      if (inputRef.current.value.length === 0) {
        setVisibleSearchResults(undefined)
        return
      }
      if (inputRef.current.value.length > 2) {
        window.setTimeout(() => setVisibleSearchResults(searchResults), 1000)
        setSearchTerm(inputRef.current.value)
      }
    }

    return (
      <SubdomainNavBar title="Site title" titleHref="/">
        {navigationLinks.slice(0, 6).map(link => (
          <SubdomainNavBar.Link key={link} href={`#${link}`}>
            {link
              .toLowerCase()
              .split(' ')
              .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
              .join(' ')}
          </SubdomainNavBar.Link>
        ))}
        <SubdomainNavBar.Search
          ref={inputRef}
          searchTerm={searchTerm}
          searchResults={visibleSearchResults}
          onSubmit={event => event.preventDefault()}
          onChange={handleChange}
        />
        <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
        <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
      </SubdomainNavBar>
    )
  },
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Search Site title search'}))
    await userEvent.type(canvas.getByRole('combobox'), 'devops')
    await expect(canvas.getByRole('combobox')).toHaveFocus()
  },
}

export const MobileNoLinks: Story = {
  render: () => <SubdomainNavBar title="Subdomain" />,
  globals: {
    viewport: {value: 'iphonex'},
  },
}

export const MobileLeadingComponentOnlyMenuOpen: Story = {
  render: () => <SubdomainNavBar title="Subdomain" leadingComponent={<Token>v1.5.3</Token>} />,
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Menu'}))
  },
}

export const NoOverflow: Story = {
  name: 'No overflow menu (1 link)',
  decorators: [withFullPageFixture],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/">
      <SubdomainNavBar.Link href="#collections">Collections</SubdomainNavBar.Link>
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
}

export const LongerTitle: Story = {
  decorators: [withFullPageFixture],
  render: () => (
    <SubdomainNavBar title="Brand and Marketing" titleHref="/">
      {navigationLinks.slice(0, 6).map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
}

export const FullWidth: Story = {
  decorators: [withFullPageFixture],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/" fullWidth>
      {navigationLinks.slice(0, 6).map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
}

export const WithLeadingComponent: Story = {
  decorators: [withFullPageFixture],
  render: () => (
    <SubdomainNavBar title="Site title" titleHref="/" leadingComponent={<Token>v1.5.3</Token>}>
      {navigationLinks.slice(0, 6).map(link => (
        <SubdomainNavBar.Link key={link} href={`#${link}`}>
          {link
            .toLowerCase()
            .split(' ')
            .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
            .join(' ')}
        </SubdomainNavBar.Link>
      ))}
      <SubdomainNavBar.Search
        searchTerm=""
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
  name: 'With Leading Component',
}

export const WithTrailingComponent: Story = {
  name: 'With Trailing Component',
  decorators: [withFullPageFixture],
  render: function Render() {
    const [selectedLanguage, setSelectedLanguage] = React.useState('English')

    return (
      <SubdomainNavBar
        title="Site title"
        titleHref="/"
        trailingComponent={
          <ActionMenu size="small" onSelect={setSelectedLanguage} selectionVariant="single">
            <ActionMenu.Button variant="secondary" leadingVisual={<GlobeIcon />}>
              {selectedLanguage}
            </ActionMenu.Button>
            <ActionMenu.Overlay aria-label="Select language">
              {['English', 'Deutsch', 'Español', 'Français', '日本語'].map(language => (
                <ActionMenu.Item key={language} value={language} selected={language === selectedLanguage}>
                  {language}
                </ActionMenu.Item>
              ))}
            </ActionMenu.Overlay>
          </ActionMenu>
        }
      >
        {navigationLinks.slice(0, 6).map(link => (
          <SubdomainNavBar.Link key={link} href={`#${link}`}>
            {link
              .toLowerCase()
              .split(' ')
              .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
              .join(' ')}
          </SubdomainNavBar.Link>
        ))}
        <SubdomainNavBar.Search
          searchTerm=""
          searchResults={[]}
          onSubmit={event => event.preventDefault()}
          onChange={() => undefined}
        />
        <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
        <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
      </SubdomainNavBar>
    )
  },
  globals: {
    viewport: {value: 'desktop1024'},
  },
  play: async ({canvasElement}) => {
    await canvasElement.ownerDocument.fonts.ready
    const navList = canvasElement.querySelector<HTMLElement>('[data-testid="SubdomainNavBar-menuLinks"] ul')

    await waitFor(() => expect(navList?.scrollHeight).toBeLessThanOrEqual(navList?.clientHeight ?? 0))
  },
}

export const NoTitle: Story = {
  render: () => <SubdomainNavBar title="" />,
}

export const ExternalLink: Story = {
  render: () => (
    <SubdomainNavBar title="Subdomain">
      <SubdomainNavBar.Link href="#Collections">Collections</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Topics" isExternal>
        Topics
      </SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Articles">Articles</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Events">Events</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Video">Video</SubdomainNavBar.Link>
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  ),
}

export const ReversedButtonOrder: Story = {
  render: () => (
    <SubdomainNavBar title="Subdomain">
      <SubdomainNavBar.Link href="#Collections">Collections</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Topics" isExternal>
        Topics
      </SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Articles">Articles</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Events">Events</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Video">Video</SubdomainNavBar.Link>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
    </SubdomainNavBar>
  ),
}

export const ReversedButtonOrderNarrow: Story = {
  render: () => (
    <SubdomainNavBar title="Subdomain">
      <SubdomainNavBar.Link href="#Collections">Collections</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Topics" isExternal>
        Topics
      </SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Articles">Articles</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Events">Events</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#Video">Video</SubdomainNavBar.Link>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
    </SubdomainNavBar>
  ),
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Menu'}))
  },
}

export const ImperativeSearchApi: Story = {
  name: 'Imperative Search API',
  render: function Render() {
    const navigationRef = React.useRef<SubdomainNavBarHandle | null>(null)
    const [searchTerm, setSearchTerm] = React.useState('docs')
    const handleOpenThenClose = () => {
      navigationRef.current?.openSearch()
      window.setTimeout(() => navigationRef.current?.closeSearch(), 1500)
    }

    return (
      <>
        <SubdomainNavBar ref={navigationRef} title="GitHub Docs" titleHref="/" fixed={false}>
          <SubdomainNavBar.Link href="#guides">Guides</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#api">API</SubdomainNavBar.Link>
          <SubdomainNavBar.Link href="#changelog">Changelog</SubdomainNavBar.Link>
          <SubdomainNavBar.Search
            searchTerm={searchTerm}
            searchResults={groupedSearchResults}
            onSubmit={event => event.preventDefault()}
            onChange={event => setSearchTerm(event.currentTarget.value)}
          />
          <SubdomainNavBar.PrimaryAction href="#">Get started</SubdomainNavBar.PrimaryAction>
        </SubdomainNavBar>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            inset: 0,
            justifyContent: 'center',
            padding: '0 24px',
            position: 'fixed',
          }}
        >
          <Button onClick={() => navigationRef.current?.openSearch()}>Open search</Button>
          <Button variant="secondary" onClick={handleOpenThenClose}>
            Open then close search
          </Button>
        </div>
      </>
    )
  },
}

export const ConditionalRendering: Story = {
  render: function Render() {
    const [links, setLinks] = React.useState(['collections', 'topics', 'articles', 'events', 'video'])
    const [showLinks, setShowLinks] = React.useState(false)

    React.useEffect(() => {
      setLinks(currentLinks => [...currentLinks, 'social'])
      setShowLinks(true)
    }, [])

    return (
      <SubdomainNavBar title="Subdomain">
        {showLinks &&
          links.map(link => {
            const linkText = link
              .toLowerCase()
              .split(' ')
              .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
              .join(' ')

            return (
              <SubdomainNavBar.Link key={linkText} href={`#${link}`}>
                {linkText}
              </SubdomainNavBar.Link>
            )
          })}
        <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
        <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
      </SubdomainNavBar>
    )
  },
}

export const SkipToMainTag: Story = {
  render: () => (
    <>
      <SubdomainNavBar title="Skip to Main Tag" />
      <main style={{maxWidth: 1280, margin: '100px auto'}}>
        <Hero align="center">
          <Hero.Heading>This is the main content</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
        </Hero>
      </main>
    </>
  ),
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    await userEvent.tab()

    const skipLink = canvas.getByRole('link', {name: 'Skip to content'})
    const navbar = canvas.getByRole('banner')
    const skipLinkBounds = skipLink.getBoundingClientRect()
    const navbarBounds = navbar.getBoundingClientRect()

    await expect(skipLink).toHaveFocus()
    await expect(skipLinkBounds.left - navbarBounds.left).toBe(16)
    await expect(skipLinkBounds.top + skipLinkBounds.height / 2).toBe(navbarBounds.top + navbarBounds.height / 2)
  },
}

export const SkipToMainTagWithId: Story = {
  render: () => (
    <>
      <SubdomainNavBar title="Skip to Main Tag with ID" skipToContentTargetId="the-main-tag" />
      <main id="the-main-tag" style={{maxWidth: 1280, margin: '100px auto'}}>
        <Hero align="center">
          <Hero.Heading>This is the main content</Hero.Heading>
          <Hero.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Hero.Description>
          <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
          <Hero.SecondaryAction href="#">Secondary action</Hero.SecondaryAction>
        </Hero>
      </main>
    </>
  ),
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    await userEvent.tab()

    const skipLink = canvas.getByRole('link', {name: 'Skip to content'})

    await expect(skipLink).toHaveFocus()
    await expect(skipLink).toHaveAttribute('href', '#the-main-tag')
  },
}
