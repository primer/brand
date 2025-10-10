import React from 'react'
import type {Meta, StoryObj} from '@storybook/react'

import {Timeline} from '.'

const meta = {
  title: 'Components/Timeline/Features',
  component: Timeline,
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

export const WithEmphasis: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        <b>GitHub Codespaces</b> offers a complete dev environment in seconds, so you can code, build, test, and open
        pull requests from any repo anywhere.
      </Timeline.Item>
      <Timeline.Item>
        <b>GitHub Copilot</b> is your AI pair programmer that empowers you to complete tasks 55% faster by turning
        natural language prompts into coding suggestions.
      </Timeline.Item>
      <Timeline.Item>
        <b>GitHub Actions</b> automates your build, test, and deployment workflow with simple and secure CI/CD.
      </Timeline.Item>
    </Timeline>
  ),
}

export const WithShorterText: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        <b>GitHub Codespaces</b> offers a complete dev environment in seconds.
      </Timeline.Item>
      <Timeline.Item>
        <b>GitHub Copilot</b> is your AI pair programmer that empowers you.
      </Timeline.Item>
      <Timeline.Item>
        <b>GitHub Actions</b> automates your build, test, and deployment workflows.
      </Timeline.Item>
    </Timeline>
  ),
}

export const WithLinks: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        <b>GitHub Codespaces</b> offers a <a href="/">complete dev environment</a> in seconds.
      </Timeline.Item>
      <Timeline.Item>
        <b>GitHub Copilot</b> is your AI pair programmer that empowers you.
      </Timeline.Item>
      <Timeline.Item>
        <b>GitHub Actions</b> automates your build, test, and deployment workflows.
      </Timeline.Item>
    </Timeline>
  ),
}

export const WithLongerText: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel nisi consequat, tempus nisl non, ultrices arcu.
        Sed sed nunc lorem. Nunc id aliquam diam. Phasellus ut dictum purus. Aliquam volutpat neque ut massa tempus
        accumsan. Integer sit amet eros sed tortor fermentum venenatis. Ut metus mauris, vestibulum a hendrerit sit
        amet, imperdiet at nunc. Aliquam erat volutpat.
      </Timeline.Item>
      <Timeline.Item>
        Vivamus eu neque leo. Nullam ut pretium neque, non sagittis lectus. Cras viverra felis id massa semper
        tincidunt. Praesent ultricies consequat laoreet. Maecenas sed magna mattis, sagittis nunc porta, dapibus arcu.
        Maecenas at semper sem. Sed maximus, est non pharetra placerat, lorem lectus pellentesque sapien, et ultricies
        sapien arcu ut diam. Aliquam erat volutpat. Ut tempus tincidunt nisi eleifend tempus. Sed lobortis lectus vel
        neque ornare luctus.
      </Timeline.Item>
      <Timeline.Item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel nisi consequat, tempus nisl non, ultrices arcu.
        Sed sed nunc lorem.
      </Timeline.Item>
    </Timeline>
  ),
}
