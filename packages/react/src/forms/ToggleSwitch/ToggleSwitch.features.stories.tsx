import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {expect, within} from 'storybook/test'
import {ArrowUpIcon, SearchIcon} from '@primer/octicons-react'
import {ToggleSwitch} from './ToggleSwitch'
import {FormControl} from '../FormControl'
import {Button, IconButton, Stack, Text, TextInput} from '../..'
import styles from './ToggleSwitch.stories.module.css'

const meta = {title: 'Components/Forms/ToggleSwitch/Features', component: ToggleSwitch} satisfies Meta<
  typeof ToggleSwitch
>
export default meta
type Story = StoryObj<typeof meta>

export const WithFormControl: Story = {
  render: () => (
    <FormControl>
      <FormControl.Label>With FormControl</FormControl.Label>
      <ToggleSwitch />
      <FormControl.Hint>Optional hint text</FormControl.Hint>
    </FormControl>
  ),
}

export const Checked: Story = {
  render: () => (
    <FormControl>
      <FormControl.Label>Checked</FormControl.Label>
      <ToggleSwitch defaultChecked />
    </FormControl>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Stack padding="none" gap="normal">
      <FormControl>
        <FormControl.Label>Disabled</FormControl.Label>
        <ToggleSwitch disabled />
      </FormControl>
      <FormControl>
        <FormControl.Label>Checked + disabled</FormControl.Label>
        <ToggleSwitch defaultChecked disabled />
      </FormControl>
    </Stack>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack padding="none" gap="normal">
      <FormControl>
        <FormControl.Label>Small</FormControl.Label>
        <ToggleSwitch size="small" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Medium</FormControl.Label>
        <ToggleSwitch />
      </FormControl>
    </Stack>
  ),
}

export const ControlHeightComparison: Story = {
  render: () => (
    <Stack padding="none" gap="normal">
      {(['small', 'medium'] as const).map(size => (
        <Stack key={size} direction="horizontal" alignItems="center" gap="condensed" padding="none" flexWrap="wrap">
          <Text as="span" size="100" className={styles.ComparisonLabel}>
            {size}
          </Text>
          <ToggleSwitch size={size} aria-label={`${size} unchecked toggle switch`} />
          <ToggleSwitch size={size} defaultChecked aria-label={`${size} checked toggle switch`} />
          <IconButton rounded icon={ArrowUpIcon} aria-label={`${size} rounded icon button`} size={size} />
          <IconButton icon={SearchIcon} aria-label={`${size} icon button`} size={size} />
          <Button leadingVisual={<SearchIcon />} size={size}>
            {size} button
          </Button>
          <div className={styles.ComparisonField}>
            <TextInput aria-label={`${size} text input`} placeholder={`${size} text input`} size={size} fullWidth />
          </div>
        </Stack>
      ))}
    </Stack>
  ),
}

export const Dark: Story = {
  parameters: {colorMode: 'dark'},
  render: () => (
    <Stack padding="none" gap="normal">
      <FormControl>
        <FormControl.Label>Unchecked</FormControl.Label>
        <ToggleSwitch />
      </FormControl>
      <FormControl>
        <FormControl.Label>Checked</FormControl.Label>
        <ToggleSwitch defaultChecked />
      </FormControl>
      <FormControl>
        <FormControl.Label>Checked + disabled</FormControl.Label>
        <ToggleSwitch disabled defaultChecked />
      </FormControl>
      <FormControl>
        <FormControl.Label>Small + checked</FormControl.Label>
        <ToggleSwitch size="small" defaultChecked />
      </FormControl>
    </Stack>
  ),
}

export const Controlled: Story = {
  render: function Render() {
    const [checked, setChecked] = useState(false)
    return (
      <FormControl>
        <FormControl.Label>Controlled</FormControl.Label>
        <ToggleSwitch checked={checked} onChange={setChecked} />
        <FormControl.Hint>Optional hint text</FormControl.Hint>
      </FormControl>
    )
  },
}

export const LoadingWithFormControls: Story = {
  render: () => (
    <Stack padding="none" gap="normal">
      <FormControl>
        <FormControl.Label>Loading</FormControl.Label>
        <ToggleSwitch loading />
      </FormControl>
      <FormControl>
        <FormControl.Label>Checked + loading</FormControl.Label>
        <ToggleSwitch loading defaultChecked />
      </FormControl>
      <FormControl>
        <FormControl.Label>Small + loading</FormControl.Label>
        <ToggleSwitch size="small" loading />
      </FormControl>
      <FormControl>
        <FormControl.Label>Small + checked + loading</FormControl.Label>
        <ToggleSwitch size="small" loading defaultChecked />
      </FormControl>
    </Stack>
  ),
}

