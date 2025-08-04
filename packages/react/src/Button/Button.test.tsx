import React, {render, cleanup, act} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import {Button, ButtonSizes, ButtonVariants} from './Button'
import {axe, toHaveNoViolations} from 'jest-axe'
import {SearchIcon} from '@primer/octicons-react'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders correctly into the document', () => {
    const {getByRole} = render(
      <Button variant="primary" size="medium">
        Primary Button
      </Button>,
    )
    const btnEl = getByRole('button')

    expect(btnEl).toBeInTheDocument()
  })

  it('no a11y violations', async () => {
    const {container} = render(
      <Button variant="primary" size="medium">
        Primary Button
      </Button>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('sets the aria-disabled attribute to true when disabled prop is true and component is rendered as a link', () => {
    const {getByRole} = render(
      <Button disabled as="a" href="#">
        Primary Button
      </Button>,
    )
    const linkEl = getByRole('link', {name: 'Primary Button'})

    expect(linkEl).toHaveAttribute('aria-disabled')
    expect(linkEl).not.toHaveAttribute('disabled')
  })

  it('triggers correct animations on button arrow during a hover event', async () => {
    const expectedClass = 'ExpandableArrow--expanded'
    const {getByRole, getByTestId} = render(<Button hasArrow>Button</Button>)

    const el = getByTestId(Button.testIds.expandableArrow)

    await act(async () => {
      await userEvent.hover(getByRole('button'))
    })
    expect(el.classList).toContain(expectedClass)

    await act(async () => {
      await userEvent.unhover(getByRole('button'))
    })
    expect(el.classList).not.toContain(expectedClass)
  })

  it('does not trigger a hover event on expandable arrow if button is disabled', async () => {
    const expectedClass = 'ExpandableArrow--expanded'
    const {getByRole, getByTestId} = render(
      <Button hasArrow disabled>
        Button
      </Button>,
    )

    await act(async () => {
      await userEvent.hover(getByRole('button'))
    })

    expect(getByTestId(Button.testIds.expandableArrow).classList).not.toContain(expectedClass)
  })

  it('does not trigger a focus event on expandable arrow if button is disabled', async () => {
    const expectedClass = 'ExpandableArrow--expanded'
    const {getByTestId} = render(
      <Button disabled hasArrow>
        Button
      </Button>,
    )

    await act(async () => {
      await userEvent.tab()
    })

    const expandableArrowEl = getByTestId(Button.testIds.expandableArrow)

    expect(expandableArrowEl.classList).not.toContain(expectedClass)
  })

  it('applies expected logic to expandable arrow on focus', async () => {
    const expectedClass = 'ExpandableArrow--expanded'
    const {getByTestId} = render(<Button hasArrow>Button</Button>)

    await act(async () => {
      await userEvent.tab()
    })

    const expandableArrowEl = getByTestId(Button.testIds.expandableArrow)

    expect(expandableArrowEl.classList).toContain(expectedClass)

    await act(async () => {
      await userEvent.click(document.body)
    })

    expect(expandableArrowEl.classList).not.toContain(expectedClass)
  })

  it('does not render leading or trailing icons by default', () => {
    const leadingVisualId = Button.testIds.leadingVisual
    const trailingVisualId = Button.testIds.trailingVisual

    const {queryByTestId} = render(<Button>Button</Button>)

    const leadingIconSlot = queryByTestId(leadingVisualId)
    const trailingIconSlot = queryByTestId(trailingVisualId)

    expect(leadingIconSlot).not.toBeInTheDocument()
    expect(trailingIconSlot).not.toBeInTheDocument()
  })

  it('can optionally render a leading visual', () => {
    const leadingVisualId = Button.testIds.leadingVisual

    const {getByTestId} = render(<Button leadingVisual={<SearchIcon aria-label="Search icon" />}>Button</Button>)

    const el = getByTestId(leadingVisualId)

    expect(el).toContainElement(el.querySelector('svg'))
  })

  it('can optionally render a trailing visual', () => {
    const trailingVisualId = Button.testIds.trailingVisual

    const {getByTestId} = render(<Button trailingVisual={<SearchIcon />}>Button</Button>)

    const el = getByTestId(trailingVisualId)

    expect(el).toContainElement(el.querySelector('svg'))
  })

  it('hides the decorative leading and trailing visuals from screen readers', () => {
    const slots = ['leadingVisual', 'trailingVisual']

    for (const slot of slots) {
      const visualId = Button.testIds[slot]

      const {getByTestId} = render(<Button {...{[slot]: <SearchIcon />}}>Button</Button>)

      const el = getByTestId(visualId).querySelector('svg')

      expect(el).toHaveAttribute('aria-hidden', 'true')
    }
  })
})
