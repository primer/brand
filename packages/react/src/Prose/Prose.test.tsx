import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Prose} from './Prose'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Prose', () => {
  const ExampleHtmlMarkup = `
      <h1>The tools you need to build what you want.</h1>
      <p>Contribute to projects quickly with automatic environment setup.</p>
      <p>Make sure you see the changes you care about.</p>
      <p>Build community around your code.</p>

      <img
        src="/brand/assets/placeholder-600x400.png"
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
	  `

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const {getByText} = render(<Prose html="Hello world" />)

    const textEl = getByText('Hello world')

    expect(textEl).toBeInTheDocument()
  })

  it('renders with a default line length', () => {
    const testId = 'Prose'
    const {getByTestId} = render(<Prose data-testid={testId} html={ExampleHtmlMarkup} />)

    const rootEl = getByTestId(testId)

    expect(rootEl.classList).toContain('Prose--lineLength')
  })

  it('renders with a full width line length when enabled', () => {
    const testId = 'Prose'
    const {getByTestId} = render(<Prose data-testid={testId} html={ExampleHtmlMarkup} enableFullWidth />)

    const rootEl = getByTestId(testId)

    expect(rootEl.classList).not.toContain('Prose--lineLength')
  })

  it('renders with a custom class name', () => {
    const testId = 'Prose'
    const customClassName = 'custom-class'
    const {getByTestId} = render(<Prose data-testid={testId} html={ExampleHtmlMarkup} className={customClassName} />)

    const rootEl = getByTestId(testId)

    expect(rootEl.classList).toContain(customClassName)
  })

  it('renders with a custom style', () => {
    const testId = 'Prose'
    const customStyle = {color: 'red'}
    const {getByTestId} = render(<Prose data-testid={testId} html={ExampleHtmlMarkup} style={customStyle} />)

    const rootEl = getByTestId(testId)

    expect(rootEl).toHaveStyle(customStyle)
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Prose html={ExampleHtmlMarkup} />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