export const StandaloneLoadingPositions: Story = {
  render: () => (
    <Stack padding="none" gap="normal">
      <Stack direction="horizontal" alignItems="center" gap="normal" padding="none">
        <Text as="span" id="leading-loading-label">
          Spinner at start
        </Text>
        <ToggleSwitch loading spinnerPosition="start" hasStatusLabel aria-labelledby="leading-loading-label" />
      </Stack>
      <Stack direction="horizontal" alignItems="center" gap="normal" padding="none">
        <Text as="span" id="trailing-loading-label">
          Spinner at end + checked
        </Text>
        <ToggleSwitch
          loading
          defaultChecked
          spinnerPosition="end"
          hasStatusLabel
          aria-labelledby="trailing-loading-label"
        />
      </Stack>
    </Stack>
  ),
}

export const Validation: Story = {
  render: () => (
    <FormControl validationStatus="error">
      <FormControl.Label>Validation error</FormControl.Label>
      <ToggleSwitch />
      <FormControl.Validation>Could not save this setting. Try again.</FormControl.Validation>
    </FormControl>
  ),
}

export const ExternalLabel: Story = {
  render: () => (
    <Stack direction="horizontal" padding="none" gap="normal" alignItems="center">
      <Text as="span" id="external-toggle-label">
        External label
      </Text>
      <ToggleSwitch aria-labelledby="external-toggle-label" />
    </Stack>
  ),
}

export const VisuallyHiddenLabel: Story = {
  render: () => (
    <FormControl>
      <FormControl.Label visuallyHidden>Visually hidden FormControl label</FormControl.Label>
      <ToggleSwitch />
    </FormControl>
  ),
}

export const LongLabelNarrow: Story = {
  render: () => (
    <FormControl fullWidth>
      <FormControl.Label>
        A long toggle switch label that wraps onto multiple lines when the available width is limited
      </FormControl.Label>
      <ToggleSwitch />
      <FormControl.Hint>Optional hint text below a wrapping label.</FormControl.Hint>
    </FormControl>
  ),
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const StatusLabel: Story = {
  parameters: {axe: {waitForPlay: true}},
  render: () => (
    <Stack padding="none" gap="normal">
      <FormControl>
        <FormControl.Label>Status label at start (default)</FormControl.Label>
        <ToggleSwitch defaultChecked hasStatusLabel />
      </FormControl>
      <FormControl>
        <FormControl.Label>Status label at end</FormControl.Label>
        <ToggleSwitch hasStatusLabel statusLabelPosition="end" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Custom status labels</FormControl.Label>
        <ToggleSwitch hasStatusLabel labels={{on: 'Enabled', off: 'Disabled'}} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Small with status label</FormControl.Label>
        <ToggleSwitch size="small" defaultChecked hasStatusLabel />
      </FormControl>
      <FormControl>
        <FormControl.Label>Without status label</FormControl.Label>
        <ToggleSwitch />
      </FormControl>
      <FormControl>
        <FormControl.Label>Disabled</FormControl.Label>
        <ToggleSwitch disabled hasStatusLabel />
      </FormControl>
      <FormControl validationStatus="error">
        <FormControl.Label>Validation error</FormControl.Label>
        <ToggleSwitch hasStatusLabel />
        <FormControl.Validation>Could not save this setting. Try again.</FormControl.Validation>
      </FormControl>
      <FormControl>
        <FormControl.Label>Loading with status label</FormControl.Label>
        <ToggleSwitch loading hasStatusLabel />
      </FormControl>
    </Stack>
  ),
  play: async ({canvasElement}) => {
    canvasElement.removeAttribute('data-axe-ready')
    const canvas = within(canvasElement)
    const control = canvas.getByRole('switch', {name: 'Validation error'})
    const section = control.closest('section')
    const toggle = control.closest<HTMLElement>(`[data-testid="${ToggleSwitch.testIds.root}"]`)
    const validation = section?.querySelector<HTMLElement>('[id$="-validation"]')
    if (!section || !toggle || !validation) throw new Error('The validation example is missing a required element')

    const originalWidth = section.style.inlineSize
    await Promise.all(validation.getAnimations().map(animation => animation.finished))
    try {
      section.style.inlineSize = '160px'
      const bounds = validation.getBoundingClientRect()
      expect(bounds.top).toBeGreaterThanOrEqual(toggle.getBoundingClientRect().bottom - 1)
      expect(bounds.right).toBeLessThanOrEqual(section.getBoundingClientRect().right + 1)
    } finally {
      section.style.inlineSize = originalWidth
    }
    canvasElement.setAttribute('data-axe-ready', 'true')
  },
}

export const StatusLabelDark: Story = {
  parameters: {colorMode: 'dark'},
  render: () => (
    <FormControl>
      <FormControl.Label>Notifications</FormControl.Label>
      <ToggleSwitch defaultChecked hasStatusLabel />
    </FormControl>
  ),
}

export const StatusLabelRightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <FormControl>
        <FormControl.Label>Notifications</FormControl.Label>
        <ToggleSwitch defaultChecked hasStatusLabel />
      </FormControl>
    </div>
  ),
}

