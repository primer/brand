import React, {useId, useRef, useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'
import {expect, userEvent, within} from 'storybook/test'
import {InfoIcon} from '@primer/octicons-react'
import {Box, FormControl, Heading, IconButton, Stack, Text} from '../..'
import {ToggleSwitch} from './ToggleSwitch'
import styles from './ToggleSwitch.stories.module.css'

const meta = {
  title: 'Components/Forms/ToggleSwitch/Examples',
  component: ToggleSwitch,
  parameters: {controls: {disable: true}},
} satisfies Meta<typeof ToggleSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const SettingsPanel: Story = {
  render: function Render() {
    const id = useId()
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [webNotifications, setWebNotifications] = useState(true)
    const [releaseNotifications, setReleaseNotifications] = useState(false)
    const [pendingSaves, setPendingSaves] = useState({email: 0, web: 0, releases: 0})

    const simulateSave = async (setting: keyof typeof pendingSaves) => {
      setPendingSaves(current => ({...current, [setting]: current[setting] + 1}))
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 800))
      } finally {
        setPendingSaves(current => ({...current, [setting]: current[setting] - 1}))
      }
    }

    return (
      <section className={styles.SettingsPanel} aria-labelledby={`${id}-settings-title`}>
        <Box
          backgroundColor="default"
          borderWidth="thin"
          borderColor="default"
          borderStyle="solid"
          borderRadius="medium"
        >
          <Box padding={8} borderBlockEndWidth="thin" borderColor="default" borderStyle="solid">
            <Heading as="h2" size="subhead-medium" id={`${id}-settings-title`}>
              Notifications
            </Heading>
          </Box>
          <Stack padding={8} gap={8}>
            <Stack direction="horizontal" alignItems="center" justifyContent="space-between" gap={16} padding="none">
              <Stack
                direction="horizontal"
                alignItems="center"
                gap="none"
                padding="none"
                className={styles.SettingName}
              >
                <Text as="span" size="100" id={`${id}-email-label`}>
                  Email notifications
                </Text>
                <IconButton
                  icon={InfoIcon}
                  size="small"
                  variant="invisible"
                  aria-label="About email notifications"
                  description="Receive updates for issues and pull requests you follow by email."
                />
              </Stack>
              <ToggleSwitch
                size="small"
                checked={emailNotifications}
                loading={pendingSaves.email > 0}
                spinnerPosition="start"
                loadingLabel="Saving email notifications"
                onChange={async nextChecked => {
                  setEmailNotifications(nextChecked)
                  await simulateSave('email')
                }}
                aria-labelledby={`${id}-email-label`}
              />
            </Stack>
            <Stack direction="horizontal" alignItems="center" justifyContent="space-between" gap={16} padding="none">
              <Stack
                direction="horizontal"
                alignItems="center"
                gap="none"
                padding="none"
                className={styles.SettingName}
              >
                <Text as="span" size="100" id={`${id}-web-label`}>
                  Web notifications
                </Text>
                <IconButton
                  icon={InfoIcon}
                  size="small"
                  variant="invisible"
                  aria-label="About web notifications"
                  description="Show updates for conversations you follow in your GitHub inbox."
                />
              </Stack>
              <ToggleSwitch
                size="small"
                checked={webNotifications}
                loading={pendingSaves.web > 0}
                spinnerPosition="start"
                loadingLabel="Saving web notifications"
                onChange={async nextChecked => {
                  setWebNotifications(nextChecked)
                  await simulateSave('web')
                }}
                aria-labelledby={`${id}-web-label`}
              />
            </Stack>
            <Stack direction="horizontal" alignItems="center" justifyContent="space-between" gap={16} padding="none">
              <Stack
                direction="horizontal"
                alignItems="center"
                gap="none"
                padding="none"
                className={styles.SettingName}
              >
                <Text as="span" size="100" id={`${id}-releases-label`}>
                  Release notifications
                </Text>
                <IconButton
                  icon={InfoIcon}
                  size="small"
                  variant="invisible"
                  aria-label="About release notifications"
                  description="Receive notifications when repositories you watch publish a release."
                />
              </Stack>
              <ToggleSwitch
                size="small"
                checked={releaseNotifications}
                loading={pendingSaves.releases > 0}
                spinnerPosition="start"
                loadingLabel="Saving release notifications"
                onChange={async nextChecked => {
                  setReleaseNotifications(nextChecked)
                  await simulateSave('releases')
                }}
                aria-labelledby={`${id}-releases-label`}
              />
            </Stack>
          </Stack>
        </Box>
      </section>
    )
  },
}

export const OptimisticUpdate: Story = {
  render: function Render() {
    const [email, setEmail] = useState(false)
    const [pendingSaves, setPendingSaves] = useState(0)

    const handleEmailChange = async (nextChecked: boolean) => {
      setEmail(nextChecked)
      setPendingSaves(current => current + 1)
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 800))
      } finally {
        setPendingSaves(current => current - 1)
      }
    }

    return (
      <FormControl>
        <FormControl.Label>Email notifications</FormControl.Label>
        <ToggleSwitch
          checked={email}
          loading={pendingSaves > 0}
          loadingLabel="Saving email preferences"
          onChange={handleEmailChange}
        />
      </FormControl>
    )
  },
}

export const OptimisticUpdateFailure: Story = {
  render: function Render() {
    const savedEmail = false
    const [email, setEmail] = useState(savedEmail)
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState('')
    const requestVersion = useRef(0)

    const handleEmailChange = async (nextChecked: boolean) => {
      const version = ++requestVersion.current
      setEmail(nextChecked)
      setSaving(true)
      setSaveError('')
      try {
        await new Promise<void>(resolve => setTimeout(resolve, 800))
        throw new Error('Simulated save failure')
      } catch {
        if (version === requestVersion.current) {
          setEmail(savedEmail)
          setSaveError('Could not save email notifications. Previous setting restored.')
        }
      } finally {
        if (version === requestVersion.current) setSaving(false)
      }
    }

    return (
      <FormControl validationStatus={saveError ? 'error' : undefined}>
        <FormControl.Label>Email notifications</FormControl.Label>
        <ToggleSwitch
          checked={email}
          loading={saving}
          loadingLabel="Saving email preferences"
          onChange={handleEmailChange}
        />
        <FormControl.Validation aria-live="polite" aria-atomic="true">
          {saveError}
        </FormControl.Validation>
      </FormControl>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const email = canvas.getByRole('switch', {name: 'Email notifications'})
    await userEvent.click(email)
    await expect(email).toHaveAttribute('aria-checked', 'true')
    await expect(email).toHaveAttribute('aria-busy', 'true')
    await expect(email).not.toHaveAttribute('aria-disabled')
    await canvas.findByText('Could not save email notifications. Previous setting restored.', {}, {timeout: 3000})
    await expect(email).toHaveAttribute('aria-checked', 'false')
    await expect(email).toHaveAttribute('aria-invalid', 'true')
    await expect(email).not.toHaveAttribute('aria-busy')
  },
}
