/** @jest-environment node */

import React from 'react'
import {renderToString} from 'react-dom/server'
import {FeatureComparisonTable} from './FeatureComparisonTable'

describe('FeatureComparisonTable SSR', () => {
  it('renders a single comparison projection without a browser', () => {
    const markup = renderToString(
      <FeatureComparisonTable>
        <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
        <FeatureComparisonTable.Item>
          <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
        </FeatureComparisonTable.Item>
        <FeatureComparisonTable.Group expanded>
          <FeatureComparisonTable.GroupHeading>Core features</FeatureComparisonTable.GroupHeading>
          <FeatureComparisonTable.Row>
            <FeatureComparisonTable.RowHeading>Storage</FeatureComparisonTable.RowHeading>
            <FeatureComparisonTable.Cell>
              <span id="storage-value">10 GB</span>
            </FeatureComparisonTable.Cell>
          </FeatureComparisonTable.Row>
        </FeatureComparisonTable.Group>
      </FeatureComparisonTable>,
    )

    expect(markup).toContain('Compare plans')
    expect(markup).toContain('Core features')
    expect(markup).toContain('Storage')
    expect(markup).toContain('10 GB')
    expect(markup).toContain(`data-testid="${FeatureComparisonTable.testIds.narrow}"`)
    expect(markup).not.toContain(`data-testid="${FeatureComparisonTable.testIds.table}"`)
    expect(markup.match(/id="storage-value"/g)).toHaveLength(1)
  })
})
