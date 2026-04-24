import React from 'react'
import {cleanup, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {CopilotIcon} from '@primer/octicons-react'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Token} from './Token'

expect.extend(toHaveNoViolations)

describe('Token', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const {getByTestId} = render(<Token>Token text</Token>)

    expect(getByTestId(Token.testIds.root).classList).toContain('Token')
    expect(getByTestId(Token.testIds.root).tagName).toBe('SPAN')
  })

  it('renders the correct default variant', () => {
    const {getByTestId} = render(<Token>Token text</Token>)
    const tokenEl = getByTestId(Token.testIds.root)

    expect(tokenEl.classList).toContain('Token--variant-default')
  })

  it('renders the selected variant', () => {
    const {getByTestId} = render(<Token variant="accent">Token text</Token>)
    const tokenEl = getByTestId(Token.testIds.root)

    expect(tokenEl.classList).toContain('Token--variant-accent')
  })

  it('can optionally render a leading visual', () => {
    const {getByTestId} = render(<Token leadingVisual={<CopilotIcon />}>Token text</Token>)

    expect(getByTestId(Token.testIds.leadingVisual).querySelector('svg')).toBeInTheDocument()
    expect(getByTestId(Token.testIds.root).classList).toContain('Token--hasLeadingVisual')
  })

  it('renders a component-type leadingVisual and passes the shared className through', () => {
    const MockLeadingVisual = ({className}: {className?: string}) => (
      <svg data-testid="leading-visual" className={className} viewBox="0 0 16 16" aria-hidden="true" />
    )

    const {getByTestId} = render(<Token leadingVisual={MockLeadingVisual}>Token text</Token>)

    expect(getByTestId('leading-visual')).toHaveClass('Token__visual')
  })

  it('can optionally render as an anchor', () => {
    const {getByRole} = render(
      <Token as="a" href="https://github.com/features" target="_blank" rel="noreferrer">
        Token text
      </Token>,
    )

    const tokenLink = getByRole('link', {name: 'Token text'})

    expect(tokenLink).toHaveAttribute('href', 'https://github.com/features')
    expect(tokenLink).toHaveAttribute('target', '_blank')
    expect(tokenLink).toHaveAttribute('rel', 'noreferrer')
    expect(tokenLink.classList).toContain('Token--interactive')
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Token>Token text</Token>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
