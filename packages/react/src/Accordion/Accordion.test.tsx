import React, {createRef} from 'react'
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import {Accordion, AccordionToggleColors} from '../'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Accordion', () => {
  it('has no accessibility violations', async () => {
    const {container} = render(
      <Accordion>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>
          <p>Test content</p>
        </Accordion.Content>
      </Accordion>,
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('applies the correct classes for the default variant', () => {
    const {getByRole} = render(
      <Accordion variant="default">
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    expect(details).toHaveClass(`Accordion--default`)
  })

  it('applies the correct classes for the emphasis variant', () => {
    const {getByRole} = render(
      <Accordion variant="emphasis">
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    expect(details).toHaveClass(`Accordion--emphasis`)

    const summary = getByRole('heading', {name: 'Test heading'}).parentElement
    expect(summary).toHaveClass('Accordion__summary--emphasis')
  })

  it('allows forwarding of custom classes', () => {
    const {getByRole, getByText} = render(
      <Accordion className="custom-accordion">
        <Accordion.Heading className="custom-heading">Test heading</Accordion.Heading>
        <Accordion.Content className="custom-content">Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    expect(details).toHaveClass('Accordion')
    expect(details).toHaveClass('custom-accordion')

    const summary = getByRole('heading', {name: 'Test heading'}).parentElement
    expect(summary).toHaveClass('Accordion__summary')
    expect(summary).toHaveClass('custom-heading')

    const content = getByText('Test content')
    expect(content).toHaveClass('Accordion__content')
    expect(content).toHaveClass('custom-content')
  })

  it.each(AccordionToggleColors)('applies correct class for toggleColor %s', toggleColor => {
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading toggleColor={toggleColor}>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const summary = getByRole('heading', {name: 'Test heading'}).parentElement
    expect(summary).toHaveClass(`Accordion__summary--toggleColor-${toggleColor}`)
  })

  it('applies correct class based on reversedToggles prop', () => {
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading reversedToggles>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const summary = getByRole('heading', {name: 'Test heading'}).parentElement
    expect(summary).toHaveClass('Accordion__summary--reversed-toggles')
  })

  it.each([
    ['emphasis', 'Heading--6'],
    ['default', 'Heading--subhead-large'],
  ] as const)('has correct heading size for %s variant', (variant, expectedClass) => {
    const {getByRole} = render(
      <Accordion variant={variant}>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const heading = getByRole('heading')
    expect(heading).toHaveClass(expectedClass)
  })

  it('opens and closes when clicked', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading', {name: 'Test heading'})

    expect(details).not.toHaveAttribute('open')

    await user.click(heading)
    expect(details).toHaveAttribute('open')

    await user.click(heading)
    expect(details).not.toHaveAttribute('open')
  })

  it.each([['Enter'], ['Space']])('opens when %s is pressed on summary', async keyName => {
    const user = userEvent.setup()
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading', {name: 'Test heading'})

    expect(details).not.toHaveAttribute('open')

    await user.type(heading, `{${keyName}}`)
    expect(details).toHaveAttribute('open')
  })

  it('closes when Escape is pressed within accordion', async () => {
    const {getByRole} = render(
      <Accordion open>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')

    expect(details).toHaveAttribute('open')

    // Using fireEvent as userEvent doesn't trigger the keydown callback
    fireEvent.keyDown(details, {key: 'Escape'})

    expect(details).not.toHaveAttribute('open')
  })

  it('calls onToggle when accordion is toggled', async () => {
    const user = userEvent.setup()
    const onToggle = jest.fn()
    const {getByRole} = render(
      <Accordion onToggle={onToggle}>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const heading = getByRole('heading', {name: 'Test heading'})

    await user.click(heading)
    expect(onToggle).toHaveBeenCalledTimes(1)

    await user.click(heading)
    expect(onToggle).toHaveBeenCalledTimes(2)
  })

  it('calls onKeyDown when a key is pressed', async () => {
    const onKeyDown = jest.fn()
    const {getByRole} = render(
      <Accordion onKeyDown={onKeyDown}>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')

    // Using fireEvent as userEvent doesn't trigger the keydown callback
    fireEvent.keyDown(details)
    expect(onKeyDown).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(details)
    expect(onKeyDown).toHaveBeenCalledTimes(2)
  })

  it('calls handleOpen with correct value when opened and closed', async () => {
    const user = userEvent.setup()
    const handleOpen = jest.fn()
    const {getByRole} = render(
      <Accordion handleOpen={handleOpen}>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const heading = getByRole('heading', {name: 'Test heading'})

    await user.click(heading)
    expect(handleOpen).toHaveBeenCalledWith(true)

    await user.click(heading)
    expect(handleOpen).toHaveBeenCalledWith(false)
  })

  it('supports functional ref for Accordion', async () => {
    const user = userEvent.setup()
    const functionalRef = jest.fn()

    const {getByRole} = render(
      <Accordion ref={functionalRef}>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading')

    expect(functionalRef).toHaveBeenCalledWith(details)

    expect(details).not.toHaveAttribute('open')

    await user.click(heading)
    expect(details).toHaveAttribute('open')

    await user.click(heading)
    expect(details).not.toHaveAttribute('open')
  })

  it('supports RefObject ref for Accordion', async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLDetailsElement>()
    const {getByRole} = render(
      <Accordion ref={ref}>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading')

    expect(ref.current).toBe(details)

    expect(details).not.toHaveAttribute('open')

    await user.click(heading)
    expect(details).toHaveAttribute('open')

    await user.click(heading)
    expect(details).not.toHaveAttribute('open')
  })

  it('supports null ref for Accordion', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(
      <Accordion ref={null}>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading')

    expect(details).not.toHaveAttribute('open')

    await user.click(heading)
    expect(details).toHaveAttribute('open')

    await user.click(heading)
    expect(details).not.toHaveAttribute('open')
  })

  it('supports functional ref for Accordion.Heading', async () => {
    const user = userEvent.setup()
    const functionalRef = jest.fn()

    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading ref={functionalRef}>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const summary = getByRole('heading', {name: 'Test heading'}).parentElement as HTMLElement

    expect(functionalRef).toHaveBeenCalledWith(summary)

    expect(details).not.toHaveAttribute('open')

    await user.click(summary)
    expect(details).toHaveAttribute('open')

    await user.click(summary)
    expect(details).not.toHaveAttribute('open')
  })

  it('supports RefObject ref for Accordion.Heading', async () => {
    const user = userEvent.setup()
    const ref = createRef<HTMLHeadingElement>()
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading ref={ref}>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const summary = getByRole('heading', {name: 'Test heading'}).parentElement as HTMLElement

    expect(ref.current).toBe(summary)

    expect(details).not.toHaveAttribute('open')

    await user.click(summary)
    expect(details).toHaveAttribute('open')

    await user.click(summary)
    expect(details).not.toHaveAttribute('open')
  })

  it('supports null ref for Accordion.Heading', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading ref={null}>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading')

    expect(details).not.toHaveAttribute('open')

    await user.click(heading)
    expect(details).toHaveAttribute('open')

    await user.click(heading)
    expect(details).not.toHaveAttribute('open')
  })

  it('uses semantic HTML structure', () => {
    const {getByRole, getByText} = render(
      <Accordion>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const summary = getByRole('heading', {name: 'Test heading'}).parentElement as HTMLElement
    const content = getByText('Test content')

    expect(details.tagName).toBe('DETAILS')
    expect(summary.tagName).toBe('SUMMARY')
    expect(content.tagName).toBe('SECTION')
  })

  it('opens by default when open is true', () => {
    const {getByText} = render(
      <Accordion open>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const content = getByText('Test content')
    expect(content).toBeVisible()
  })

  it('does not render the content when open is false', () => {
    const {queryByText} = render(
      <Accordion>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const content = queryByText('Test content')
    expect(content).not.toBeVisible()
  })

  it('renders the heading as h4 by default', () => {
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const heading = getByRole('heading', {level: 4})
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test heading')
  })

  it('renders the heading as the level specified by the as prop', () => {
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading as="h2">Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const heading = getByRole('heading', {level: 2})
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test heading')
  })

  it('renders chevron icons when variant is emphasis', () => {
    const {container} = render(
      <Accordion variant="emphasis">
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const chevronDown = container.querySelector('.Accordion__summary--collapsed svg')
    const chevronUp = container.querySelector('.Accordion__summary--expanded svg')

    expect(chevronDown).toBeInTheDocument()
    expect(chevronUp).toBeInTheDocument()
  })

  it('renders chevron icons when variant is default', () => {
    const {container} = render(
      <Accordion variant="default">
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const chevronDown = container.querySelector('.Accordion__summary--collapsed svg')
    const chevronUp = container.querySelector('.Accordion__summary--expanded svg')

    expect(chevronDown).toBeInTheDocument()
    expect(chevronUp).toBeInTheDocument()
  })

  it('forwards additional props to details element', () => {
    const {getByRole} = render(
      <Accordion data-testid="accordion-test">
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    expect(details).toHaveAttribute('data-testid', 'accordion-test')
  })

  it('forwards additional props to summary element', () => {
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading data-testid="heading-test">Test heading</Accordion.Heading>
        <Accordion.Content>Test content</Accordion.Content>
      </Accordion>,
    )

    const summary = getByRole('heading', {name: 'Test heading'}).parentElement as HTMLElement
    expect(summary).toHaveAttribute('data-testid', 'heading-test')
  })

  it('forwards additional props to section element', () => {
    const {getByText} = render(
      <Accordion>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content data-testid="content-test">Test content</Accordion.Content>
      </Accordion>,
    )

    const section = getByText('Test content')
    expect(section).toHaveAttribute('data-testid', 'content-test')
  })

  it('restores focus to summary after closing with Escape key', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(
      <Accordion open>
        <Accordion.Heading>Test heading</Accordion.Heading>
        <Accordion.Content>
          <button>Focusable content</button>
        </Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const summary = getByRole('heading', {name: 'Test heading'}).parentElement as HTMLElement
    const button = getByRole('button', {name: 'Focusable content'})

    await user.tab()
    expect(button).toHaveFocus()

    fireEvent.keyDown(details, {key: 'Escape'})

    expect(details).not.toHaveAttribute('open')
    expect(summary).toHaveFocus()
  })

  it('throws an error when trying to use an Accordion.Heading outside of an Accordion', () => {
    // Silence console.error to prevent expected error from being printed to console
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => null)

    expect(() => {
      render(<Accordion.Heading>Test heading</Accordion.Heading>)
    }).toThrow('Unable to find Accordion provider. Did you forget to wrap your component in an Accordion?')

    consoleSpy.mockRestore()
  })
})
