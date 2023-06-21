import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport'
import {Prose} from './Prose'

export default {
  title: 'Components/Prose/Features',
  component: Prose,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
} as ComponentMeta<typeof Prose>

const ExampleHtmlMarkup = `
  <>
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
  </>
`

export const FullWidth: ComponentStory<typeof Prose> = () => <Prose enableFullWidth rawHtmlMarkup={ExampleHtmlMarkup} />

export const NarrowViewFullWidth: ComponentStory<typeof Prose> = () => <Prose rawHtmlMarkup={ExampleHtmlMarkup} />
NarrowViewFullWidth.parameters = {
  viewport: {
    defaultViewport: 'iphonexr',
  },
}
NarrowViewFullWidth.storyName = 'Narrow view, full width (mobile)'

export const RegularViewFullWidth: ComponentStory<typeof Prose> = () => <Prose rawHtmlMarkup={ExampleHtmlMarkup} />
RegularViewFullWidth.parameters = {
  viewport: {
    defaultViewport: 'ipad10p',
  },
  axe: {
    timeout: 5000,
  },
}
RegularViewFullWidth.storyName = 'Regular view, full width (tablet)'
