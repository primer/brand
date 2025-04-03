import React, {render, cleanup, act} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import {Button, ButtonSizes, ButtonVariants} from './Button'
import {axe, toHaveNoViolations} from 'jest-axe'
import {SearchIcon} from '@primer/octicons-react'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  const disabledClass = 'Button--disabled'
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

  it('renders disabled state', async () => {
    const {getByRole} = render(
      <Button variant="primary" size="medium" disabled>
        Primary Button
      </Button>,
    )
    const btnEl = getByRole('button')

    expect(btnEl).toHaveAttribute('disabled')
    expect(btnEl.classList).toContain(disabledClass)
  })

  it('renders aria-disabled state', async () => {
    const {getByRole} = render(
      <Button variant="primary" size="medium" aria-disabled="true">
        Primary Button
      </Button>,
    )
    const btnEl = getByRole('button')

    expect(btnEl).toHaveAttribute('aria-disabled')
    expect(btnEl.classList).toContain(disabledClass)
  })

  it('triggers focus event if not disabled and aria-disabled equals false', async () => {
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation()

    render(
      // eslint-disable-next-line no-console
      <Button variant="primary" size="medium" aria-disabled="false" onFocus={() => console.log('Focused')}>
        Primary Button
      </Button>,
    )
    await act(async () => {
      await userEvent.tab()
    })

    expect(consoleSpy).toHaveBeenCalled()
  })

  it('does not trigger focus event if disabled', async () => {
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation()

    render(
      // eslint-disable-next-line no-console
      <Button variant="primary" size="medium" disabled onFocus={() => console.log('Focused')}>
        Primary Button
      </Button>,
    )
    await act(async () => {
      await userEvent.tab()
    })

    expect(consoleSpy).toHaveBeenCalled()
  })

  it('does not trigger event if aria-disabled', async () => {
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation()

    render(
      // eslint-disable-next-line no-console
      <Button variant="primary" size="medium" aria-disabled="true" onFocus={() => console.log('Focused')}>
        Primary Button
      </Button>,
    )
    await act(async () => {
      await userEvent.tab()
    })

    expect(consoleSpy).toHaveBeenCalled()
  })

  it('does not trigger press event if disabled', async () => {
    const consoleSpy = jest.spyOn(global.console, 'log').mockImplementation()

    const {getByRole} = render(
      // eslint-disable-next-line no-console
      <Button variant="primary" size="medium" disabled onClick={() => console.log('Pressed')}>
        Primary Button
      </Button>,
    )
    const btnEl = getByRole('button')
    btnEl.click()

    expect(consoleSpy).toHaveBeenCalled()
  })

  it.each(ButtonVariants)('hides the arrow by default for all button variants except subtle', variant => {
    const variantsWithArrow = ['subtle']

    const {getByRole} = render(<Button variant={variant}>{variant}</Button>)
    const btnEl = getByRole('button')
    if (variantsWithArrow.includes(variant)) {
      expect(btnEl.querySelector('.ExpandableArrow')).toBeInTheDocument()
    } else {
      expect(btnEl.querySelector('.ExpandableArrow')).not.toBeInTheDocument()
    }
  })

  it.each(ButtonVariants)('can apply optional arrow for all variants', variant => {
    const {getByRole} = render(
      <Button variant={variant} hasArrow>
        {variant}
      </Button>,
    )
    const btnEl = getByRole('button')

    expect(btnEl.querySelector('.ExpandableArrow')).toBeInTheDocument()
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

  it('passes the correct css class to icons when button is disabled', () => {
    const expectedClass = 'Button__icon-visual--disabled'

    const {getByTestId} = render(
      <Button trailingVisual={<SearchIcon />} leadingVisual={<SearchIcon />} disabled>
        Primary Button
      </Button>,
    )
    const trailingVisualEl = getByTestId(Button.testIds.trailingVisual).querySelector('svg')
    const leadingVisualEl = getByTestId(Button.testIds.leadingVisual).querySelector('svg')

    expect(leadingVisualEl?.classList).toContain(expectedClass)
    expect(trailingVisualEl?.classList).toContain(expectedClass)
  })

  it('accepts a native svg as a valid trailing or leading visual', () => {
    const mockId = 'mock-svg'
    const mockSvg = <svg data-testid={mockId} aria-label="Mock SVG" />

    const {getByTestId} = render(
      <Button trailingVisual={mockSvg} leadingVisual={mockSvg}>
        Primary Button
      </Button>,
    )

    const trailingIconSlot = getByTestId(Button.testIds.trailingVisual)
    const leadingIconSlot = getByTestId(Button.testIds.leadingVisual)

    expect(trailingIconSlot.childNodes).toContain(trailingIconSlot.querySelector(`[data-testid="${mockId}"]`))
    expect(leadingIconSlot.childNodes).toContain(leadingIconSlot.querySelector(`[data-testid="${mockId}"]`))
  })

  it('spans full width when block prop is true', () => {
    const {getByRole} = render(<Button block={true}>Full-Width Button</Button>)

    const btnEl = getByRole('button')

    expect(btnEl.classList).toContain('Button--block')
  })

  it('is not block by default', () => {
    const {getByRole} = render(<Button>Default Button</Button>)

    const btnEl = getByRole('button')

    expect(btnEl.classList).not.toContain('Button--block')
  })

  it('applies the correct class for each size', () => {
    for (const i in ButtonSizes) {
      const size = ButtonSizes[i]
      const {getAllByRole} = render(<Button size={size}>Button</Button>)

      const btnEl = getAllByRole('button')

      expect(btnEl[i].classList).toContain(`Button--size-${size}`)
    }
  })
})
