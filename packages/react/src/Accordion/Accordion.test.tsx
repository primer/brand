import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Accordion, AccordionToggleColors} from '../'

expect.extend(toHaveNoViolations)

describe('Accordion', () => {
  afterEach(cleanup)

  it('has no a11y violations', async () => {
    const {container} = render(
      <Accordion>
        <Accordion.Heading>Heading 1</Accordion.Heading>
        <Accordion.Content>
          <p>Description 1</p>
          <p>Description 2</p>
        </Accordion.Content>
      </Accordion>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('has no a11y violations with emphasis variant', async () => {
    const {container} = render(
      <Accordion variant="emphasis">
        <Accordion.Heading>Heading 1</Accordion.Heading>
        <Accordion.Content>
          <p>Description 1</p>
        </Accordion.Content>
      </Accordion>,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders correctly with default props', () => {
    const {getByRole, getByText} = render(
      <Accordion>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    expect(details).toBeInTheDocument()
    expect(details).toHaveClass('Accordion')
    expect(details).toHaveClass('Accordion--default')
    expect(details).not.toHaveAttribute('open')
    expect(getByRole('heading', {name: 'Test Heading'})).toBeInTheDocument()
    expect(getByText('Test Content')).toBeInTheDocument()
    expect(getByText('Test Content')).not.toBeVisible()
  })

  it.each(['default', 'emphasis'] as const)('renders %s variant correctly', variant => {
    const {container, getByRole} = render(
      <Accordion variant={variant}>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const summary = container.querySelector('summary')

    expect(details).toHaveClass(`Accordion--${variant}`)
    expect(summary).toHaveClass(`Accordion__summary--${variant}`)
  })

  it('applies custom className', () => {
    const {getByRole} = render(
      <Accordion className="custom-accordion">
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    expect(details).toHaveClass('custom-accordion')
  })

  it('respects open prop', () => {
    const {getByRole, getByText} = render(
      <Accordion open>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    expect(details).toHaveAttribute('open')
    expect(getByText('Test Content')).toBeVisible()
  })

  it('spreads additional props', () => {
    const {getByRole} = render(
      <Accordion data-testid="accordion-test">
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    expect(details).toHaveAttribute('data-testid', 'accordion-test')
  })

  it('calls onToggle when accordion is toggled', async () => {
    const user = userEvent.setup()
    const onToggleMock = jest.fn()

    const {getByRole} = render(
      <Accordion onToggle={onToggleMock}>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const heading = getByRole('heading', {name: 'Test Heading'})
    await user.click(heading)

    expect(onToggleMock).toHaveBeenCalledTimes(1)
  })

  it('calls handleOpen with correct state when toggled', async () => {
    const user = userEvent.setup()
    const handleOpenMock = jest.fn()

    const {getByRole} = render(
      <Accordion handleOpen={handleOpenMock}>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const heading = getByRole('heading', {name: 'Test Heading'})
    await user.click(heading)

    expect(handleOpenMock).toHaveBeenCalledWith(true)

    await user.click(heading)
    expect(handleOpenMock).toHaveBeenCalledWith(false)
  })

  it('calls onKeyDown when keys are pressed', () => {
    const onKeyDownMock = jest.fn()

    const {getByRole} = render(
      <Accordion onKeyDown={onKeyDownMock} open>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')

    // We use fireEvent here as userEvent does not support keydown events directly
    fireEvent.keyDown(details, {key: 'Escape'})

    expect(onKeyDownMock).toHaveBeenCalledTimes(1)
  })

  it('closes accordion and focuses summary when Escape is pressed', () => {
    const {getByRole, getByText, container} = render(
      <Accordion open>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const summary = container.querySelector('summary')

    expect(details).toHaveAttribute('open')
    expect(getByText('Test Content')).toBeVisible()

    fireEvent.keyDown(details, {key: 'Escape'})

    expect(details).not.toHaveAttribute('open')
    expect(summary).toHaveFocus()
    expect(getByText('Test Content')).not.toBeVisible()
  })

  it('forwards functional ref correctly and accordion works as expected', async () => {
    const user = userEvent.setup()
    const mockRef = jest.fn()

    const {getByRole, getByText} = render(
      <Accordion ref={mockRef}>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading', {name: 'Test Heading'})

    expect(mockRef).toHaveBeenCalledWith(details)

    expect(getByText('Test Content')).not.toBeVisible()

    await user.click(heading)
    expect(details).toHaveAttribute('open')
    expect(getByText('Test Content')).toBeVisible()

    fireEvent.keyDown(details, {key: 'Escape'})
    expect(details).not.toHaveAttribute('open')
    expect(getByText('Test Content')).not.toBeVisible()
  })

  it('forwards RefObject correctly and accordion works as expected', async () => {
    const user = userEvent.setup()
    const refObject = React.createRef<HTMLDetailsElement>()

    const {getByRole, getByText} = render(
      <Accordion ref={refObject}>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading', {name: 'Test Heading'})

    expect(refObject.current).toBe(details)

    expect(getByText('Test Content')).not.toBeVisible()

    await user.click(heading)
    expect(details).toHaveAttribute('open')
    expect(getByText('Test Content')).toBeVisible()

    fireEvent.keyDown(details, {key: 'Escape'})
    expect(details).not.toHaveAttribute('open')
    expect(getByText('Test Content')).not.toBeVisible()
  })

  it('remains functional when passing a null ref', async () => {
    const user = userEvent.setup()

    const {getByRole, getByText} = render(
      <Accordion ref={null}>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading', {name: 'Test Heading'})

    expect(details).not.toHaveAttribute('open')

    expect(getByText('Test Content')).not.toBeVisible()

    await user.click(heading)
    expect(details).toHaveAttribute('open')
    expect(getByText('Test Content')).toBeVisible()

    fireEvent.keyDown(details, {key: 'Escape'})
    expect(details).not.toHaveAttribute('open')
    expect(getByText('Test Content')).not.toBeVisible()
  })

  it('renders with default heading level', () => {
    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const heading = getByRole('heading', {level: 4})
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Heading')
  })

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)('renders with %s heading level', headingLevel => {
    const expectedLevel = parseInt(headingLevel.charAt(1), 10)

    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading as={headingLevel}>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const heading = getByRole('heading', {level: expectedLevel})
    expect(heading).toBeInTheDocument()
  })

  it('renders chevron icons for emphasis variant', () => {
    const {container} = render(
      <Accordion variant="emphasis">
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const chevronDown = container.querySelector('.Accordion__summary--collapsed svg')
    const chevronUp = container.querySelector('.Accordion__summary--expanded svg')

    expect(chevronDown).toBeInTheDocument()
    expect(chevronUp).toBeInTheDocument()
  })

  it('does not render chevron icons for default variant', () => {
    // We don't render styles in tests so we can't check for the presence of the "+"
    const {container} = render(
      <Accordion variant="default">
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const chevronDown = container.querySelector('.Accordion__summary--collapsed svg')
    const chevronUp = container.querySelector('.Accordion__summary--expanded svg')

    expect(chevronDown).not.toBeInTheDocument()
    expect(chevronUp).not.toBeInTheDocument()
  })

  it.each(AccordionToggleColors)('applies toggle color %s correctly', toggleColor => {
    const {container} = render(
      <Accordion>
        <Accordion.Heading toggleColor={toggleColor}>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const summary = container.querySelector('summary')
    expect(summary).toHaveClass(`Accordion__summary--toggleColor-${toggleColor}`)
  })

  it('applies reversed toggles class when reversedToggles is true', () => {
    const {container} = render(
      <Accordion>
        <Accordion.Heading reversedToggles>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const summary = container.querySelector('summary')
    expect(summary).toHaveClass('Accordion__summary--reversed-toggles')
  })

  it('applies custom className to heading', () => {
    const {container} = render(
      <Accordion>
        <Accordion.Heading className="custom-heading">Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const summary = container.querySelector('summary')
    expect(summary).toHaveClass('custom-heading')
  })

  it('forwards functional ref correctly to AccordionHeading and accordion works as expected', async () => {
    const user = userEvent.setup()
    const mockRef = jest.fn()

    const {container, getByRole, getByText} = render(
      <Accordion>
        <Accordion.Heading ref={mockRef}>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading', {name: 'Test Heading'})
    const summary = container.querySelector('summary')

    expect(mockRef).toHaveBeenCalledWith(summary)

    expect(getByText('Test Content')).not.toBeVisible()

    await user.click(heading)
    expect(details).toHaveAttribute('open')
    expect(getByText('Test Content')).toBeVisible()

    fireEvent.keyDown(details, {key: 'Escape'})
    expect(details).not.toHaveAttribute('open')
    expect(getByText('Test Content')).not.toBeVisible()
  })

  it('forwards RefObject correctly to AccordionHeading and accordion works as expected', async () => {
    const user = userEvent.setup()
    const refObject = React.createRef<HTMLHeadingElement>()

    const {container, getByRole, getByText} = render(
      <Accordion>
        <Accordion.Heading ref={refObject}>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading', {name: 'Test Heading'})
    const summary = container.querySelector('summary')

    expect(refObject.current).toBe(summary)

    expect(getByText('Test Content')).not.toBeVisible()

    await user.click(heading)
    expect(details).toHaveAttribute('open')
    expect(getByText('Test Content')).toBeVisible()

    fireEvent.keyDown(details, {key: 'Escape'})
    expect(details).not.toHaveAttribute('open')
    expect(getByText('Test Content')).not.toBeVisible()
  })

  it('remains functional when passing a null ref to AccordionHeading', async () => {
    const user = userEvent.setup()

    const {getByRole, getByText} = render(
      <Accordion>
        <Accordion.Heading ref={null}>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading', {name: 'Test Heading'})

    expect(details).not.toHaveAttribute('open')

    expect(getByText('Test Content')).not.toBeVisible()

    await user.click(heading)
    expect(details).toHaveAttribute('open')
    expect(getByText('Test Content')).toBeVisible()

    fireEvent.keyDown(details, {key: 'Escape'})
    expect(details).not.toHaveAttribute('open')
    expect(getByText('Test Content')).not.toBeVisible()
  })

  it('renders content correctly', () => {
    const {getByText} = render(
      <Accordion>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const content = getByText('Test Content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('Accordion__content')
  })

  it('applies custom className to content', () => {
    const {getByText} = render(
      <Accordion>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content className="custom-content">Test Content</Accordion.Content>
      </Accordion>,
    )

    const content = getByText('Test Content')
    expect(content).toHaveClass('custom-content')
  })

  it('spreads additional props on content', () => {
    const {getByText} = render(
      <Accordion>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content data-testid="content-test">Test Content</Accordion.Content>
      </Accordion>,
    )

    const content = getByText('Test Content')
    expect(content).toHaveAttribute('data-testid', 'content-test')
  })

  it('throws error when AccordionHeading is used outside Accordion', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => null)

    expect(() => {
      render(<Accordion.Heading>Test Heading</Accordion.Heading>)
    }).toThrow('Unable to find Accordion provider. Did you forget to wrap your component in an Accordion?')

    consoleSpy.mockRestore()
  })

  it.each(['default', 'emphasis'] as const)('provides %s variant context correctly', variant => {
    const {container} = render(
      <Accordion variant={variant}>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const summary = container.querySelector('summary')
    expect(summary).toHaveClass(`Accordion__summary--${variant}`)
  })

  it('toggles open state when summary is clicked', async () => {
    const user = userEvent.setup()

    const {getByRole} = render(
      <Accordion>
        <Accordion.Heading>Test Heading</Accordion.Heading>
        <Accordion.Content>Test Content</Accordion.Content>
      </Accordion>,
    )

    const details = getByRole('group')
    const heading = getByRole('heading', {name: 'Test Heading'})

    expect(details).not.toHaveAttribute('open')

    await user.click(heading)
    expect(details).toHaveAttribute('open')

    await user.click(heading)
    expect(details).not.toHaveAttribute('open')
  })

  it('handles multiple accordions independently', async () => {
    const user = userEvent.setup()

    const {getAllByRole, getByRole} = render(
      <div>
        <Accordion data-testid="accordion-1">
          <Accordion.Heading>Heading 1</Accordion.Heading>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion>
        <Accordion data-testid="accordion-2">
          <Accordion.Heading>Heading 2</Accordion.Heading>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion>
      </div>,
    )

    const [details1, details2] = getAllByRole('group')
    const heading1 = getByRole('heading', {name: 'Heading 1'})
    const heading2 = getByRole('heading', {name: 'Heading 2'})

    expect(details1).not.toHaveAttribute('open')
    expect(details2).not.toHaveAttribute('open')

    await user.click(heading1)
    expect(details1).toHaveAttribute('open')
    expect(details2).not.toHaveAttribute('open')

    await user.click(heading2)
    expect(details1).toHaveAttribute('open')
    expect(details2).toHaveAttribute('open')
  })
})
