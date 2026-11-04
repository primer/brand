import React from 'react'
import {render, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ComparisonTable} from './ComparisonTable'

describe.each(['default', 'minimal'] as const)('ComparisonTable (%s)', variant => {
  it('keeps a populated first-column heading visible on narrow screens', () => {
    const {getAllByRole} = render(
      <ComparisonTable variant={variant}>
        <ComparisonTable.Row>
          <ComparisonTable.Cell>Use case</ComparisonTable.Cell>
          <ComparisonTable.Cell>GitHub</ComparisonTable.Cell>
          <ComparisonTable.Cell>Jenkins</ComparisonTable.Cell>
        </ComparisonTable.Row>
      </ComparisonTable>,
    )
    const header = within(getAllByRole('row')[0])
    const firstHeading = header.getByRole('columnheader', {name: 'Use case'})

    expect(firstHeading).toBeVisible()
    expect(firstHeading).not.toHaveClass('ComparisonTable-cell-heading--hidden-on-narrow')
    expect(firstHeading).not.toHaveClass('ComparisonTable-cell--bordered-on-narrow')
    expect(header.getByRole('columnheader', {name: /GitHub/})).toHaveClass(
      'ComparisonTable-cell-heading--hidden-on-narrow',
    )
    expect(header.getByRole('columnheader', {name: 'Jenkins'})).toHaveClass(
      'ComparisonTable-cell-heading--hidden-on-narrow',
    )
  })

  it('hides an empty first header cell on narrow screens', () => {
    const {getAllByRole} = render(
      <ComparisonTable variant={variant}>
        <ComparisonTable.Row>
          <ComparisonTable.Cell />
          <ComparisonTable.Cell>GitHub</ComparisonTable.Cell>
          <ComparisonTable.Cell>Jenkins</ComparisonTable.Cell>
        </ComparisonTable.Row>
      </ComparisonTable>,
    )
    const header = within(getAllByRole('row')[0])

    expect(header.getByRole('cell')).toHaveClass('ComparisonTable-cell-heading--hidden-on-narrow')
  })
})
