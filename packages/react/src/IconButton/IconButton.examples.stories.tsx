import React, {useEffect, useRef, useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {expect, userEvent, waitFor, within} from 'storybook/test'
import {
  BoldIcon,
  CopilotIcon,
  DownloadIcon,
  GitPullRequestIcon,
  InboxIcon,
  ItalicIcon,
  IssueOpenedIcon,
  ListUnorderedIcon,
  PlusIcon,
  RepoIcon,
  SearchIcon,
  XIcon,
} from '@primer/octicons-react'

import {ActionMenu} from '../ActionMenu'
import {Avatar} from '../Avatar'
import {Box} from '../Box'
import {Button} from '../Button'
import {ButtonGroup} from '../ButtonGroup'
import {FormControl} from '../forms/FormControl'
import {TextInput} from '../forms/TextInput'
import {Heading} from '../Heading'
import {Stack} from '../Stack'
import {Text} from '../Text'
import avatarMona from '../fixtures/images/avatar-mona.png'
import {IconButton} from '.'
import styles from './IconButton.examples.stories.module.css'

const meta = {
  title: 'Components/IconButton/Examples',
  component: IconButton,
  args: {
    icon: DownloadIcon,
    'aria-label': 'Download',
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

function GitHubToolbarExample() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchTriggerRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchPopoverRef = useRef<HTMLDivElement>(null)

  return (
    <Box role="navigation" aria-label="GitHub" backgroundColor="default" className={styles.Toolbar}>
      <div className={styles.Toolbar__search}>
        <TextInput
          type="search"
          size="small"
          leadingVisual={<SearchIcon />}
          placeholder="Type / to search"
          aria-label="Search GitHub"
          aria-keyshortcuts="/"
          fullWidth
        />
      </div>

      <IconButton
        ref={searchTriggerRef}
        className={styles.Toolbar__searchTrigger}
        size="small"
        icon={SearchIcon}
        aria-label="Search GitHub"
        aria-controls="toolbar-search-popover"
        aria-expanded={isSearchOpen}
        aria-haspopup="dialog"
        onClick={() => searchPopoverRef.current?.togglePopover()}
      />

      <Box
        ref={searchPopoverRef}
        id="toolbar-search-popover"
        className={styles.Toolbar__searchPopover}
        popover="auto"
        role="dialog"
        aria-label="Search GitHub"
        padding="condensed"
        backgroundColor="subtle"
        onToggle={event => {
          const open = event.newState === 'open'
          setIsSearchOpen(open)
          window.requestAnimationFrame(() =>
            open ? searchInputRef.current?.focus() : searchTriggerRef.current?.focus(),
          )
        }}
      >
        <div className={styles.Toolbar__searchPopoverContent}>
          <div className={styles.Toolbar__searchPopoverInput}>
            <FormControl fullWidth>
              <FormControl.Label visuallyHidden>Search GitHub</FormControl.Label>
              <TextInput
                ref={searchInputRef}
                type="search"
                leadingVisual={<SearchIcon />}
                placeholder="Search GitHub"
                fullWidth
                size="small"
              />
            </FormControl>
          </div>
          <IconButton icon={XIcon} aria-label="Close search" onClick={() => searchPopoverRef.current?.hidePopover()} />
        </div>
      </Box>

      <div className={styles.Toolbar__actions}>
        <ActionMenu mode="split-button" size="small">
          <ActionMenu.IconButton as="a" href="#copilot" icon={CopilotIcon} aria-label="Open Copilot" />
          <ActionMenu.Overlay aria-label="Copilot options">
            <ActionMenu.Item as="a" href="#">
              Open chat
            </ActionMenu.Item>
            <ActionMenu.Item as="a" href="#">
              Open app
            </ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>

        <span className={styles.Toolbar__divider} aria-hidden="true" />

        <ActionMenu size="small">
          <ActionMenu.IconButton as="a" href="#new" icon={PlusIcon} aria-label="Create new" />
          <ActionMenu.Overlay aria-label="Create new">
            <ActionMenu.Item as="a" href="#new-repository">
              New repository
            </ActionMenu.Item>
            <ActionMenu.Item as="a" href="#new-issue">
              New issue
            </ActionMenu.Item>
            <ActionMenu.Item as="a" href="#new-project">
              New project
            </ActionMenu.Item>
          </ActionMenu.Overlay>
        </ActionMenu>

        <IconButton
          size="small"
          className={styles.Toolbar__desktopAction}
          as="a"
          href="#issues"
          icon={IssueOpenedIcon}
          aria-label="Open issues"
        />
        <IconButton
          size="small"
          className={styles.Toolbar__desktopAction}
          as="a"
          href="#pull-requests"
          icon={GitPullRequestIcon}
          aria-label="Open pull requests"
        />
        <IconButton
          size="small"
          className={styles.Toolbar__desktopAction}
          as="a"
          href="#repositories"
          icon={RepoIcon}
          aria-label="Open repositories"
        />
        <span className={styles.Toolbar__notification}>
          <IconButton
            size="small"
            as="a"
            href="#inbox"
            icon={InboxIcon}
            aria-label="Open inbox, 1 unread notification"
          />
          <span className={styles.Toolbar__notificationIndicator} aria-hidden="true" />
        </span>
        <a href="#profile" className={styles.Toolbar__profile} aria-label="Open profile menu">
          <Avatar src={avatarMona} alt="" size={32} />
        </a>
      </div>
    </Box>
  )
}

export const GitHubToolbar: Story = {
  name: 'GitHub Toolbar',
  render: () => <GitHubToolbarExample />,
  parameters: {
    layout: 'fullscreen',
  },
}

export const GitHubToolbarNarrow: Story = {
  name: 'GitHub Toolbar (narrow viewport)',
  render: () => <GitHubToolbarExample />,
  globals: {
    viewport: {value: 'iphonex'},
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const RelatedFormattingActions: Story = {
  name: 'Related formatting actions',
  render: function RelatedFormattingActionsExample() {
    const [activeFormats, setActiveFormats] = useState<string[]>([])

    const toggleFormat = (format: string) => {
      setActiveFormats(currentFormats =>
        currentFormats.includes(format)
          ? currentFormats.filter(currentFormat => currentFormat !== format)
          : [...currentFormats, format],
      )
    }

    return (
      <Stack direction="vertical" alignItems="flex-start" gap="condensed">
        <div role="group" aria-label="Text formatting">
          <ButtonGroup variant="joined" buttonSize="small">
            <IconButton
              icon={BoldIcon}
              aria-label="Bold"
              aria-pressed={activeFormats.includes('bold')}
              variant={activeFormats.includes('bold') ? 'primary' : 'secondary'}
              onClick={() => toggleFormat('bold')}
            />
            <IconButton
              icon={ItalicIcon}
              aria-label="Italic"
              aria-pressed={activeFormats.includes('italic')}
              variant={activeFormats.includes('italic') ? 'primary' : 'secondary'}
              onClick={() => toggleFormat('italic')}
            />
            <IconButton
              icon={ListUnorderedIcon}
              aria-label="Bulleted list"
              aria-pressed={activeFormats.includes('bulleted list')}
              variant={activeFormats.includes('bulleted list') ? 'primary' : 'secondary'}
              onClick={() => toggleFormat('bulleted list')}
            />
          </ButtonGroup>
        </div>
        <Text as="p" size="100" variant="muted" aria-live="polite">
          {activeFormats.length > 0 ? `Selected: ${activeFormats.join(', ')}` : 'No formatting selected'}
        </Text>
      </Stack>
    )
  },
}

export const DownloadWithProgress: Story = {
  render: function DownloadWithProgressExample() {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('Ready to download the release archive')

    useEffect(() => {
      if (!loading) return

      const downloadTimeout = window.setTimeout(() => {
        setLoading(false)
        setStatus('Release archive downloaded')
      }, 1500)

      return () => window.clearTimeout(downloadTimeout)
    }, [loading])

    return (
      <Stack direction="horizontal" alignItems="center" gap="condensed">
        <IconButton
          loading={loading}
          loadingAnnouncement="Downloading release archive"
          icon={DownloadIcon}
          aria-label="Download release archive"
          onClick={() => {
            setStatus('Downloading release archive')
            setLoading(true)
          }}
        />
        <Text as="p" size="100" aria-live="polite">
          {status}
        </Text>
      </Stack>
    )
  },
}

export const DownloadPdfDialog: Story = {
  name: 'Download PDF dialog',
  render: function DownloadPdfDialogExample() {
    const [isOpen, setIsOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)
    const dialogRef = useRef<HTMLDivElement>(null)

    return (
      <Box padding="spacious" backgroundColor="subtle" borderRadius="large">
        <IconButton
          ref={triggerRef}
          icon={DownloadIcon}
          aria-label="Open PDF download dialog"
          aria-controls="download-pdf-dialog"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={() => dialogRef.current?.togglePopover()}
        />
        <Box
          ref={dialogRef}
          id="download-pdf-dialog"
          popover="auto"
          role="dialog"
          aria-labelledby="download-pdf-dialog-title"
          onToggle={event => {
            const open = event.newState === 'open'
            setIsOpen(open)
            window.requestAnimationFrame(() => (open ? closeRef.current?.focus() : triggerRef.current?.focus()))
          }}
          padding="condensed"
          backgroundColor="default"
          borderWidth="thin"
          borderRadius="medium"
          borderColor="default"
          borderStyle="solid"
          style={{color: 'var(--brand-color-text-default)', maxWidth: 420}}
        >
          <Stack padding="none" direction="vertical" gap="normal">
            <Heading id="download-pdf-dialog-title" as="h2" size="6">
              It&apos;s ready!
            </Heading>
            <Text as="p" size="100">
              Your PDF has been generated successfully.
            </Text>
            <Stack
              style={{width: '100%'}}
              direction="horizontal"
              gap="condensed"
              justifyContent="flex-start"
              padding="none"
            >
              <Button onClick={() => dialogRef.current?.hidePopover()}>Download PDF</Button>
            </Stack>
            <IconButton
              ref={closeRef}
              size="small"
              icon={XIcon}
              aria-label="Close PDF download dialog"
              onClick={() => dialogRef.current?.hidePopover()}
              style={{position: 'absolute', top: 'var(--base-size-16)', right: 'var(--base-size-16)'}}
            />
          </Stack>
        </Box>
      </Box>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', {name: 'Open PDF download dialog'}))
    await waitFor(() => expect(canvas.getByRole('dialog', {name: "It's ready!"})).toBeVisible())
    await waitFor(() => expect(canvas.getByRole('button', {name: 'Close PDF download dialog'})).toHaveFocus())
  },
}
