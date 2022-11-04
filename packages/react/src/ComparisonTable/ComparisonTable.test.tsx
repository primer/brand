import React, {cleanup, fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {ComparisonTable} from './ComparisonTable'

expect.extend(toHaveNoViolations)

describe('ComparisonTable', () => {
  afterEach(cleanup)

  const mockCellData = 'mock cell data'
  const mockFeatureOne = 'mock feature name one'
  const mockFeatureTwo = 'mock feature name two'
  const mockHeadingData = 'mock heading data'

  it('renders a table into the document, with correct heading cell', () => {
    const {getAllByRole, getByRole} = render(
      <ComparisonTable>
        <ComparisonTable.Row>
          <ComparisonTable.Cell>{mockHeadingData}</ComparisonTable.Cell>
          <ComparisonTable.Cell>{mockHeadingData}</ComparisonTable.Cell>
          <ComparisonTable.Cell>{mockHeadingData}</ComparisonTable.Cell>
        </ComparisonTable.Row>
        <ComparisonTable.Row>
          <ComparisonTable.Cell>{mockFeatureOne}</ComparisonTable.Cell>
          <ComparisonTable.Cell>{mockCellData}</ComparisonTable.Cell>
          <ComparisonTable.Cell>{mockCellData}</ComparisonTable.Cell>
        </ComparisonTable.Row>
        <ComparisonTable.Row>
          <ComparisonTable.Cell>{mockFeatureTwo}</ComparisonTable.Cell>
          <ComparisonTable.Cell>{mockCellData}</ComparisonTable.Cell>
          <ComparisonTable.Cell>{mockCellData}</ComparisonTable.Cell>
        </ComparisonTable.Row>
      </ComparisonTable>
    )

    const tableEl = getByRole('table')
    const cells = getAllByRole('cell')
    console.log(cells)

    expect(tableEl).toBeInTheDocument()
  })
})
