import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Grid} from './Grid'

expect.extend(toHaveNoViolations)

describe('Grid', () => {
  afterEach(cleanup)

  const mockText = 'mock text'

  it('has no a11y violations on initial render', async () => {
    const {container} = render(
      <Grid>
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render any type of child inside a Grid.Column', () => {
    const {getByText} = render(
      <Grid>
        <Grid.Column>{mockText}</Grid.Column>
        <Grid.Column>{1}</Grid.Column>
        <Grid.Column>
          <>Fragment</>
        </Grid.Column>
      </Grid>
    )
    expect(getByText(mockText)).toBeInTheDocument()
    expect(getByText(1)).toBeInTheDocument()
    expect(getByText('Fragment')).toBeInTheDocument()
  })

  it('should render the expected number of html elements', () => {
    const maxCols = 12
    const columns = Array.from({length: maxCols}, (_, index) => <Grid.Column key={index}>{mockText}</Grid.Column>)

    const {container} = render(<Grid>{columns}</Grid>)

    expect(container.querySelectorAll('.Grid__column')).toHaveLength(maxCols)
  })

  it('should set the correct styles for column spanning when span is declared', () => {
    const {getByText} = render(
      <Grid>
        <Grid.Column span={6}>{mockText}</Grid.Column>
      </Grid>
    )

    const expectedClass = 'Grid__column--span-6'

    const columnEl = getByText(mockText)

    expect(columnEl).toHaveClass(expectedClass)
  })

  it('should set the correct styles for responsive column spanning when a map of breakpoints is provided', () => {
    const {getByText} = render(
      <Grid>
        <Grid.Column
          span={{
            small: 6,
            medium: 4,
            large: 3,
            xlarge: 2,
            xxlarge: 1
          }}
        >
          {mockText}
        </Grid.Column>
      </Grid>
    )

    const expectedClasses = [
      'Grid__column--small-span-6',
      'Grid__column--medium-span-4',
      'Grid__column--large-span-3',
      'Grid__column--xlarge-span-2',
      'Grid__column--xxlarge-span-1'
    ]

    const columnEl = getByText(mockText)

    for (const expectedClass of expectedClasses) {
      expect(columnEl).toHaveClass(expectedClass)
    }
  })

  it('should set the correct styles for column offseting when start is declared', () => {
    const {getByText} = render(
      <Grid>
        <Grid.Column span={6} start={6}>
          {mockText}
        </Grid.Column>
      </Grid>
    )

    const expectedClass = 'Grid__column--start-6'

    const columnEl = getByText(mockText)

    expect(columnEl).toHaveClass(expectedClass)
  })

  it('should set the correct styles for responsive column offsetting when a map of breakpoints is provided', () => {
    const {getByText} = render(
      <Grid>
        <Grid.Column
          start={{
            small: 6,
            medium: 4,
            large: 3,
            xlarge: 2,
            xxlarge: 1
          }}
        >
          {mockText}
        </Grid.Column>
      </Grid>
    )

    const expectedClasses = [
      'Grid__column--small-start-6',
      'Grid__column--medium-start-4',
      'Grid__column--large-start-3',
      'Grid__column--xlarge-start-2',
      'Grid__column--xxlarge-start-1'
    ]

    const columnEl = getByText(mockText)

    for (const expectedClass of expectedClasses) {
      expect(columnEl).toHaveClass(expectedClass)
    }
  })

  it('set relevant column overlay styles when enableOverlay is true', () => {
    const {container} = render(
      <Grid enableOverlay>
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>
    )
    const expectedClass = 'Grid--has-overlay'

    expect(container.firstChild).toHaveClass(expectedClass)
  })

  it('set relevant styles when  gutters is condensed', () => {
    const {container} = render(
      <Grid gutters="condensed">
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>
    )
    const expectedClass = 'Grid--gutter-condensed'

    expect(container.firstChild).toHaveClass(expectedClass)
  })

  it('set relevant styles when gutters is normal', () => {
    const {container} = render(
      <Grid gutters="normal">
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>
    )
    const expectedClass = 'Grid--gutter-normal'

    expect(container.firstChild).toHaveClass(expectedClass)
  })

  it('set relevant styles when gutters is spacious', () => {
    const {container} = render(
      <Grid gutters="spacious">
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>
    )
    const expectedClass = 'Grid--gutter-spacious'

    expect(container.firstChild).toHaveClass(expectedClass)
  })

  it('should set default styles when no gap is set', () => {
    const {container} = render(
      <Grid>
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>
    )
    const expectedClass = 'Grid--normal'

    expect(container.firstChild).toHaveClass(expectedClass)
  })

  it('should set relevant styles when gap is set to condensed', () => {
    const {container} = render(
      <Grid gap="condensed">
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>
    )
    const expectedClass = 'Grid--condensed'

    expect(container.firstChild).toHaveClass(expectedClass)
  })

  it('should set relevant styles when gap is set to normal', () => {
    const {container} = render(
      <Grid gap="normal">
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>
    )
    const expectedClass = 'Grid--normal'

    expect(container.firstChild).toHaveClass(expectedClass)
  })

  it('should set relevant styles when gap is set to spacious', () => {
    const {container} = render(
      <Grid gap="spacious">
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>
    )
    const expectedClass = 'Grid--spacious'

    expect(container.firstChild).toHaveClass(expectedClass)
  })
})
