import React from 'react'
import {fireEvent, render, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {RiverBreakoutTabs} from '../'
import {Link, Text} from '../../'

expect.extend(toHaveNoViolations)

describe('RiverBreakoutTabs', () => {
  const MockVisual = ({label}: {label: string}) => <img src="file.jpg" alt={label} />

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1280,
    })
  })

  it('renders the first tab as selected by default', () => {
    const {getAllByRole, getAllByText} = render(
      <RiverBreakoutTabs>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Review</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Review content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="review visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    const tabs = getAllByRole('tab')

    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
    expect(getAllByText('Plan content').length).toBeGreaterThan(0)
    expect(getAllByText('Review content').length).toBeGreaterThan(0)
  })

  it('changes the selected tab when a different card is clicked', () => {
    const {getAllByRole, getByRole} = render(
      <RiverBreakoutTabs>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Review</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Review content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="review visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    const tabs = getAllByRole('tab')
    fireEvent.click(tabs[1])

    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(getByRole('tabpanel')).toHaveAttribute('id', tabs[1].getAttribute('aria-controls'))
  })

  it('applies the visual background class when imageBackgroundColor is set', () => {
    const {getAllByTestId} = render(
      <RiverBreakoutTabs>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual data-testid="visual-el" imageBackgroundColor="subtle">
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    for (const visual of getAllByTestId('visual-el')) {
      expect(visual).toHaveClass('River__visual--has-background')
    }
  })

  it('warns if a11y heading is not passed', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    render(
      <RiverBreakoutTabs>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'RiverBreakoutTabs: A11yHeading child is required. This element will not be visible, only read by screenreaders.',
    )

    consoleWarnSpy.mockRestore()
  })

  it('falls back to an aria-label when A11yHeading is not provided', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const {getByRole} = render(
      <RiverBreakoutTabs>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    const tablist = getByRole('tablist')
    expect(tablist).toHaveAttribute('aria-label', 'River breakout tabs')
    expect(tablist).not.toHaveAttribute('aria-labelledby')

    consoleWarnSpy.mockRestore()
  })

  it('does not call onChange when controlled selectedIndex changes from parent props', () => {
    const handleChange = jest.fn()

    const {rerender} = render(
      <RiverBreakoutTabs selectedIndex={0} onChange={handleChange}>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Review</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Review content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="review visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    rerender(
      <RiverBreakoutTabs selectedIndex={1} onChange={handleChange}>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Review</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Review content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="review visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('normalizes non-integer defaultSelectedIndex values', () => {
    const {getAllByRole} = render(
      <RiverBreakoutTabs defaultSelectedIndex={1.8}>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Review</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Review content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="review visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    const tabs = getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
  })

  it('treats NaN selectedIndex as uncontrolled fallback', () => {
    const {getAllByRole} = render(
      <RiverBreakoutTabs selectedIndex={Number.NaN} defaultSelectedIndex={1}>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Review</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Review content</Text>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="review visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    const tabs = getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
  })

  it('supports APG keyboard behavior: tab enters active tab, arrows activate next tab, tab moves to next interactive element', async () => {
    const user = userEvent.setup()

    const {getAllByRole, getByRole} = render(
      <RiverBreakoutTabs>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
            <Link href="#">Plan link</Link>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Review</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Review content</Text>
            <Link href="#">Review link</Link>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="review visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    const tabs = getAllByRole('tab')
    const [tabOne, tabTwo] = tabs

    await user.tab()
    expect(tabOne).toHaveFocus()
    expect(tabOne).toHaveAttribute('aria-selected', 'true')
    expect(tabTwo).toHaveAttribute('aria-selected', 'false')

    await user.keyboard('{ArrowRight}')
    expect(tabTwo).toHaveFocus()
    expect(tabOne).toHaveAttribute('aria-selected', 'false')
    expect(tabTwo).toHaveAttribute('aria-selected', 'true')

    await user.tab()
    const links = getAllByRole('link')
    expect(links[0]).toHaveFocus()
    expect(getByRole('tabpanel')).not.toHaveFocus()
  })

  it('keeps desktop tablist descendants restricted to tabs only', () => {
    const {getByRole, getAllByRole} = render(
      <RiverBreakoutTabs>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
            <Link href="#">Plan link</Link>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    const tablist = getByRole('tablist')
    expect(getAllByRole('link')).toHaveLength(1)
    expect(within(tablist).queryByRole('link')).not.toBeInTheDocument()
  })

  it('has no critical axe violations for desktop tabs', async () => {
    const {container} = render(
      <RiverBreakoutTabs>
        <RiverBreakoutTabs.A11yHeading>Agent workflows</RiverBreakoutTabs.A11yHeading>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Plan</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Plan content</Text>
            <Link href="#">Plan link</Link>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="plan visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
        <RiverBreakoutTabs.Item>
          <RiverBreakoutTabs.Heading>Review</RiverBreakoutTabs.Heading>
          <RiverBreakoutTabs.Content>
            <Text>Review content</Text>
            <Link href="#">Review link</Link>
          </RiverBreakoutTabs.Content>
          <RiverBreakoutTabs.Visual>
            <MockVisual label="review visual" />
          </RiverBreakoutTabs.Visual>
        </RiverBreakoutTabs.Item>
      </RiverBreakoutTabs>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
