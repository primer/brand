import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Breadcrumbs} from './Breadcrumbs'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Breadcrumbs', () => {
  afterEach(cleanup)

  it('has no a11y violations', async () => {
    const {container} = render(
      <Breadcrumbs variant="accent">
        <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot/chat" selected>
          Chat
        </Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly into the document', () => {
    const {getByRole, getAllByRole} = render(
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot/chat">Chat</Breadcrumbs.Item>
      </Breadcrumbs>,
    )

    const breadcrumbsEl = getByRole('navigation')
    expect(breadcrumbsEl.tagName).toBe('nav'.toUpperCase())
    expect(breadcrumbsEl).toHaveAttribute('aria-label', 'Breadcrumbs')
    expect(breadcrumbsEl).toHaveClass('Breadcrumbs--default')

    const breadcrumbLinkEls = getAllByRole('link')
    expect(breadcrumbLinkEls).toHaveLength(3)

    const item1 = breadcrumbLinkEls[0]
    expect(item1.textContent).toBe('Resources')
    expect(item1.getAttribute('href')).toBe('/')

    const item2 = breadcrumbLinkEls[1]
    expect(item2.textContent).toBe('GitHub Copilot')
    expect(item2.getAttribute('href')).toBe('/copilot')

    const item3 = breadcrumbLinkEls[2]
    expect(item3.textContent).toBe('Chat')
    expect(item3.getAttribute('href')).toBe('/copilot/chat')
  })

  it('renders selected items correctly into the document', () => {
    const {getByText, getAllByRole} = render(
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot/chat" selected>
          Chat
        </Breadcrumbs.Item>
      </Breadcrumbs>,
    )

    const breadcrumbLinkEls = getAllByRole('link')
    expect(breadcrumbLinkEls).toHaveLength(2)

    const item1 = breadcrumbLinkEls[0]
    expect(item1.textContent).toBe('Resources')
    expect(item1.getAttribute('href')).toBe('/')

    const item2 = breadcrumbLinkEls[1]
    expect(item2.textContent).toBe('GitHub Copilot')
    expect(item2.getAttribute('href')).toBe('/copilot')

    const item3 = getByText('Chat')
    expect(item3).toHaveAttribute('aria-current', 'page')
    expect(item3.tagName).toBe('span'.toUpperCase())
    expect(item3.classList).toContain('Breadcrumbs__link--selected')
  })

  it('renders accent variant correctly into the document', () => {
    const {getByRole} = render(
      <Breadcrumbs variant="accent">
        <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot/chat" selected>
          Chat
        </Breadcrumbs.Item>
      </Breadcrumbs>,
    )

    const breadcrumbsEl = getByRole('navigation')
    expect(breadcrumbsEl).toHaveClass('Breadcrumbs--accent')
  })

  it('accepts a custom aria-current value to override the default', () => {
    const {getByText} = render(
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/copilot/chat" selected aria-current="location">
          Chat
        </Breadcrumbs.Item>
      </Breadcrumbs>,
    )

    const item3 = getByText('Chat')

    expect(item3).toHaveAttribute('aria-current', 'location')
  })
})
