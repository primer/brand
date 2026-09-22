import React from 'react'
import {fireEvent, render, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import {RiverAccordion, RiverAccordionVariants, type RiverAccordionProps} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

const mockMatchMedia = jest.fn()
window.matchMedia = mockMatchMedia

beforeEach(() => {
  mockMatchMedia.mockImplementation(() => ({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }))
})

const MockRiverAccordion = ({align, variant}: RiverAccordionProps) => (
  <RiverAccordion align={align} variant={variant}>
    <RiverAccordion.Item>
      <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
      <RiverAccordion.Content>Content 1</RiverAccordion.Content>
      <RiverAccordion.Visual>
        <img src="test-1.png" alt="placeholder 1" />
      </RiverAccordion.Visual>
    </RiverAccordion.Item>
    <RiverAccordion.Item>
      <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
      <RiverAccordion.Content>Content 2</RiverAccordion.Content>
      <RiverAccordion.Visual>
        <img src="test-2.png" alt="placeholder 2" />
      </RiverAccordion.Visual>
    </RiverAccordion.Item>
    <RiverAccordion.Item>
      <RiverAccordion.Heading>Heading 3</RiverAccordion.Heading>
      <RiverAccordion.Content>Content 3</RiverAccordion.Content>
      <RiverAccordion.Visual>
        <img src="test-3.png" alt="placeholder 3" />
      </RiverAccordion.Visual>
    </RiverAccordion.Item>
  </RiverAccordion>
)

describe('RiverAccordion', () => {
  it('has no a11y violations', async () => {
    const {container} = render(<MockRiverAccordion />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('has no a11y violations with gridline variant', async () => {
    const {container} = render(<MockRiverAccordion variant="gridline" />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('expands the first item by default', () => {
    const {getByText, getByRole} = render(<MockRiverAccordion />)

    expect(getByRole('button', {name: 'Heading 1'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('button', {name: 'Heading 2'})).toHaveAttribute('aria-expanded', 'false')
    expect(getByRole('button', {name: 'Heading 3'})).toHaveAttribute('aria-expanded', 'false')

    expect(getByText('Content 1')).toBeInTheDocument()
    expect(getByText('Content 2').parentElement).toHaveAttribute('aria-hidden', 'true')
    expect(getByText('Content 3').parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('falls back to the last available item when the active item is removed', async () => {
    const renderAccordion = (itemNumbers: number[]) => (
      <RiverAccordion>
        {itemNumbers.map(itemNumber => (
          <RiverAccordion.Item key={itemNumber}>
            <RiverAccordion.Heading>Heading {itemNumber}</RiverAccordion.Heading>
            <RiverAccordion.Content>Content {itemNumber}</RiverAccordion.Content>
            <RiverAccordion.Visual>
              <img src={`test-${itemNumber}.png`} alt={`placeholder ${itemNumber}`} />
            </RiverAccordion.Visual>
          </RiverAccordion.Item>
        ))}
      </RiverAccordion>
    )
    const user = userEvent.setup()
    const {container, getByRole, rerender} = render(renderAccordion([1, 2, 3]))

    await user.click(getByRole('button', {name: 'Heading 3'}))
    const thirdVisual = container.querySelectorAll('.RiverAccordion__visual--shared')[2]
    fireEvent.animationEnd(thirdVisual)

    rerender(renderAccordion([1]))

    expect(getByRole('button', {name: 'Heading 1'})).toHaveAttribute('aria-expanded', 'true')
    expect(container.querySelector('.RiverAccordion__visual--shared')).toHaveClass('RiverAccordion__visual--current')
  })

  it('collapses the expanded item when a collapsed item is clicked', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(<MockRiverAccordion />)

    expect(getByRole('button', {name: 'Heading 1'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('button', {name: 'Heading 2'})).toHaveAttribute('aria-expanded', 'false')

    await user.click(getByRole('button', {name: 'Heading 2'}))

    expect(getByRole('button', {name: 'Heading 1'})).toHaveAttribute('aria-expanded', 'false')
    expect(getByRole('button', {name: 'Heading 2'})).toHaveAttribute('aria-expanded', 'true')
  })

  it('transitions visuals in the direction of the selected item', async () => {
    const user = userEvent.setup()
    const {container, getByRole} = render(<MockRiverAccordion />)
    const visuals = container.querySelectorAll('.RiverAccordion__visualsWrapper > .RiverAccordion__visual')

    expect(visuals[0]).toHaveClass('RiverAccordion__visual--current')

    await user.click(getByRole('button', {name: 'Heading 3'}))

    expect(visuals[0]).toHaveClass('RiverAccordion__visual--exit')
    expect(visuals[2]).toHaveClass('RiverAccordion__visual--next')

    fireEvent.animationEnd(visuals[2])

    expect(visuals[2]).toHaveClass('RiverAccordion__visual--current')

    await user.click(getByRole('button', {name: 'Heading 1'}))

    expect(visuals[2]).toHaveClass('RiverAccordion__visual--exit')
    expect(visuals[0]).toHaveClass('RiverAccordion__visual--prev')
  })

  it('switches visuals without a transition when reduced motion is preferred', async () => {
    mockMatchMedia.mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))

    const user = userEvent.setup()
    const {container, getByRole} = render(<MockRiverAccordion />)
    const visuals = container.querySelectorAll('.RiverAccordion__visualsWrapper > .RiverAccordion__visual')

    await user.click(getByRole('button', {name: 'Heading 2'}))

    expect(visuals[0]).not.toHaveClass('RiverAccordion__visual--exit')
    expect(visuals[1]).toHaveClass('RiverAccordion__visual--current')
  })

  it('expands a collapsed item when clicked', async () => {
    const user = userEvent.setup()
    const {getByRole, getByText} = render(<MockRiverAccordion />)

    expect(getByRole('button', {name: 'Heading 3'})).toHaveAttribute('aria-expanded', 'false')
    expect(getByText('Content 3').parentElement).toHaveAttribute('aria-hidden', 'true')

    await user.click(getByRole('button', {name: 'Heading 3'}))

    expect(getByRole('button', {name: 'Heading 3'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByText('Content 3').parentElement).not.toHaveAttribute('aria-hidden', 'true')
  })

  it('does not collapse an expanded item when clicked', async () => {
    const user = userEvent.setup()
    const {getByRole, getByText} = render(<MockRiverAccordion />)

    expect(getByRole('button', {name: 'Heading 1'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByText('Content 1').parentElement).not.toHaveAttribute('aria-hidden', 'true')

    await user.click(getByRole('button', {name: 'Heading 1'}))

    expect(getByRole('button', {name: 'Heading 1'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByText('Content 1').parentElement).not.toHaveAttribute('aria-hidden', 'true')
  })

  it('does not collapse an expanded item when the Escape key is pressed', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(<MockRiverAccordion />)

    expect(getByRole('button', {name: 'Heading 1'})).toHaveAttribute('aria-expanded', 'true')

    await user.type(getByRole('button', {name: 'Heading 1'}), '{Escape}')

    expect(getByRole('button', {name: 'Heading 1'})).toHaveAttribute('aria-expanded', 'true')
  })

  it('does not expose collapsed accordion items to the accessibility tree', () => {
    const {getByText} = render(<MockRiverAccordion />)

    const content2 = getByText('Content 2').parentElement
    const content3 = getByText('Content 3').parentElement

    expect(content2).toHaveAttribute('aria-hidden', 'true')
    expect(content2).toHaveAttribute('inert')

    expect(content3).toHaveAttribute('aria-hidden', 'true')
    expect(content3).toHaveAttribute('inert')
  })

  it('allows expanded content to be focused', async () => {
    const user = userEvent.setup()
    const {getByText} = render(
      <RiverAccordion>
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <button>Focusable button</button>
          </RiverAccordion.Content>
          <RiverAccordion.Visual>
            <img src="test-1.png" alt="placeholder 1" />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>,
    )

    await user.tab()
    expect(getByText('Heading 1')).toHaveFocus()

    await user.tab()
    expect(getByText('Focusable button')).toHaveFocus()
  })

  it('does not allow collapsed content to be focused', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(
      <RiverAccordion>
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <button>Focusable button 1</button>
          </RiverAccordion.Content>
          <RiverAccordion.Visual>
            <img src="test-1.png" alt="placeholder 1" />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
          <RiverAccordion.Content>
            <button>Focusable button 2</button>
          </RiverAccordion.Content>
          <RiverAccordion.Visual>
            <img src="test-2.png" alt="placeholder 2" />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>,
    )

    await user.tab()
    await user.tab()
    await user.tab()

    expect(getByRole('button', {name: 'Heading 2'})).toHaveFocus()
  })

  it('hides the visual from the accessibility tree', () => {
    const {container} = render(<MockRiverAccordion />)

    const visual = container.querySelector('.RiverAccordion__visualsWrapper .RiverAccordion__visual')

    expect(visual).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies shared visual styles only to visible visual clones', () => {
    const {container, getByText} = render(<MockRiverAccordion />)
    const sharedVisual = container.querySelector('.RiverAccordion__visual--shared')
    const panel = getByText('Content 1').parentElement

    if (!panel) {
      throw new Error('Panel not found')
    }

    const hiddenVisual = panel.querySelector('.RiverAccordion__visual')

    expect(sharedVisual).toHaveClass('RiverAccordion__visual')
    expect(sharedVisual).not.toHaveClass('RiverAccordion__visual--gridline')
    expect(hiddenVisual).not.toHaveClass('RiverAccordion__visual--shared')
  })

  it('includes a visually hidden image within the accordion content', () => {
    const {getByText} = render(<MockRiverAccordion />)
    const panel = getByText('Content 1').parentElement

    if (!panel) {
      throw new Error('Panel not found')
    }

    const img = within(panel).getByAltText('placeholder 1')

    expect(img).toBeInTheDocument()
  })

  it('applies the background class to visible and visually hidden visuals in gridline variant', () => {
    const {container, getByText} = render(<MockRiverAccordion variant="gridline" />)
    const visibleVisual = container.querySelector('.RiverAccordion__visualsWrapper .RiverAccordion__visual')
    const panel = getByText('Content 1').parentElement

    if (!panel) {
      throw new Error('Panel not found')
    }

    const hiddenVisual = panel.querySelector('.RiverAccordion__visual')

    expect(visibleVisual).toHaveClass('RiverAccordion__visual--has-background')
    expect(visibleVisual).toHaveClass('RiverAccordion__visual--gridline')
    expect(hiddenVisual).toHaveClass('RiverAccordion__visual--has-background')
    expect(hiddenVisual).not.toHaveClass('RiverAccordion__visual--gridline')
  })

  it('omits the background class by default', () => {
    const {container} = render(<MockRiverAccordion />)

    expect(container.querySelector('.RiverAccordion__visual--has-background')).not.toBeInTheDocument()
  })

  it('supports opt-out bg color for gridline variants', async () => {
    const user = userEvent.setup()
    const {container, getByRole, getByText} = render(
      <RiverAccordion variant="gridline">
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 1</RiverAccordion.Heading>
          <RiverAccordion.Content>Content 1</RiverAccordion.Content>
          <RiverAccordion.Visual hasBackground={false}>
            <img src="test-1.png" alt="placeholder 1" />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
        <RiverAccordion.Item>
          <RiverAccordion.Heading>Heading 2</RiverAccordion.Heading>
          <RiverAccordion.Content>Content 2</RiverAccordion.Content>
          <RiverAccordion.Visual>
            <img src="test-2.png" alt="placeholder 2" />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>,
    )
    const accordionRoot = container.firstChild
    const visibleVisuals = container.querySelectorAll('.RiverAccordion__visualsWrapper > .RiverAccordion__visual')
    const firstPanel = getByText('Content 1').parentElement!
    const secondPanel = getByText('Content 2').parentElement!
    const firstHiddenVisual = firstPanel.querySelector('.RiverAccordion__visual')!
    const secondHiddenVisual = secondPanel.querySelector('.RiverAccordion__visual')!

    expect(visibleVisuals[0]).not.toHaveClass('RiverAccordion__visual--has-background')
    expect(visibleVisuals[1]).toHaveClass('RiverAccordion__visual--has-background')
    expect(firstHiddenVisual).not.toHaveClass('RiverAccordion__visual--has-background')
    expect(secondHiddenVisual).toHaveClass('RiverAccordion__visual--has-background')
    expect(accordionRoot).not.toHaveClass('RiverAccordion--active-item-has-background')

    await user.click(getByRole('button', {name: 'Heading 2'}))

    expect(accordionRoot).toHaveClass('RiverAccordion--active-item-has-background')
  })

  it('renders a decorative leading visual in a heading', () => {
    const {getByRole, getByTestId} = render(
      <RiverAccordion>
        <RiverAccordion.Item>
          <RiverAccordion.Heading leadingVisual={<svg data-testid="leading-visual" />}>
            Heading 1
          </RiverAccordion.Heading>
          <RiverAccordion.Content>Content 1</RiverAccordion.Content>
          <RiverAccordion.Visual>
            <img src="test-1.png" alt="placeholder 1" />
          </RiverAccordion.Visual>
        </RiverAccordion.Item>
      </RiverAccordion>,
    )

    expect(getByRole('button', {name: 'Heading 1'})).toBeInTheDocument()
    expect(getByTestId('leading-visual').parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies the correct class when `align="start"`', () => {
    const {container} = render(<MockRiverAccordion align="start" />)

    const accordionRoot = container.firstChild

    expect(accordionRoot).toHaveClass('RiverAccordion__align-start')
  })

  it('applies the correct class when `align="end"`', () => {
    const {container} = render(<MockRiverAccordion align="end" />)

    const accordionRoot = container.firstChild

    expect(accordionRoot).toHaveClass('RiverAccordion__align-end')
  })

  it('renders a triangle-down icon on a collapsed item', () => {
    const {container} = render(<MockRiverAccordion />)

    // Heading 2 is collapsed by default (index 1), its icon span should contain the triangle-down SVG
    const buttons = container.querySelectorAll('button[aria-expanded]')
    const collapsedButton = buttons[1] // Heading 2
    const iconSpan = collapsedButton.querySelector('.RiverAccordion__icon')

    expect(iconSpan).toBeInTheDocument()
    const svg = iconSpan?.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('octicon-triangle-down')
  })

  it('renders a triangle-up icon on an expanded item', () => {
    const {container} = render(<MockRiverAccordion />)

    // Heading 1 is expanded by default (index 0), its icon span should contain the triangle-up SVG
    const buttons = container.querySelectorAll('button[aria-expanded]')
    const expandedButton = buttons[0] // Heading 1
    const iconSpan = expandedButton.querySelector('.RiverAccordion__icon')

    expect(iconSpan).toBeInTheDocument()
    const svg = iconSpan?.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('octicon-triangle-up')
  })

  it.each(RiverAccordionVariants)('applies the correct class for variant="%s"', variant => {
    const {container} = render(<MockRiverAccordion variant={variant} />)

    const accordionRoot = container.firstChild

    expect(accordionRoot).toHaveClass(`RiverAccordion--variant-${variant}`)
  })
})
