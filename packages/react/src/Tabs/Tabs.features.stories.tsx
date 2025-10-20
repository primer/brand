import React, {useCallback, useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Tabs, type TabsProps, Text, Box, Stack, Icon, Heading} from '../'
import {CodeIcon, HubotIcon, PencilIcon, PeopleIcon} from '@primer/octicons-react'

export type MetaProps = TabsProps

const meta = {
  title: 'Components/Tabs/Features',
  component: Tabs as Meta<TabsProps>['component'],
} satisfies Meta<MetaProps>

export default meta

type Story = StoryObj<MetaProps>

export const DefaultVariantNarrow: Story = {
  globals: {
    viewport: {value: 'mobile1'},
  },
  render: args => {
    return (
      <Tabs {...args} aria-label="Tabs in default variant">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>
        <Tabs.Item>Tab four</Tabs.Item>
        <Tabs.Item>Tab five</Tabs.Item>

        <Tabs.Panel>
          <Text>Panel one</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel two</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel three</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel four</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel five</Text>
        </Tabs.Panel>
      </Tabs>
    )
  },
}

const CustomPanelsExample = (args: MetaProps) => {
  const {'aria-labelledby': _, ...restArgs} = args
  const [activeTab, setActiveTab] = useState<string>('0')

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id)
  }, [])

  return (
    <Stack alignItems="center">
      <Tabs {...restArgs} onChange={handleTabChange} aria-label="Lifecycle tabs">
        <Tabs.Item id="tab-1" aria-controls="panel-1">
          Code
        </Tabs.Item>
        <Tabs.Item id="tab-2" aria-controls="panel-2">
          Plan
        </Tabs.Item>
        <Tabs.Item id="tab-3" aria-controls="panel-3">
          Collaborate
        </Tabs.Item>
        <Tabs.Item id="tab-4" aria-controls="panel-4">
          Automate
        </Tabs.Item>
      </Tabs>
      <Box padding="condensed">
        <Box id="panel-1" aria-labelledby="tab-1" role="tabpanel" tabIndex={0} hidden={activeTab !== '0'}>
          <Stack direction="vertical" alignItems="center">
            <Text>
              <Icon icon={CodeIcon} size={24} hasBackground color="green" />
            </Text>
            <Heading size="5">Code</Heading>
            <Text variant="muted">
              Code quickly and more securely with GitHub Copilot embedded throughout your workflows.
            </Text>
          </Stack>
        </Box>
        <Box id="panel-2" aria-labelledby="tab-2" role="tabpanel" tabIndex={0} hidden={activeTab !== '1'}>
          <Stack direction="vertical" alignItems="center">
            <Text>
              <Icon icon={PencilIcon} size={24} hasBackground color="blue" />
            </Text>
            <Heading size="5">Plan</Heading>
            <Text variant="muted">
              Track and coordinate your work with GitHub Issues, GitHub Projects, and insights.
            </Text>
          </Stack>
        </Box>
        <Box id="panel-3" aria-labelledby="tab-3" role="tabpanel" tabIndex={0} hidden={activeTab !== '2'}>
          <Stack direction="vertical" alignItems="center">
            <Text>
              <Icon icon={PeopleIcon} size={24} hasBackground color="yellow" />
            </Text>
            <Heading size="5">Collaborate</Heading>
            <Text variant="muted">
              Collaborate in real time with your team and GitHub Copilot across GitHub Issues, GitHub Discussions, and
              pull requests.
            </Text>
          </Stack>
        </Box>
        <Box id="panel-4" aria-labelledby="tab-4" role="tabpanel" tabIndex={0} hidden={activeTab !== '3'}>
          <Stack direction="vertical" alignItems="center">
            <Text>
              <Icon icon={HubotIcon} size={24} hasBackground color="purple" />
            </Text>
            <Heading size="5">Automate</Heading>
            <Text variant="muted">
              Streamline your workflows with automated CI/CD, testing, planning, project management, issue labeling,
              approvals, onboarding, and more.
            </Text>
          </Stack>
        </Box>
      </Box>
    </Stack>
  )
}

export const CustomPanels: Story = {
  render: args => <CustomPanelsExample {...args} />,
}

export const CustomActiveTab: Story = {
  render: args => {
    return (
      <Tabs {...args} defaultActiveTab="2" aria-label="Tabs in default variant">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>
        <Tabs.Item>Tab four</Tabs.Item>
        <Tabs.Item>Tab five</Tabs.Item>
        <Tabs.Panel>
          <Text>Panel one</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel two</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel three (active)</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel four</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel five</Text>
        </Tabs.Panel>
      </Tabs>
    )
  },
}

export const AccentVariant: Story = {
  render: args => {
    return (
      <Tabs {...args} variant="accent" aria-label="Tabs with accent variant">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>
          <Text>Panel one</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel two</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel three</Text>
        </Tabs.Panel>
      </Tabs>
    )
  },
}

export const AccentVariantNarrow: Story = {
  globals: {
    viewport: {value: 'mobile1'},
  },
  render: args => {
    return (
      <Tabs {...args} variant="accent" aria-label="Tabs with accent variant">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>
          <Text>Panel one</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel two</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel three</Text>
        </Tabs.Panel>
      </Tabs>
    )
  },
}

export const UnderlineVariant: Story = {
  render: args => {
    return (
      <Tabs {...args} variant="underline" aria-label="Tabs with underline variant">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>
          <Text>Panel one</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel two</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel three</Text>
        </Tabs.Panel>
      </Tabs>
    )
  },
}

export const UnderlineVariantNarrow: Story = {
  globals: {
    viewport: {value: 'mobile1'},
  },
  render: args => {
    return (
      <Tabs {...args} variant="underline" aria-label="Tabs with underline variant">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>
          <Text>Panel one</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel two</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel three</Text>
        </Tabs.Panel>
      </Tabs>
    )
  },
}

export const OptionalPanelAnimation: Story = {
  render: () => {
    return (
      <Tabs aria-label="Animation options">
        <Tabs.Item>Default</Tabs.Item>
        <Tabs.Item>Slide</Tabs.Item>
        <Tabs.Item>Scale</Tabs.Item>
        <Tabs.Item>Fade</Tabs.Item>
        <Tabs.Panel animation={false}>
          <Text>Animation: false</Text>
        </Tabs.Panel>
        <Tabs.Panel animation="slide-in-up">
          <Text>Animation: slide-in-up</Text>
        </Tabs.Panel>
        <Tabs.Panel animation="scale-in-up">
          <Text>Animation: scale-in-up</Text>
        </Tabs.Panel>
        <Tabs.Panel animation="fade-in">
          <Text>Animation: fade-in</Text>
        </Tabs.Panel>
      </Tabs>
    )
  },
}

export const StartAlign: Story = {
  render: args => {
    return (
      <Tabs {...args} align="start" aria-label="Tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>
          <Text>Panel one</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel two</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel three</Text>
        </Tabs.Panel>
      </Tabs>
    )
  },
}
