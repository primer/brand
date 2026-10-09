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
        <ToggleSwitch loading spinnerPosition="start" aria-labelledby="leading-loading-label" />
      </Stack>
      <Stack direction="horizontal" alignItems="center" gap="normal" padding="none">
        <Text as="span" id="trailing-loading-label">
          Spinner at end + checked
        </Text>
        <ToggleSwitch loading defaultChecked spinnerPosition="end" aria-labelledby="trailing-loading-label" />
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

export const LongLabel: Story = {
  render: () => (
    <FormControl fullWidth>
      <FormControl.Label>
        A long toggle switch label that wraps onto multiple lines when the available width is limited
      </FormControl.Label>
      <ToggleSwitch />
      <FormControl.Hint>Optional hint text below a wrapping label.</FormControl.Hint>
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
