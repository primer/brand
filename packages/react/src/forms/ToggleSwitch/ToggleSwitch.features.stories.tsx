import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
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
      <ToggleSwitch hasStatusLabel={false} />
      <FormControl.Hint>Optional hint text</FormControl.Hint>
    </FormControl>
  ),
}

export const Checked: Story = {
  render: () => (
    <FormControl>
      <FormControl.Label>Checked</FormControl.Label>
      <ToggleSwitch defaultChecked hasStatusLabel={false} />
    </FormControl>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Stack padding="none" gap="normal">
      <FormControl>
        <FormControl.Label>Disabled</FormControl.Label>
        <ToggleSwitch disabled hasStatusLabel={false} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Checked + disabled</FormControl.Label>
        <ToggleSwitch defaultChecked disabled hasStatusLabel={false} />
      </FormControl>
    </Stack>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack padding="none" gap="normal">
      <FormControl>
        <FormControl.Label>Small</FormControl.Label>
        <ToggleSwitch size="small" hasStatusLabel={false} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Medium</FormControl.Label>
        <ToggleSwitch hasStatusLabel={false} />
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
          <ToggleSwitch size={size} hasStatusLabel={false} aria-label={`${size} unchecked toggle switch`} />
          <ToggleSwitch
            size={size}
            defaultChecked
            hasStatusLabel={false}
            aria-label={`${size} checked toggle switch`}
          />
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
        <ToggleSwitch hasStatusLabel={false} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Checked</FormControl.Label>
        <ToggleSwitch defaultChecked hasStatusLabel={false} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Checked + disabled</FormControl.Label>
        <ToggleSwitch disabled defaultChecked hasStatusLabel={false} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Small + checked</FormControl.Label>
        <ToggleSwitch size="small" defaultChecked hasStatusLabel={false} />
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
        <ToggleSwitch checked={checked} onChange={setChecked} hasStatusLabel={false} />
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
        <ToggleSwitch loading hasStatusLabel={false} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Checked + loading</FormControl.Label>
        <ToggleSwitch loading defaultChecked hasStatusLabel={false} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Small + loading</FormControl.Label>
        <ToggleSwitch size="small" loading hasStatusLabel={false} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Small + checked + loading</FormControl.Label>
        <ToggleSwitch size="small" loading defaultChecked hasStatusLabel={false} />
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
        <ToggleSwitch loading spinnerPosition="start" hasStatusLabel={false} aria-labelledby="leading-loading-label" />
      </Stack>
      <Stack direction="horizontal" alignItems="center" gap="normal" padding="none">
        <Text as="span" id="trailing-loading-label">
          Spinner at end + checked
        </Text>
        <ToggleSwitch
          loading
          defaultChecked
          spinnerPosition="end"
          hasStatusLabel={false}
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
      <ToggleSwitch hasStatusLabel={false} />
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
      <ToggleSwitch hasStatusLabel={false} aria-labelledby="external-toggle-label" />
    </Stack>
  ),
}

export const VisuallyHiddenLabel: Story = {
  render: () => (
    <FormControl>
      <FormControl.Label visuallyHidden>Visually hidden FormControl label</FormControl.Label>
      <ToggleSwitch hasStatusLabel={false} />
    </FormControl>
  ),
}

export const LongLabelNarrow: Story = {
  render: () => (
    <FormControl fullWidth>
      <FormControl.Label>
        A long toggle switch label that wraps onto multiple lines when the available width is limited
      </FormControl.Label>
      <ToggleSwitch hasStatusLabel={false} />
      <FormControl.Hint>Optional hint text below a wrapping label.</FormControl.Hint>
    </FormControl>
  ),
  globals: {
    viewport: {value: 'iphonexr'},
  },
}

export const StatusLabel: Story = {
  render: () => (
    <Stack padding="none" gap="normal">
      <FormControl>
        <FormControl.Label>Status label at start (default)</FormControl.Label>
        <ToggleSwitch defaultChecked />
      </FormControl>
      <FormControl>
        <FormControl.Label>Status label at end</FormControl.Label>
        <ToggleSwitch statusLabelPosition="end" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Custom status labels</FormControl.Label>
        <ToggleSwitch statusLabelOn="Enabled" statusLabelOff="Disabled" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Small with status label</FormControl.Label>
        <ToggleSwitch size="small" defaultChecked />
      </FormControl>
      <FormControl>
        <FormControl.Label>Without status label</FormControl.Label>
        <ToggleSwitch hasStatusLabel={false} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Disabled</FormControl.Label>
        <ToggleSwitch disabled />
      </FormControl>
      <FormControl validationStatus="error">
        <FormControl.Label>Validation error</FormControl.Label>
        <ToggleSwitch />
        <FormControl.Validation>Could not save this setting. Try again.</FormControl.Validation>
      </FormControl>
      <FormControl>
        <FormControl.Label>Loading with spinner at start</FormControl.Label>
        <ToggleSwitch loading spinnerPosition="start" />
      </FormControl>
      <FormControl>
        <FormControl.Label>Loading with spinner at end</FormControl.Label>
        <ToggleSwitch loading spinnerPosition="end" />
      </FormControl>
    </Stack>
  ),
}

export const StatusLabelDark: Story = {
  parameters: {colorMode: 'dark'},
  render: () => (
    <FormControl>
      <FormControl.Label>Notifications</FormControl.Label>
      <ToggleSwitch defaultChecked />
    </FormControl>
  ),
}

export const StatusLabelRightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <FormControl>
        <FormControl.Label>Notifications</FormControl.Label>
        <ToggleSwitch defaultChecked />
      </FormControl>
    </div>
  ),
}

export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <Stack padding="none" gap="normal">
        <FormControl>
          <FormControl.Label>Checked</FormControl.Label>
          <ToggleSwitch defaultChecked hasStatusLabel={false} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Small + checked</FormControl.Label>
          <ToggleSwitch size="small" defaultChecked hasStatusLabel={false} />
        </FormControl>
      </Stack>
    </div>
  ),
}

export const Focus: Story = {
  render: () => (
    <FormControl>
      <FormControl.Label>Focus visible</FormControl.Label>
      <ToggleSwitch hasStatusLabel={false} />
    </FormControl>
  ),
  parameters: {pseudo: {focusVisible: true}},
}
