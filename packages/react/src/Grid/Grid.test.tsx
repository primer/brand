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
      </Grid>,
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
      </Grid>,
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
      </Grid>,
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
            xxlarge: 1,
          }}
        >
          {mockText}
        </Grid.Column>
      </Grid>,
    )

    const expectedClasses = [
      'Grid__column--small-span-6',
      'Grid__column--medium-span-4',
      'Grid__column--large-span-3',
      'Grid__column--xlarge-span-2',
      'Grid__column--xxlarge-span-1',
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
      </Grid>,
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
            xxlarge: 1,
          }}
        >
          {mockText}
        </Grid.Column>
      </Grid>,
    )

    const expectedClasses = [
      'Grid__column--small-start-6',
      'Grid__column--medium-start-4',
      'Grid__column--large-start-3',
      'Grid__column--xlarge-start-2',
      'Grid__column--xxlarge-start-1',
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
      </Grid>,
    )
    const expectedClass = 'Grid--has-overlay'

    expect(container.firstChild).toHaveClass(expectedClass)
  })

  it('should allow setting the element as a section', () => {
    const {getByTestId, getByText} = render(
      <Grid as="section" data-testid="Grid-1">
        <Grid.Column as="section">{mockText}</Grid.Column>
      </Grid>,
    )

    const rootEl = getByTestId(`${Grid.testIds.root}-1`)
    const columnEl = getByText(mockText)

    expect(rootEl.tagName).toBe('SECTION')
    expect(columnEl.tagName).toBe('SECTION')
  })

  it('should allow setting the element as a span', () => {
    const {getByTestId, getByText} = render(
      <Grid as="span" data-testid="Grid-1">
        <Grid.Column as="span">{mockText}</Grid.Column>
      </Grid>,
    )

    const rootEl = getByTestId(`${Grid.testIds.root}-1`)
    const columnEl = getByText(mockText)

    expect(rootEl.tagName).toBe('SPAN')
    expect(columnEl.tagName).toBe('SPAN')
  })

  it('is doesnt allow setting a tag besides span, section and div and will default to latter', () => {
    const {getByTestId, getByText} = render(
      // @ts-expect-error TSC recognizes the error, but this test verifies expected behaviour for non-TS users using the compiled code
      <Grid as="ul" data-testid="Grid-1">
        {/* @ts-expect-error TSC recognizes the error, but this test verifies expected behaviour for non-TS users using the compiled code */}
        <Grid.Column as="li">{mockText}</Grid.Column>
      </Grid>,
    )

    const rootEl = getByTestId(`${Grid.testIds.root}-1`)
    const columnEl = getByText(mockText)

    expect(rootEl.tagName).toBe('DIV')
    expect(columnEl.tagName).toBe('DIV')
  })

  it('adds a class of 12 for xsmall breakpoints when no span is provided to ensure it spans full-width by default', () => {
    const {getByTestId} = render(
      <Grid>
        <Grid.Column
          data-testid="Grid-Column-1"
          span={{
            large: 6,
          }}
        ></Grid.Column>
        <Grid.Column
          data-testid="Grid-Column-2"
          span={{
            xsmall: 3,
            large: 6,
          }}
        ></Grid.Column>
      </Grid>,
    )

    expect(getByTestId('Grid-Column-1')).toHaveClass('Grid__column--large-span-6')

    expect(getByTestId('Grid-Column-2')).toHaveClass('Grid__column--xsmall-span-3')
    expect(getByTestId('Grid-Column-1')).toHaveClass('Grid__column--large-span-6')
    expect(getByTestId('Grid-Column-2')).not.toHaveClass('Grid__column--xsmall-span-12')
  })

  it('should apply default columnGap class by default', () => {
    const {container} = render(
      <Grid>
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>,
    )

    expect(container.firstChild).toHaveClass('Grid--columnGap-default')
  })

  it('should apply none columnGap class when columnGap is set to none', () => {
    const {container} = render(
      <Grid columnGap="none">
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>,
    )

    expect(container.firstChild).toHaveClass('Grid--columnGap-none')
    expect(container.firstChild).not.toHaveClass('Grid--columnGap-default')
  })

  it('should apply default rowGap class by default', () => {
    const {container} = render(
      <Grid>
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>,
    )

    expect(container.firstChild).toHaveClass('Grid--rowGap-default')
  })

  it('should apply none rowGap class when rowGap is set to none', () => {
    const {container} = render(
      <Grid rowGap="none">
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>,
    )

    expect(container.firstChild).toHaveClass('Grid--rowGap-none')
    expect(container.firstChild).not.toHaveClass('Grid--rowGap-default')
  })

  it('should apply gutter styles by default', () => {
    const {container} = render(
      <Grid>
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>,
    )

    expect(container.firstChild).toHaveClass('Grid--has-gutters')
  })

  it('should not apply gutter styles when enableGutters is false', () => {
    const {container} = render(
      <Grid enableGutters={false}>
        <Grid.Column>{mockText}</Grid.Column>
      </Grid>,
    )

    expect(container.firstChild).not.toHaveClass('Grid--has-gutters')
  })
})
