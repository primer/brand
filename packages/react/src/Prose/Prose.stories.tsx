import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {Prose} from './Prose'

export default {
  title: 'Components/Prose',
  component: Prose,
  args: {
    enableFullWidth: false,
  },
  argTypes: {
    enableFullWidth: {
      description: 'Toggle to remove the max width from the prose container',
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof Prose>

const ExampleHtmlMarkup = (
  <div>
    <h1>The tools you need to build what you want.</h1>
    <p>Contribute to projects quickly with automatic environment setup.</p>
    <p>Make sure you see the changes you care about.</p>
    <p>Build community around your code.</p>

    <img
      src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
      alt="placeholder, blank area with an off-white background color"
    />

    <h2>Automation and CI/CD</h2>
    <ul>
      <li>
        Automate everything: CI/CD, testing, planning, project management, issue labeling, approvals, onboarding, and
        more.
      </li>
      <li>Standardize and scale best practices, security, and compliance across your organization.</li>
      <li>Get started quickly with thousands of actions from partners and the community.</li>
    </ul>

    <h2>Security</h2>
    <p>
      Secure code as you write it. Automatically review every change to your codebase and identify vulnerabilities
      before they reach production. <a href="/#">Learn more here.</a>
    </p>
  </div>
)

export const Playground: ComponentStory<typeof Prose> = args => <Prose {...args} rawHtmlMarkup={ExampleHtmlMarkup} />

export const Default = Playground.bind({})
Default.args = {}
