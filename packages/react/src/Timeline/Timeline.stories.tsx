import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Timeline} from '.'

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        GitHub Codespaces offers a complete dev environment in seconds, so you can code, build, test, and open pull
        requests from any repo anywhere.
      </Timeline.Item>
      <Timeline.Item>
        GitHub Copilot is your AI pair programmer that empowers you to complete tasks 55% faster by turning natural
        language prompts into coding suggestions.
      </Timeline.Item>
      <Timeline.Item>
        GitHub Actions automates your build, test, and deployment workflow with simple and secure CI/CD.
      </Timeline.Item>
    </Timeline>
  ),
}
