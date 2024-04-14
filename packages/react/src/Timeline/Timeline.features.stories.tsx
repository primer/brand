import React from 'react'
import {StoryFn, Meta} from '@storybook/react'

import {IssueOpenedIcon, IssueClosedIcon, StackIcon} from '@primer/octicons-react'
import {Timeline} from '.'

export default {
  title: 'Components/Timeline/features',
  component: Timeline,
} as Meta<typeof Timeline>

export const WithEmphasis: StoryFn<typeof Timeline> = () => {
  return (
    <Timeline>
      <Timeline.Item>
        <em>GitHub Codespaces</em> offers a complete dev environment in seconds, so you can code, build, test, and open
        pull requests from any repo anywhere.
      </Timeline.Item>
      <Timeline.Item>
        <em>GitHub Copilot</em> is your AI pair programmer that empowers you to complete tasks 55% faster by turning
        natural language prompts into coding suggestions.
      </Timeline.Item>
      <Timeline.Item>
        <em>GitHub Actions</em> automates your build, test, and deployment workflow with simple and secure CI/CD.
      </Timeline.Item>
    </Timeline>
  )
}

export const WithShorterText: StoryFn<typeof Timeline> = () => {
  return (
    <Timeline>
      <Timeline.Item>
        <em>GitHub Codespaces</em> offers a complete dev environment in seconds.
      </Timeline.Item>
      <Timeline.Item>
        <em>GitHub Copilot</em> is your AI pair programmer that empowers you.
      </Timeline.Item>
      <Timeline.Item>
        <em>GitHub Actions</em> automates your build, test, and deployment workflows.
      </Timeline.Item>
    </Timeline>
  )
}

export const WithLinks: StoryFn<typeof Timeline> = () => {
  return (
    <Timeline>
      <Timeline.Item>
        <em>GitHub Codespaces</em> offers a <a href="/">complete dev environment</a> in seconds.
      </Timeline.Item>
      <Timeline.Item>
        <em>GitHub Copilot</em> is your AI pair programmer that empowers you.
      </Timeline.Item>
      <Timeline.Item>
        <em>GitHub Actions</em> automates your build, test, and deployment workflows.
      </Timeline.Item>
    </Timeline>
  )
}

export const WithLongerText: StoryFn<typeof Timeline> = () => {
  return (
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
  )
}

export const WithIcon: StoryFn<typeof Timeline> = () => {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Icon>
          <IssueOpenedIcon size={16} />
        </Timeline.Icon>
        GitHub Codespaces offers a complete dev environment in seconds, so you can code, build, test, and open pull
        requests from any repo anywhere.
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Icon>
          <IssueClosedIcon size={16} />
        </Timeline.Icon>
        GitHub Copilot is your AI pair programmer that empowers you to complete tasks 55% faster by turning natural
        language prompts into coding suggestions.
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Icon>
          <StackIcon size={16} />
        </Timeline.Icon>
        GitHub Actions automates your build, test, and deployment workflow with simple and secure CI/CD.
      </Timeline.Item>
    </Timeline>
  )
}