export const StatusLabelNarrow: Story = {
  parameters: {axe: {waitForPlay: true}},
  render: () => (
    <Stack padding="none" gap="normal">
      {(['medium', 'small'] as const).map(size => (
        <FormControl key={size} fullWidth>
          <FormControl.Label>{size} setting</FormControl.Label>
          <ToggleSwitch
            size={size}
            hasStatusLabel
            labels={{
              on: 'Enabled for the entire organization',
              off: 'Disabled for the entire organization',
            }}
          />
          <FormControl.Hint>Optional hint text.</FormControl.Hint>
        </FormControl>
      ))}
    </Stack>
  ),
  globals: {
    viewport: {value: 'iphone5'},
  },
  play: ({canvasElement}) => {
    canvasElement.removeAttribute('data-axe-ready')
    const canvas = within(canvasElement)
    const examples = (['medium', 'small'] as const).map(size => {
      const control = canvas.getByRole('switch', {name: `${size} setting`})
      const section = control.closest('section')
      const container = section?.parentElement
      const label = section?.querySelector('label')
      const toggle = control.closest<HTMLElement>(`[data-testid="${ToggleSwitch.testIds.root}"]`)
      const track = control.querySelector<HTMLElement>('[class*="ToggleSwitch-track"]')
      const status = control.querySelector<HTMLElement>(`[data-testid="${ToggleSwitch.testIds.statusLabel}"]`)
      const hint = section?.querySelector<HTMLElement>('[id$="-hint"]')
      if (!section || !container || !label || !toggle || !track || !status || !hint) {
        throw new Error('The narrow switch example is missing a required element')
      }

      return {
        size,
        control,
        section,
        container,
        label,
        toggle,
        track,
        status,
        hint,
        originalWidth: section.style.inlineSize,
      }
    })
    const originalDirection = canvasElement.getAttribute('dir')
    const previousFocus = document.activeElement

    try {
      for (const direction of ['ltr', 'rtl']) {
        canvasElement.setAttribute('dir', direction)
        for (const width of [160, 200, 320]) {
          for (const example of examples) {
            const {size, control, section, container, label, toggle, track, status, hint} = example
            expect(container.clientWidth).toBeGreaterThan(0)
            section.style.inlineSize = `${Math.min(width, container.clientWidth)}px`

            const sectionBounds = section.getBoundingClientRect()
            const labelBounds = label.getBoundingClientRect()
            const toggleBounds = toggle.getBoundingClientRect()
            const controlBounds = control.getBoundingClientRect()
            const statusBounds = status.getBoundingClientRect()
            expect(labelBounds.width).toBeGreaterThanOrEqual(Math.min(sectionBounds.width, 96) - 1)
            expect(toggleBounds.left).toBeGreaterThanOrEqual(sectionBounds.left - 1)
            expect(toggleBounds.right).toBeLessThanOrEqual(sectionBounds.right + 1)
            expect(track.getBoundingClientRect().width).toBe(size === 'medium' ? 44 : 28)
            expect(statusBounds.width).toBeGreaterThan(0)
            expect(statusBounds.left).toBeGreaterThanOrEqual(controlBounds.left - 1)
            expect(statusBounds.right).toBeLessThanOrEqual(controlBounds.right + 1)
            expect(hint.getBoundingClientRect().top).toBeGreaterThanOrEqual(toggleBounds.bottom - 1)
            expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth)
            const labelsOverlap =
              labelBounds.left < toggleBounds.right &&
              labelBounds.right > toggleBounds.left &&
              labelBounds.top < toggleBounds.bottom &&
              labelBounds.bottom > toggleBounds.top
            expect(labelsOverlap).toBe(false)
          }
        }
      }
    } finally {
      for (const {section, originalWidth} of examples) section.style.inlineSize = originalWidth
      if (originalDirection === null) canvasElement.removeAttribute('dir')
      else canvasElement.setAttribute('dir', originalDirection)
    }
    expect(document.activeElement).toBe(previousFocus)
    canvasElement.setAttribute('data-axe-ready', 'true')
  },
}

export const StatusLabelLocalized: Story = {
  globals: {locale: 'de'},
  render: () => (
    <FormControl>
      <FormControl.Label>Benachrichtigungen</FormControl.Label>
      <ToggleSwitch hasStatusLabel labels={{on: 'Aktiviert', off: 'Deaktiviert'}} />
    </FormControl>
  ),
}

export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <Stack padding="none" gap="normal">
        <FormControl>
          <FormControl.Label>Checked</FormControl.Label>
          <ToggleSwitch defaultChecked />
        </FormControl>
        <FormControl>
          <FormControl.Label>Small + checked</FormControl.Label>
          <ToggleSwitch size="small" defaultChecked />
        </FormControl>
      </Stack>
    </div>
  ),
}

export const Focus: Story = {
  render: () => (
    <FormControl>
      <FormControl.Label>Focus visible</FormControl.Label>
      <ToggleSwitch />
    </FormControl>
  ),
  parameters: {pseudo: {focusVisible: true}},
}
