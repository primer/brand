import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Tiles} from './Tiles'
import '../test-utils/mocks/match-media-mock'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Tiles', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document with default options', () => {
    const {getByTestId} = render(
      <Tiles>
        <Tiles.Item name="VS Code">
          <svg data-testid="svg1" aria-label="VS Code" />
        </Tiles.Item>
        <Tiles.Item name="Copilot">
          <svg data-testid="svg2" aria-label="Copilot" />
        </Tiles.Item>
      </Tiles>,
    )

    expect(getByTestId(Tiles.testIds.root)).toBeInTheDocument()
    expect(getByTestId(Tiles.testIds.grid)).toBeInTheDocument()
    expect(getByTestId('svg1')).toBeInTheDocument()
    expect(getByTestId('svg2')).toBeInTheDocument()
  })

  it('applies the default variant class', () => {
    const {getByTestId} = render(
      <Tiles>
        <Tiles.Item name="VS Code">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    const rootEl = getByTestId(Tiles.testIds.root)
    expect(rootEl.classList).toContain('Tiles--variant-default')
  })

  it('applies the gridlines variant class', () => {
    const {getByTestId} = render(
      <Tiles variant="gridlines">
        <Tiles.Item name="VS Code">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    const rootEl = getByTestId(Tiles.testIds.root)
    expect(rootEl.classList).toContain('Tiles--variant-gridlines')
  })

  it('applies the default layout class', () => {
    const {getByTestId} = render(
      <Tiles>
        <Tiles.Item name="VS Code">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    const rootEl = getByTestId(Tiles.testIds.root)
    expect(rootEl.classList).toContain('Tiles--layout-default')
  })

  it('applies the compact layout class', () => {
    const {getByTestId} = render(
      <Tiles layout="compact">
        <Tiles.Item name="VS Code">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    const rootEl = getByTestId(Tiles.testIds.root)
    expect(rootEl.classList).toContain('Tiles--layout-compact')
  })

  it('renders a non-interactive item without a link', () => {
    const {getByTestId, queryByRole} = render(
      <Tiles>
        <Tiles.Item name="VS Code">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    const itemEl = getByTestId(Tiles.testIds.item)
    expect(itemEl).toBeInTheDocument()
    expect(queryByRole('link')).not.toBeInTheDocument()
  })

  it('renders an interactive item with a link when href is provided', () => {
    const {getByTestId, getByRole} = render(
      <Tiles>
        <Tiles.Item name="VS Code" href="https://code.visualstudio.com">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    const itemEl = getByTestId(Tiles.testIds.item)

    const linkEl = getByRole('link')
    expect(linkEl).toBeInTheDocument()
    expect(linkEl).toHaveAttribute('href', 'https://code.visualstudio.com')
  })

  it('renders the item name text', () => {
    const {getByText} = render(
      <Tiles>
        <Tiles.Item name="VS Code" href="https://example.com">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    expect(getByText('VS Code')).toBeInTheDocument()
  })

  it('renders an external link icon for interactive items', () => {
    const {container} = render(
      <Tiles>
        <Tiles.Item name="VS Code" href="https://example.com">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    const externalIcon = container.querySelector('.Tiles-item-icon')
    expect(externalIcon).toBeInTheDocument()
  })

  it('does not render an external link icon for non-interactive items', () => {
    const {container} = render(
      <Tiles>
        <Tiles.Item name="VS Code">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    const externalIcon = container.querySelector('.Tiles-item-icon')
    expect(externalIcon).not.toBeInTheDocument()
  })

  it('accepts a custom className', () => {
    const {getByTestId} = render(
      <Tiles className="custom-class">
        <Tiles.Item name="VS Code">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    const rootEl = getByTestId(Tiles.testIds.root)
    expect(rootEl.classList).toContain('custom-class')
  })

  it('accepts a custom data-testid', () => {
    const {getByTestId} = render(
      <Tiles data-testid="custom-testid">
        <Tiles.Item name="VS Code">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    expect(getByTestId('custom-testid')).toBeInTheDocument()
  })

  it('accepts a custom data-testid on items', () => {
    const {getByTestId} = render(
      <Tiles>
        <Tiles.Item name="VS Code" data-testid="custom-item">
          <svg aria-label="VS Code" />
        </Tiles.Item>
      </Tiles>,
    )

    expect(getByTestId('custom-item')).toBeInTheDocument()
  })

  it('renders multiple items', () => {
    const {getAllByTestId} = render(
      <Tiles>
        <Tiles.Item name="Item 1">
          <svg aria-label="Item 1" />
        </Tiles.Item>
        <Tiles.Item name="Item 2">
          <svg aria-label="Item 2" />
        </Tiles.Item>
        <Tiles.Item name="Item 3">
          <svg aria-label="Item 3" />
        </Tiles.Item>
      </Tiles>,
    )

    expect(getAllByTestId(Tiles.testIds.item)).toHaveLength(3)
  })

  it('has no a11y violations for non-interactive tiles', async () => {
    const {container} = render(
      <Tiles>
        <Tiles.Item name="VS Code">
          <svg aria-label="VS Code" role="img" />
        </Tiles.Item>
        <Tiles.Item name="Copilot">
          <svg aria-label="Copilot" role="img" />
        </Tiles.Item>
      </Tiles>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no a11y violations for interactive tiles', async () => {
    const {container} = render(
      <Tiles>
        <Tiles.Item name="VS Code" href="https://code.visualstudio.com">
          <svg aria-label="VS Code" role="img" />
        </Tiles.Item>
        <Tiles.Item name="Copilot" href="https://copilot.github.com">
          <svg aria-label="Copilot" role="img" />
        </Tiles.Item>
      </Tiles>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no a11y violations with gridlines variant', async () => {
    const {container} = render(
      <Tiles variant="gridlines">
        <Tiles.Item name="VS Code" href="https://code.visualstudio.com">
          <svg aria-label="VS Code" role="img" />
        </Tiles.Item>
      </Tiles>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
