import React, {createRef} from 'react'
import {act, cleanup, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {HeartIcon} from '@primer/octicons-react'

import {ButtonSizes, ButtonVariants, defaultButtonSize, defaultButtonVariant} from '../Button'
import {Tooltip} from '../Tooltip'
import {defaultIconButtonSize, defaultIconButtonVariant, IconButton, IconButtonSizes, IconButtonVariants} from '.'

expect.extend(toHaveNoViolations)

describe('IconButton', () => {
  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  it('renders a square Button with a decorative icon and no text slot', () => {
    const {getByRole, getByTestId} = render(<IconButton icon={HeartIcon} aria-label="Favorite" />)
    const button = getByRole('button', {name: 'Favorite'})
    const icon = button.querySelector('svg')

    expect(button).toHaveClass('Button--secondary', 'Button--size-medium', 'IconButton')
    expect(button).not.toHaveAttribute('type')
    expect(button).toHaveProperty('type', 'submit')
    expect(button).not.toContainHTML('Button__text')
    expect(icon).toHaveClass('IconButton__icon')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon).toHaveAttribute('focusable', 'false')
    expect(getByTestId('IconButton')).toBe(button)
  })

  it.each(ButtonVariants)('inherits the %s variant from Button', variant => {
    const {getByRole} = render(<IconButton icon={HeartIcon} aria-label="Favorite" variant={variant} />)
    expect(getByRole('button')).toHaveClass(`Button--${variant}`)
  })

  it('maps the danger variant to Button secondary structure', () => {
    const {getByRole} = render(<IconButton icon={HeartIcon} aria-label="Remove favorite" variant="danger" />)

    expect(ButtonVariants).not.toContain('danger')
    expect(getByRole('button')).toHaveClass('Button--secondary', 'IconButton--variant-danger')
  })

  it('maps the invisible variant to Button subtle styling', () => {
    const {getByRole} = render(<IconButton icon={HeartIcon} aria-label="Favorite" variant="invisible" />)

    expect(getByRole('button')).toHaveClass('Button--subtle', 'IconButton--variant-invisible')
  })

  it('publishes IconButton-owned sizes, variants, and defaults derived from Button', () => {
    expect(IconButtonSizes).toEqual(ButtonSizes)
    expect(IconButtonVariants).toEqual([...ButtonVariants, 'danger', 'invisible'])
    expect(defaultIconButtonSize).toBe(defaultButtonSize)
    expect(defaultIconButtonVariant).toBe(defaultButtonVariant)
  })

  it.each(IconButtonSizes)('inherits the %s size from Button', size => {
    const {getByRole} = render(<IconButton icon={HeartIcon} aria-label="Favorite" size={size} />)
    expect(getByRole('button')).toHaveClass(`Button--size-${size}`)
  })

  it('renders with a fully rounded shape', () => {
    const {getByRole} = render(<IconButton rounded icon={HeartIcon} aria-label="Send message" />)

    expect(getByRole('button')).toHaveClass('IconButton--rounded')
  })

  it('forwards refs, classes, styles, and native attributes', () => {
    const ref = createRef<HTMLButtonElement>()
    const {getByRole} = render(
      <IconButton
        ref={ref}
        icon={HeartIcon}
        aria-label="Favorite"
        className="custom-class"
        style={{opacity: 0.5}}
        name="favorite"
      />,
    )
    const button = getByRole('button')

    expect(ref.current).toBe(button)
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveStyle({opacity: '0.5'})
    expect(button).toHaveAttribute('name', 'favorite')
  })

  it('renders as an anchor', () => {
    const {getByRole} = render(
      <IconButton as="a" href="https://github.com" icon={HeartIcon} aria-label="Visit GitHub" />,
    )

    expect(getByRole('link', {name: 'Visit GitHub'})).toHaveAttribute('href', 'https://github.com')
  })

  it('does not add an automatic tooltip when disabled', () => {
    const {getByRole, queryByText} = render(<IconButton disabled icon={HeartIcon} aria-label="Favorite" />)

    expect(getByRole('button', {name: 'Favorite'})).toBeDisabled()
    expect(queryByText('Favorite')).not.toBeInTheDocument()
  })

  it('keeps inactive controls enabled and interactive', async () => {
    const handleClick = jest.fn()
    const {getByRole} = render(
      <IconButton inactive icon={HeartIcon} aria-label="Explain availability" onClick={handleClick} />,
    )
    const button = getByRole('button', {name: 'Explain availability'})

    await userEvent.click(button)

    expect(button).toHaveClass('Button--disabled', 'IconButton--inactive')
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).not.toBeDisabled()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('gives disabled precedence over inactive', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
    const {getByRole} = render(<IconButton disabled inactive icon={HeartIcon} aria-label="Favorite" />)
    const button = getByRole('button')

    expect(button).toBeDisabled()
    expect(button).toHaveClass('Button--disabled')
    expect(button).not.toHaveAttribute('aria-disabled')
    expect(consoleSpy).toHaveBeenCalledWith(
      'IconButton has conflicting props for `disabled`, `loading`, or `inactive` states.',
    )
  })

  it('keeps focus, blocks activation, and announces loading', async () => {
    const handleClick = jest.fn()
    const {getByRole, getByTestId, rerender} = render(
      <IconButton icon={HeartIcon} aria-label="Favorite" onClick={handleClick} />,
    )
    const button = getByRole('button', {name: 'Favorite'})
    act(() => button.focus())

    rerender(
      <IconButton
        loading
        loadingAnnouncement="Saving favorite"
        icon={HeartIcon}
        aria-label="Favorite"
        onClick={handleClick}
      />,
    )
    await userEvent.click(button)

    expect(button).toHaveFocus()
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).not.toBeDisabled()
    expect(handleClick).not.toHaveBeenCalled()
    expect(getByTestId('IconButton-loading-indicator')).toBeInTheDocument()
    expect(getByTestId('IconButton-loading-announcement')).toHaveTextContent('Saving favorite')
  })

  it('prevents native anchor navigation while loading', () => {
    const {getByRole} = render(
      <IconButton loading as="a" href="https://github.com" icon={HeartIcon} aria-label="Visit GitHub" />,
    )
    const clickEvent = new MouseEvent('click', {bubbles: true, cancelable: true})

    act(() => getByRole('link').dispatchEvent(clickEvent))

    expect(clickEvent.defaultPrevented).toBe(true)
  })

  it('uses description as supplementary tooltip content', () => {
    const {getByRole, getByText} = render(
      <IconButton icon={HeartIcon} aria-label="Notifications" description="You have unread notifications" />,
    )
    const button = getByRole('button', {name: 'Notifications'})
    const tooltip = getByText('You have unread notifications')

    expect(button).toHaveAttribute('aria-describedby', tooltip.id)
    expect(tooltip).toHaveAttribute('role', 'tooltip')
  })

  it('does not add a second tooltip when wrapped in Tooltip', () => {
    const {getAllByText, queryByText} = render(
      <Tooltip text="External favorite description">
        <IconButton icon={HeartIcon} aria-label="Favorite" />
      </Tooltip>,
    )

    expect(getAllByText('External favorite description')).toHaveLength(1)
    expect(queryByText('Favorite')).not.toBeInTheDocument()
  })

  it('keeps the automatic tooltip closed while an associated popup is open', async () => {
    const showPopover = jest.fn()
    const originalShowPopover = HTMLElement.prototype.showPopover
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {configurable: true, value: showPopover})
    const {getByRole} = render(
      <IconButton icon={HeartIcon} aria-label="Favorite" aria-haspopup="dialog" aria-expanded="true" />,
    )

    await userEvent.hover(getByRole('button'))

    expect(showPopover).not.toHaveBeenCalled()
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {
      configurable: true,
      value: originalShowPopover,
    })
  })

  it('warns when aria-label is empty', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
    render(<IconButton icon={HeartIcon} aria-label="" />)

    expect(consoleSpy).toHaveBeenCalledWith('IconButton requires a non-empty `aria-label`.')
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<IconButton icon={HeartIcon} aria-label="Favorite" />)
    const results = await act(async () => axe(container))

    expect(results).toHaveNoViolations()
  })
})
