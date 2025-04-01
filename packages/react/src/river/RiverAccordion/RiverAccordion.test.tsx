import React, {render, screen, waitFor, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import {RiverAccordion, RiverAccordionProps} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

const MockRiverAccordion = ({align}: RiverAccordionProps) => (
  <RiverAccordion align={align}>
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

  it('expands the first item by default', () => {
    const {getByText, getByRole} = render(<MockRiverAccordion />)

    expect(getByRole('button', {name: 'Heading 1'})).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('button', {name: 'Heading 2'})).toHaveAttribute('aria-expanded', 'false')
    expect(getByRole('button', {name: 'Heading 3'})).toHaveAttribute('aria-expanded', 'false')

    expect(getByText('Content 1')).toBeInTheDocument()
    expect(getByText('Content 2').parentElement).toHaveAttribute('aria-hidden', 'true')
    expect(getByText('Content 3').parentElement).toHaveAttribute('aria-hidden', 'true')
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
    expect(content2).toHaveAttribute('inert', 'true')

    expect(content3).toHaveAttribute('aria-hidden', 'true')
    expect(content3).toHaveAttribute('inert', 'true')
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

  it('includes a visually hidden image within the accordion content', () => {
    const {getByText} = render(<MockRiverAccordion />)
    const panel = getByText('Content 1').parentElement

    if (!panel) {
      throw new Error('Panel not found')
    }

    const img = within(panel).getByAltText('placeholder 1')

    expect(img).toBeInTheDocument()
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
})
