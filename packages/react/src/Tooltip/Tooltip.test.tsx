import React from 'react'
import '@testing-library/jest-dom'
import {Tooltip, TooltipDirections, TooltipProps} from './Tooltip'
import {act, fireEvent, render as HTMLRender} from '@testing-library/react'
import {Button} from '..'
import {BookIcon} from '@primer/octicons-react'
import {getAnchoredPosition} from '@primer/behaviors'

jest.mock('@primer/behaviors', () => ({getAnchoredPosition: jest.fn()}))

const TooltipComponent = (props: Omit<TooltipProps, 'text'> & {text?: string}) => (
  <Tooltip text="Tooltip text" {...props}>
    <Button>Button Text</Button>
  </Tooltip>
)

describe('Tooltip', () => {
  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('renders `data-direction="s"` by default', () => {
    const {getByText} = HTMLRender(<TooltipComponent />)
    expect(getByText('Tooltip text')).toHaveAttribute('data-direction', 's')
  })
  it('renders `data-direction` attribute with the correct value when the `direction` prop is specified', () => {
    const {getByText} = HTMLRender(<TooltipComponent direction="n" />)
    expect(getByText('Tooltip text')).toHaveAttribute('data-direction', 'n')
  })
  it.each(TooltipDirections)('supports the %s direction', direction => {
    const {getByText} = HTMLRender(<TooltipComponent direction={direction} />)
    expect(getByText('Tooltip text')).toHaveAttribute('data-direction', direction)
  })
  it('positions the caret over the trigger after the tooltip shifts within the viewport', () => {
    jest.mocked(getAnchoredPosition).mockReturnValue({
      top: 71,
      left: 0,
      anchorAlign: 'center',
      anchorSide: 'outside-bottom',
    })
    const {getByRole, getByText} = HTMLRender(<TooltipComponent />)
    const trigger = getByRole('button')
    const tooltip = getByText('Tooltip text')
    jest.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({
      top: 20,
      left: 8,
      width: 43,
      height: 43,
      right: 51,
      bottom: 63,
      x: 8,
      y: 20,
      toJSON: () => ({}),
    })
    jest.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue({
      top: 71,
      left: 0,
      width: 240,
      height: 35,
      right: 240,
      bottom: 106,
      x: 0,
      y: 71,
      toJSON: () => ({}),
    })

    act(() => tooltip.dispatchEvent(new Event('toggle')))

    expect(tooltip.style.getPropertyValue('--p')).toBe('29.5px')
  })
  it('stays closed while its trigger owns an active popup', () => {
    const showPopover = jest.fn()
    const originalShowPopover = HTMLElement.prototype.showPopover
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {configurable: true, value: showPopover})
    const {getByRole} = HTMLRender(
      <Tooltip text="Tooltip text">
        <Button aria-haspopup="dialog" aria-expanded="true">
          Open dialog
        </Button>
      </Tooltip>,
    )

    fireEvent.mouseEnter(getByRole('button'))

    expect(showPopover).not.toHaveBeenCalled()
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {
      configurable: true,
      value: originalShowPopover,
    })
  })
  it.each([
    ['short', 50],
    ['medium', 400],
    ['long', 1200],
  ] as const)('opens after the %s pointer delay', (delay, delayMilliseconds) => {
    jest.useFakeTimers()
    const showPopover = jest.fn()
    const originalShowPopover = HTMLElement.prototype.showPopover
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {configurable: true, value: showPopover})
    const {getByRole} = HTMLRender(<TooltipComponent delay={delay} />)

    fireEvent.mouseEnter(getByRole('button'))
    act(() => jest.advanceTimersByTime(delayMilliseconds - 1))
    expect(showPopover).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))
    expect(showPopover).toHaveBeenCalledTimes(1)
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {
      configurable: true,
      value: originalShowPopover,
    })
  })
  it('cancels a pending pointer delay when the pointer leaves', () => {
    jest.useFakeTimers()
    const showPopover = jest.fn()
    const originalShowPopover = HTMLElement.prototype.showPopover
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {configurable: true, value: showPopover})
    const {getByRole} = HTMLRender(<TooltipComponent delay="long" />)
    const trigger = getByRole('button')

    fireEvent.mouseEnter(trigger)
    fireEvent.mouseLeave(trigger)
    act(() => jest.advanceTimersByTime(1200))

    expect(showPopover).not.toHaveBeenCalled()
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {
      configurable: true,
      value: originalShowPopover,
    })
  })
  it('opens immediately on focus regardless of pointer delay', () => {
    jest.useFakeTimers()
    const showPopover = jest.fn()
    const originalShowPopover = HTMLElement.prototype.showPopover
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {configurable: true, value: showPopover})
    const {getByRole} = HTMLRender(<TooltipComponent delay="long" />)

    fireEvent.focus(getByRole('button'))

    expect(showPopover).toHaveBeenCalledTimes(1)
    Object.defineProperty(HTMLElement.prototype, 'showPopover', {
      configurable: true,
      value: originalShowPopover,
    })
  })
  it('should label the trigger element by its tooltip when the tooltip type is label', () => {
    const {getByRole, getByText} = HTMLRender(<TooltipComponent type="label" />)
    const triggerEL = getByRole('button')
    const tooltipEl = getByText('Tooltip text')
    expect(triggerEL).toHaveAttribute('aria-labelledby', tooltipEl.id)
  })
  it('should render aria-hidden on the tooltip element when the tooltip is label type', () => {
    const {getByText} = HTMLRender(<TooltipComponent type="label" />)
    expect(getByText('Tooltip text')).toHaveAttribute('aria-hidden', 'true')
  })
  it('should describe the trigger element by its tooltip when the tooltip type is description (by default)', () => {
    const {getByRole, getByText} = HTMLRender(<TooltipComponent />)
    const triggerEL = getByRole('button')
    const tooltipEl = getByText('Tooltip text')
    expect(triggerEL).toHaveAttribute('aria-describedby', tooltipEl.id)
  })
  it('should render the tooltip element with role="tooltip" when the tooltip type is description (by default)', () => {
    const {getByText} = HTMLRender(<TooltipComponent />)
    expect(getByText('Tooltip text')).toHaveAttribute('role', 'tooltip')
  })
  it('should use the custom tooltip id (if present) to label the trigger element', () => {
    const {getByRole} = HTMLRender(
      <Tooltip id="custom-tooltip-id" text="Close feedback form" direction="n" type="label">
        <a aria-labelledby="custom-tooltip-id" href="https://github.com/primer/react/contributor-docs/CONTRIBUTING.md">
          <BookIcon />
        </a>
      </Tooltip>,
    )
    const triggerEL = getByRole('link')
    expect(triggerEL).toHaveAttribute('aria-labelledby', 'custom-tooltip-id')
  })
  it('should use the custom tooltip id (if present) to described the trigger element', () => {
    const {getByRole} = HTMLRender(
      <Tooltip text="This operation cannot be reverted" id="custom-tooltip-id">
        <Button>Delete</Button>
      </Tooltip>,
    )
    const triggerEL = getByRole('button')
    expect(triggerEL).toHaveAttribute('aria-describedby', 'custom-tooltip-id')
  })
})
