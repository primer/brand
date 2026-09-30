import React, {useEffect, useRef, useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {
  ArrowUpIcon,
  DownloadIcon,
  InboxIcon,
  SearchIcon,
  TrashIcon,
  XIcon,
  MarkGithubIcon,
} from '@primer/octicons-react'
import {expect, userEvent, waitFor, within} from 'storybook/test'

import {Button} from '../Button'
import {TextInput} from '../forms/TextInput'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {ThemeProvider} from '../ThemeProvider'
import {Tooltip, TooltipDirections as tooltipDirections} from '../Tooltip'
import {IconButton, IconButtonSizes, IconButtonVariants} from '.'
import {Box} from '../Box'
import styles from './IconButton.stories.module.css'

const meta = {
  title: 'Components/IconButton/Features',
  component: IconButton,
  args: {
    icon: MarkGithubIcon,
    'aria-label': 'Open GitHub',
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <Stack direction="horizontal">
      {IconButtonVariants.map(variant => (
        <IconButton
          key={variant}
          icon={variant === 'danger' ? TrashIcon : MarkGithubIcon}
          aria-label={`${variant} variant`}
          variant={variant}
        />
      ))}
    </Stack>
  ),
}

export const Danger: Story = {
  render: () => <IconButton icon={TrashIcon} aria-label="Delete item" variant="danger" />,
}

export const Sizes: Story = {
  render: () => (
    <Stack direction="horizontal" alignItems="center">
      {IconButtonSizes.map(size => (
        <IconButton key={size} icon={SearchIcon} aria-label="Search" size={size} />
      ))}
    </Stack>
  ),
}

export const Rounded: Story = {
  render: () => (
    <Stack direction="horizontal" alignItems="center">
      {IconButtonSizes.map(size => (
        <IconButton key={size} rounded icon={ArrowUpIcon} aria-label="Send message" size={size} variant="primary" />
      ))}
    </Stack>
  ),
}

export const KitchenSink: Story = {
  render: () => {
    const states = [
      {id: 'rest', label: 'Rest'},
      {id: 'hover', label: 'Hover'},
      {id: 'focus-visible', label: 'Focus visible'},
      {id: 'active', label: 'Active'},
      {id: 'inactive', label: 'Inactive'},
      {id: 'disabled', label: 'Disabled'},
      {id: 'loading', label: 'Loading'},
    ] as const

    return (
      <Stack direction="horizontal" gap="spacious" flexWrap="wrap">
        {states.map(state => (
          <Stack key={state.id} direction="vertical" gap="none">
            <Text as="strong" size="200">
              {state.label}
            </Text>
            {IconButtonVariants.map(variant => (
              <Stack key={variant} direction="horizontal" alignItems="center" gap="condensed">
                <Text as="span" size="100" style={{width: 'var(--base-size-80)'}}>
                  {variant}
                </Text>
                {IconButtonSizes.map(size => (
                  <IconButton
                    key={`kitchen-sink-${state.id}-${variant}-${size}`}
                    icon={MarkGithubIcon}
                    aria-label="GitHub"
                    variant={variant}
                    size={size}
                    inactive={state.id === 'inactive'}
                    disabled={state.id === 'disabled'}
                    loading={state.id === 'loading'}
                    className={
                      process.env.NODE_ENV === 'test' && state.id === 'loading'
                        ? styles.IconButton__pauseAnimations
                        : undefined
                    }
                    data-testid={`kitchen-sink-${state.id}-${variant}-${size}`}
                  />
                ))}
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    )
  },
  parameters: {
    pseudo: {
      hover: IconButtonVariants.flatMap(variant =>
        IconButtonSizes.map(size => `[data-testid="kitchen-sink-hover-${variant}-${size}"]`),
      ),
      focusVisible: IconButtonVariants.flatMap(variant =>
        IconButtonSizes.map(size => `[data-testid="kitchen-sink-focus-visible-${variant}-${size}"]`),
      ),
      active: IconButtonVariants.flatMap(variant =>
        IconButtonSizes.map(size => `[data-testid="kitchen-sink-active-${variant}-${size}"]`),
      ),
    },
  },
}

export const RoundedKitchenSink: Story = {
  render: () => {
    const states = [
      {id: 'rest', label: 'Rest'},
      {id: 'hover', label: 'Hover'},
      {id: 'focus-visible', label: 'Focus visible'},
      {id: 'active', label: 'Active'},
      {id: 'inactive', label: 'Inactive'},
      {id: 'disabled', label: 'Disabled'},
      {id: 'loading', label: 'Loading'},
    ] as const

    return (
      <Stack direction="horizontal" gap="spacious" flexWrap="wrap">
        {states.map(state => (
          <Stack key={state.id} direction="vertical" gap="none">
            <Text as="strong" size="200">
              {state.label}
            </Text>
            {IconButtonVariants.map(variant => (
              <Stack key={variant} direction="horizontal" alignItems="center" gap="condensed">
                <Text as="span" size="100" style={{width: 'var(--base-size-80)'}}>
                  {variant}
                </Text>
                {IconButtonSizes.map(size => (
                  <IconButton
                    key={`rounded-kitchen-sink-${state.id}-${variant}-${size}`}
                    rounded
                    icon={ArrowUpIcon}
                    aria-label="Send message"
                    variant={variant}
                    size={size}
                    inactive={state.id === 'inactive'}
                    disabled={state.id === 'disabled'}
                    loading={state.id === 'loading'}
                    className={
                      process.env.NODE_ENV === 'test' && state.id === 'loading'
                        ? styles.IconButton__pauseAnimations
                        : undefined
                    }
                    data-testid={`rounded-kitchen-sink-${state.id}-${variant}-${size}`}
                  />
                ))}
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    )
  },
  parameters: {
    pseudo: {
      hover: IconButtonVariants.flatMap(variant =>
        IconButtonSizes.map(size => `[data-testid="rounded-kitchen-sink-hover-${variant}-${size}"]`),
      ),
      focusVisible: IconButtonVariants.flatMap(variant =>
        IconButtonSizes.map(size => `[data-testid="rounded-kitchen-sink-focus-visible-${variant}-${size}"]`),
      ),
      active: IconButtonVariants.flatMap(variant =>
        IconButtonSizes.map(size => `[data-testid="rounded-kitchen-sink-active-${variant}-${size}"]`),
      ),
    },
  },
}

export const ControlHeightComparison: Story = {
  render: () => (
    <Stack direction="vertical" gap="condensed">
      {IconButtonSizes.map(size => (
        <Stack key={size} direction="horizontal" alignItems="center" gap="condensed">
          <Text as="span" size="100" style={{width: 'var(--base-size-64)'}}>
            {size}
          </Text>
          <IconButton rounded icon={ArrowUpIcon} aria-label="Submit" size={size} />
          <IconButton icon={SearchIcon} aria-label="Search" size={size} />
          <Button leadingVisual={<SearchIcon />} size={size}>
            {size} button
          </Button>
          <TextInput aria-label={`${size} text input`} placeholder={`${size} text input`} size={size} />
        </Stack>
      ))}
    </Stack>
  ),
}

export const Disabled: Story = {
  render: () => <IconButton disabled icon={MarkGithubIcon} aria-label="Open GitHub" />,
}

export const Inactive: Story = {
  render: () => (
    <Stack direction="horizontal">
      {IconButtonVariants.map(variant => (
        <IconButton
          key={variant}
          inactive
          icon={variant === 'danger' ? TrashIcon : MarkGithubIcon}
          aria-label={variant === 'danger' ? 'Delete item' : 'Open GitHub'}
          description="This action is temporarily unavailable"
          variant={variant}
        />
      ))}
    </Stack>
  ),
}

export const Loading: Story = {
  render: () => (
    <IconButton
      loading
      loadingAnnouncement="Downloading"
      icon={DownloadIcon}
      aria-label="Download"
      className={process.env.NODE_ENV === 'test' ? styles.IconButton__pauseAnimations : undefined}
    />
  ),
}

export const LoadingInteractive: Story = {
  render: function LoadingTransitionStory() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      if (!loading) return

      const loadingTimeout = window.setTimeout(() => setLoading(false), 3000)
      return () => window.clearTimeout(loadingTimeout)
    }, [loading])

    return (
      <Stack direction="horizontal" alignItems="center">
        <IconButton
          loading={loading}
          loadingAnnouncement="Downloading"
          icon={DownloadIcon}
          aria-label="Download"
          onClick={() => setLoading(true)}
        />
        <Text as="span" size="100" variant="muted">
          Click the button
        </Text>
      </Stack>
    )
  },
}

export const WithDescription: Story = {
  render: () => <IconButton icon={InboxIcon} aria-label="Notifications" description="You have unread notifications" />,
}

export const ButtonAsLink: Story = {
  render: () => <IconButton as="a" href="https://github.com" icon={MarkGithubIcon} aria-label="Open GitHub" />,
}

export const WithExternalTooltip: Story = {
  render: () => (
    <Tooltip text="Open GitHub on github.com">
      <IconButton icon={MarkGithubIcon} aria-label="Open GitHub" />
    </Tooltip>
  ),
}

export const LongDelayedTooltip: Story = {
  render: () => (
    <Tooltip text="Open GitHub" delay="long">
      <IconButton icon={MarkGithubIcon} aria-label="Open GitHub" />
    </Tooltip>
  ),
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    await userEvent.hover(canvas.getByRole('button', {name: 'Open GitHub'}))
    await waitFor(() => expect(canvas.getByRole('tooltip')).toBeVisible(), {timeout: 2000})
  },
}

export const WithDialog: Story = {
  render: function WithDialogStory() {
    const [isOpen, setIsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    return (
      <>
        <IconButton
          icon={InboxIcon}
          aria-label="Notifications"
          aria-controls="notifications-popover"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={() => popoverRef.current?.togglePopover()}
        />
        <Box
          ref={popoverRef}
          id="notifications-popover"
          popover="auto"
          role="dialog"
          aria-label="Notifications"
          onToggle={event => setIsOpen(event.newState === 'open')}
          padding="condensed"
          paddingBlockStart={48}
          backgroundColor="subtle"
          borderWidth="thin"
          borderRadius="medium"
          borderColor="default"
          borderStyle="solid"
          style={{
            color: 'var(--brand-color-text-default)',
            width: 500,
          }}
        >
          <Stack direction="vertical" gap="condensed">
            <Text as="p" size="100">
              Example dialog
            </Text>
            <IconButton
              size="small"
              icon={XIcon}
              aria-label="Close"
              onClick={() => popoverRef.current?.hidePopover()}
              style={{position: 'absolute', top: 'var(--base-size-16)', right: 'var(--base-size-16)'}}
            />
          </Stack>
        </Box>
      </>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await new Promise(resolve => setTimeout(resolve, 100))
    await userEvent.click(canvas.getByRole('button', {name: 'Notifications'}))
    await waitFor(() => expect(canvas.getByRole('dialog', {name: 'Notifications'})).toBeVisible())

    const tooltip = canvasElement.querySelector('[data-component="Tooltip"]')
    expect(tooltip?.matches(':popover-open')).toBe(false)
  },
}

export const Focus: Story = {
  render: () => <IconButton icon={MarkGithubIcon} aria-label="Open GitHub" />,
  play: async () => {
    await waitFor(async () => {
      await userEvent.tab()
    })
  },
}

export const Hover: Story = {
  render: () => (
    <Stack direction="horizontal">
      {IconButtonVariants.map(variant => (
        <IconButton
          key={variant}
          icon={MarkGithubIcon}
          aria-label="Open GitHub"
          variant={variant}
          data-testid={`hover-icon-button-${variant}`}
        />
      ))}
    </Stack>
  ),
  parameters: {
    pseudo: {hover: IconButtonVariants.map(variant => `[data-testid="hover-icon-button-${variant}"]`)},
  },
}

export const TooltipDirections: Story = {
  render: () => (
    <Stack
      direction="vertical"
      alignItems="center"
      justifyContent="center"
      className={styles.IconButton__tooltipDirections}
    >
      {tooltipDirections.map(direction => (
        <Box key={direction} padding={48}>
          <IconButton
            icon={MarkGithubIcon}
            aria-label={`Tooltip direction ${direction}`}
            tooltipDirection={direction}
            data-testid={`tooltip-direction-icon-button-${direction}`}
          />
        </Box>
      ))}
    </Stack>
  ),
  play: async ({canvasElement}) => {
    await waitFor(() =>
      expect(canvasElement.querySelectorAll<HTMLElement>('[popover]')).toHaveLength(tooltipDirections.length),
    )

    const tooltips = canvasElement.querySelectorAll<HTMLElement>('[popover]')
    for (const tooltip of tooltips) {
      tooltip.setAttribute('popover', 'manual')
      tooltip.showPopover()
    }

    await waitFor(() => expect([...tooltips].every(tooltip => tooltip.matches(':popover-open'))).toBe(true))
  },
}

export const DarkMode: Story = {
  render: () => (
    <Stack direction="horizontal">
      {IconButtonVariants.map(variant => (
        <IconButton key={variant} icon={MarkGithubIcon} aria-label="Open GitHub" variant={variant} />
      ))}
    </Stack>
  ),
  decorators: [
    Story => (
      <ThemeProvider colorMode="dark" style={{padding: 'var(--base-size-24)'}}>
        <Box backgroundColor="default" padding="spacious">
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
}
