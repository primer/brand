import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {
  ArrowUpRightIcon,
  CopilotIcon,
  GlobeIcon,
  PaperAirplaneIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@primer/octicons-react'
import {expect, userEvent, within} from 'storybook/test'
import {waitFor} from '@testing-library/dom'

import {ActionMenu, Button, Heading, Hero, InlineCode, Link, River, SubdomainNavBar, Text, TextInput, Token} from '..'
import type {SubdomainNavBarHandle} from '.'
import placeholderImage from '../fixtures/images/placeholder.png'
import {groupedSearchResults, navigationLinks, searchResults} from './SubdomainNavBar.stories.fixtures'
import styles from './SubdomainNavBar.features.stories.module.css'

type MetaProps = React.ComponentProps<typeof SubdomainNavBar>

const meta = {
  title: 'Components/SubdomainNavBar/Features',
  component: SubdomainNavBar,
  parameters: {
    layout: 'fullscreen',
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
        <SubdomainNavBar title="Site title" titleHref="/" fullWidth fixed={false}>
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
        <SubdomainNavBar title="Site title" titleHref="/" fullWidth fixed={false}>
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
    <SubdomainNavBar title="Site title" titleHref="/" fullWidth fixed={false}>
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

export const SearchCustomContent: Story = {
  render: () => (
    <SubdomainNavBar title="GitHub Docs" titleHref="/" fullWidth fixed={false}>
      <SubdomainNavBar.Link href="#guides">Guides</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#api">API</SubdomainNavBar.Link>
      <SubdomainNavBar.Search
        placeholder="Search GitHub Docs"
        className={styles.designSearch}
        searchTerm="How do i"
        searchResults={[]}
        onSubmit={event => event.preventDefault()}
        onChange={() => undefined}
        labels={{closeLabel: 'Close'}}
      >
        <div className={styles.searchContent}>
          <section className={styles.searchSection} aria-labelledby="ai-results-heading">
            <Heading as="h2" id="ai-results-heading" size="6" className={styles.resultsLabel}>
              AI results
            </Heading>
            <div className={styles.aiResults}>
              <div className={styles.aiResult}>
                <div className={styles.resultHeading}>
                  <Heading as="h3" size="6">
                    How do I connect to GitHub with my SSH?
                  </Heading>
                  <TriangleUpIcon size={16} />
                </div>
                <div className={styles.answer}>
                  <CopilotIcon size={20} />
                  <div>
                    <Text as="p" size="200">
                      1. Make sure you have an SSH key set up:
                    </Text>
                    <ul>
                      <li>
                        <Text as="span" size="200">
                          Check for existing keys
                        </Text>
                      </li>
                      <li>
                        <Text as="span" size="200">
                          Generate a new SSH key
                        </Text>
                      </li>
                      <li>
                        <Text as="span" size="200">
                          Add the public key to your GitHub account
                        </Text>
                      </li>
                    </ul>
                    <Text as="p" size="200">
                      2. Open your terminal:
                    </Text>
                    <ul>
                      <li>
                        <Text as="span" size="200">
                          macOS or Linux: <InlineCode wrap={false}>Terminal</InlineCode>
                        </Text>
                      </li>
                      <li>
                        <Text as="span" size="200">
                          Windows: <InlineCode wrap={false}>Git Bash</InlineCode>
                        </Text>
                      </li>
                    </ul>
                    <Text as="p" size="200">
                      3. Test the connection:
                    </Text>
                    <InlineCode className={styles.blockCode} wrap={false}>
                      ssh -T git@github.com
                    </InlineCode>
                    <Text as="p" size="200">
                      the first time, verify the host fingerprint matches{' '}
                      <Link href="#fingerprints" arrowDirection="none">
                        GitHub&apos;s public key fingerprints
                      </Link>
                      , then type <InlineCode wrap={false}>yes</InlineCode>
                    </Text>
                    <Text as="p" size="200">
                      1. If it works, you should see a message like:
                    </Text>
                    <InlineCode className={styles.blockCode}>
                      hi username! you&apos;ve successfully authenticated, but github does not provide shell access.
                    </InlineCode>
                    <Text as="p" size="200">
                      If you get <InlineCode wrap={false}>permission denied (publickey)</InlineCode>, check{' '}
                      <Link href="#permission-denied" arrowDirection="none">
                        Error: Permission denied (publickey)
                      </Link>
                      .
                    </Text>
                    <Text as="p" size="200">
                      If port 22 is blocked, you can try SSH over HTTPS port 443:
                    </Text>
                    <InlineCode className={styles.blockCode} wrap={false}>
                      ssh -T -p 443 git@ssh.github.com
                    </InlineCode>
                    <Text as="p" size="200">
                      and then update <InlineCode wrap={false}>~/.ssh/config</InlineCode> as documented in{' '}
                      <Link href="#https-port" arrowDirection="none">
                        Using SSH over the HTTPS port
                      </Link>
                      .
                    </Text>
                    <Text as="p" size="200" variant="muted">
                      Copilot uses AI. Check for mistakes.
                    </Text>
                  </div>
                </div>
                <div className={styles.askAnotherQuestion}>
                  <TextInput
                    aria-label="Ask another question"
                    className={styles.askAnotherQuestionInput}
                    placeholder="Ask another question..."
                    readOnly
                    trailingVisual={<PaperAirplaneIcon size={20} />}
                    fullWidth
                  />
                </div>
              </div>
              <div className={styles.collapsedResult}>
                <Heading as="h3" size="6">
                  How do I sign commits?
                </Heading>
                <TriangleDownIcon size={16} />
              </div>
              <div className={styles.collapsedResult}>
                <Heading as="h3" size="6">
                  How do I create webhooks?
                </Heading>
                <TriangleDownIcon size={16} />
              </div>
            </div>
          </section>
          <section className={styles.searchSection} aria-labelledby="docs-results-heading">
            <Heading as="h2" id="docs-results-heading" size="6" className={styles.resultsLabel}>
              Docs results
            </Heading>
            <div className={styles.docsResults}>
              {[
                'Frequently asked questions',
                'How GitHub works',
                'Using the GitHub CLI across GitHub platforms',
                'How GitHub works',
                'Long article name lorem ipsum dolor sit amet using the GitHub CLI across GitHub platforms lipsum...',
              ].map(result => (
                <div className={styles.docResult} key={result}>
                  <Text as="span" size="300" weight="semibold">
                    {result}
                  </Text>
                  <ArrowUpRightIcon size={16} />
                </div>
              ))}
            </div>
            <a className={styles.seeMore} href="#more">
              See more
            </a>
          </section>
        </div>
      </SubdomainNavBar.Search>
    </SubdomainNavBar>
  ),
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Search GitHub Docs search'}))
    await expect(canvas.getByRole('dialog')).toBeVisible()
    await expect(canvas.getByText('AI results')).toBeVisible()
    await expect(canvas.getByText('Docs results')).toBeVisible()
    await expect(canvas.queryByRole('listbox')).not.toBeInTheDocument()
  },
  name: 'Search Custom Content',
}

export const OverflowMenuOpen: Story = {
  decorators: [withFullPageFixture],
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
    viewport: {value: 'ipad', isRotated: true},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await canvasElement.ownerDocument.fonts.ready
    const moreButton = canvas.getByRole('button', {name: 'More'})
    await waitFor(() => expect(moreButton).toBeVisible())
    const firstOverflowedItem = canvasElement.querySelector(
      '.SubdomainNavBar-primary-nav-list-item[aria-hidden="true"]',
    )
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
    viewport: {value: 'ipad', isRotated: true},
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
    viewport: {value: 'ipad'},
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
  render: function Render() {
    const [selectedLanguage, setSelectedLanguage] = React.useState('English')

    return (
      <SubdomainNavBar
        title="Site title"
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
    viewport: {value: 'ipad'},
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
    const trailingComponent = menuFooter?.firstElementChild
    const actionArea = menuFooter?.lastElementChild
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
    await expect(getComputedStyle(trailingComponent as Element).borderBlockStartWidth).toBe('0px')
    await expect(getComputedStyle(actionArea as Element).borderBlockStartWidth).toBe('1px')
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
  render: () => <SubdomainNavBar title="Site title" />,
  globals: {
    viewport: {value: 'iphonex'},
  },
}

export const MobileLeadingComponentOnlyMenuOpen: Story = {
  render: () => <SubdomainNavBar title="Site title" leadingComponent={<Token>v1.5.3</Token>} />,
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
    <SubdomainNavBar title="Site title">
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
    <SubdomainNavBar title="Site title">
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
    <SubdomainNavBar title="Site title">
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
        <SubdomainNavBar ref={navigationRef} title="Site title" titleHref="/" fixed={false}>
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

const FeaturedVariantExample = ({withCustomComponents = false}: {withCustomComponents?: boolean}) => (
  <SubdomainNavBar
    title="Site title"
    titleHref="/"
    variant="featured"
    fullWidth
    fixed={false}
    leadingComponent={withCustomComponents ? <Token>Public beta</Token> : undefined}
    trailingComponent={
      withCustomComponents ? (
        <Button as="a" href="#repository" variant="secondary" size="small">
          View repository
        </Button>
      ) : undefined
    }
  >
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
      placeholder="Search Site title"
      keyboardShortcut="/"
      shortcutLabel="/"
      searchTerm=""
      searchResults={[]}
      onSubmit={event => event.preventDefault()}
      onChange={() => undefined}
    />
    <SubdomainNavBar.SecondaryAction href="#sign-in">Sign in</SubdomainNavBar.SecondaryAction>
    <SubdomainNavBar.PrimaryAction href="#get-started">Get started</SubdomainNavBar.PrimaryAction>
  </SubdomainNavBar>
)

export const FeaturedVariant: Story = {
  render: () => <FeaturedVariantExample />,
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const titleLink = canvas.getByRole('link', {name: 'Site title home'})
    const searchPlaceholder = canvas.getByText('Search Site title')
    const navbar = titleLink.closest('header')

    await expect(titleLink).toHaveTextContent('GitHub Site title')
    await expect(navbar).toHaveClass('SubdomainNavBar--variant-featured')
    await expect(getComputedStyle(searchPlaceholder).display).not.toBe('none')
  },
  name: 'Featured Variant',
}

export const FeaturedVariantWithLeadingAndTrailingComponents: Story = {
  render: () => <FeaturedVariantExample withCustomComponents />,
  name: 'Featured Variant With Leading and Trailing Components',
}

export const FeaturedVariantTabletMenuOpen: Story = {
  render: () => <FeaturedVariantExample />,
  globals: {
    viewport: {value: 'ipad'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', {name: 'Menu'}))
    const closeButton = canvas.getByRole('button', {name: 'Close'})
    const menu = canvasElement.ownerDocument.getElementById(closeButton.getAttribute('aria-controls') as string)

    await expect(closeButton).toHaveAttribute('aria-expanded', 'true')
    await expect(menu).toBeVisible()
  },
  name: 'Featured Variant Tablet Menu Open',
}

export const FeaturedVariantMobile: Story = {
  render: () => <FeaturedVariantExample />,
  globals: {
    viewport: {value: 'iphonex'},
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const menuButton = canvas.getByRole('button', {name: 'Menu'})
    const innerContainer = menuButton.closest('[data-testid="SubdomainNavBar-inner-container"]')
    const menuButtonRect = menuButton.getBoundingClientRect()
    const innerContainerRect = innerContainer?.getBoundingClientRect()

    await expect(Math.abs(menuButtonRect.right - (innerContainerRect?.right ?? 0))).toBeLessThanOrEqual(1)
  },
  name: 'Featured Variant Mobile',
}
