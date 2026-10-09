import React from 'react'
import {cleanup, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Spinner} from './Spinner'

expect.extend(toHaveNoViolations)

describe('Spinner', () => {
  afterEach(cleanup)

  it('renders a medium spinner with accessible loading text by default', () => {
    const {getByTestId, getByText} = render(<Spinner />)

    expect(getByTestId('Spinner')).toHaveClass('Spinner', 'Spinner--medium')
    expect(getByText('Loading')).toHaveClass('visually-hidden')
  })

  it('supports custom and omitted assistive text', () => {
    const {getByText, queryByText, rerender} = render(<Spinner accessibleLabel="Saving" />)

    expect(getByText('Saving')).toHaveClass('visually-hidden')

    rerender(<Spinner accessibleLabel={null} />)
    expect(queryByText('Saving')).not.toBeInTheDocument()
    expect(queryByText('Loading')).not.toBeInTheDocument()
  })

  it.each([<Spinner key="labelled" />, <Spinner key="decorative" accessibleLabel={null} />])(
    'has no accessibility violations',
    async spinner => {
      const {container} = render(spinner)

      expect(await axe(container)).toHaveNoViolations()
    },
  )

  it('renders the Primer React ring and rounded arc as a decorative SVG', () => {
    const {getByTestId} = render(<Spinner />)
    const indicator = getByTestId('Spinner')
    const ring = indicator.querySelector('circle')
    const arc = indicator.querySelector('path')

    expect(indicator.tagName).toBe('svg')
    expect(indicator).toHaveAttribute('viewBox', '0 0 16 16')
    expect(indicator).toHaveAttribute('fill', 'none')
    expect(indicator).toHaveAttribute('aria-hidden', 'true')
    expect(indicator).toHaveAttribute('focusable', 'false')
    expect(ring).toHaveAttribute('r', '7')
    expect(ring).toHaveAttribute('fill', 'none')
    expect(ring).toHaveAttribute('stroke', 'currentColor')
    expect(ring).toHaveAttribute('stroke-opacity', '0.25')
    expect(ring).toHaveAttribute('stroke-width', '2')
    expect(ring).toHaveAttribute('vector-effect', 'non-scaling-stroke')
    expect(arc).toHaveAttribute('d', 'M15 8a7.002 7.002 0 00-7-7')
    expect(arc).toHaveAttribute('fill', 'none')
    expect(arc).toHaveAttribute('stroke', 'currentColor')
    expect(arc).toHaveAttribute('stroke-width', '2')
    expect(arc).toHaveAttribute('stroke-linecap', 'round')
    expect(arc).toHaveAttribute('vector-effect', 'non-scaling-stroke')
  })

  it.each(['small', 'medium', 'large'] as const)('renders the %s size', size => {
    const {getByTestId} = render(<Spinner size={size} />)

    expect(getByTestId('Spinner')).toHaveClass(`Spinner--${size}`)
  })

  it('preserves consumer styling and test IDs', () => {
    const {getByTestId} = render(<Spinner size="small" className="custom-spinner" data-testid="saving" />)

    expect(getByTestId('saving')).toHaveClass('Spinner', 'Spinner--small', 'custom-spinner')
  })
})
