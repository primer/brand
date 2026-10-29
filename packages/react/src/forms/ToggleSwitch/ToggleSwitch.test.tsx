import React, {createRef} from 'react'
import {act, render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {ToggleSwitch} from './ToggleSwitch'
import {FormControl} from '../FormControl'

expect.extend(toHaveNoViolations)

describe('ToggleSwitch', () => {
  afterEach(() => jest.useRealTimers())

  it('renders an unchecked named switch without visible state text when opted out', () => {
    render(<ToggleSwitch aria-label="Enable notifications" hasStatusLabel={false} />)
    const control = screen.getByRole('switch', {name: 'Enable notifications'})
    expect(control).toHaveAttribute('aria-checked', 'false')
    expect(control).not.toHaveAttribute('aria-pressed')
    expect(control).toHaveAttribute('type', 'button')
    expect(screen.queryByText(/^(On|Off)$/)).not.toBeInTheDocument()
  })

  it('shows the status text by default and updates it with the current state', async () => {
    const user = userEvent.setup()
    render(<ToggleSwitch aria-label="Enable notifications" />)
    const control = screen.getByRole('switch', {name: 'Enable notifications'})

    expect(screen.getByText('Off')).not.toHaveClass('ToggleSwitch-statusLabelText--hidden')
    expect(screen.getByText('On')).toHaveClass('ToggleSwitch-statusLabelText--hidden')

    await user.click(screen.getByText('Off'))

    expect(control).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByText('On')).not.toHaveClass('ToggleSwitch-statusLabelText--hidden')
    expect(screen.getByText('Off')).toHaveClass('ToggleSwitch-statusLabelText--hidden')
  })

  it('accepts custom status text without changing the accessible name', () => {
    render(<ToggleSwitch aria-label="Beta features" defaultChecked statusLabelOn="Enabled" statusLabelOff="Disabled" />)
    expect(screen.getByRole('switch', {name: 'Beta features'})).toBeInTheDocument()
    const statusLabel = within(screen.getByTestId(ToggleSwitch.testIds.statusLabel))
    expect(statusLabel.getByText('Enabled')).not.toHaveClass('ToggleSwitch-statusLabelText--hidden')
    expect(statusLabel.getByText('Disabled')).toHaveClass('ToggleSwitch-statusLabelText--hidden')
  })

  it('describes the switch with custom status text that follows the current state', async () => {
    const user = userEvent.setup()
    render(
      <ToggleSwitch
        id="visibility"
        aria-label="Repository visibility"
        aria-describedby="hint"
        statusLabelOn="Public"
        statusLabelOff="Private"
      />,
    )
    const control = screen.getByRole('switch', {name: 'Repository visibility'})
    expect(control).toHaveAttribute('aria-describedby', 'visibility-status hint')
    expect(control).toHaveAccessibleDescription('Private')

    await user.click(control)

    expect(control).toHaveAccessibleDescription('Public')
  })

  it('does not describe the switch with the default status text', () => {
    render(<ToggleSwitch aria-label="Enable notifications" />)
    expect(screen.getByRole('switch')).not.toHaveAttribute('aria-describedby')
  })

  it('does not describe the switch with custom status text when the status label is hidden', () => {
    render(
      <ToggleSwitch
        aria-label="Repository visibility"
        hasStatusLabel={false}
        statusLabelOn="Public"
        statusLabelOff="Private"
      />,
    )
    expect(screen.getByRole('switch')).not.toHaveAttribute('aria-describedby')
  })

  it.each(['start', 'end'] as const)('places the status text at the %s of the track', position => {
    render(<ToggleSwitch aria-label="Enable notifications" statusLabelPosition={position} />)
    const control = screen.getByRole('switch')
    const statusLabel = screen.getByTestId(ToggleSwitch.testIds.statusLabel)
    expect(statusLabel).toHaveClass(`ToggleSwitch-statusLabel--${position}`)
    expect(position === 'start' ? control.firstElementChild : control.lastElementChild).toBe(statusLabel)
  })

  it('omits the status text when hasStatusLabel is false', () => {
    render(<ToggleSwitch aria-label="Enable notifications" hasStatusLabel={false} />)
    expect(screen.queryByTestId(ToggleSwitch.testIds.statusLabel)).not.toBeInTheDocument()
    expect(screen.queryByText(/^(On|Off)$/)).not.toBeInTheDocument()
  })

  it('styles the visible status text for disabled switches', () => {
    render(<ToggleSwitch aria-label="Enable notifications" disabled />)
    expect(screen.getByTestId(ToggleSwitch.testIds.statusLabel)).toHaveClass('ToggleSwitch-statusLabel--disabled')
  })

  it('keeps the FormControl label as the accessible name when status text is visible', async () => {
    const {container} = render(
      <FormControl>
        <FormControl.Label>Notifications</FormControl.Label>
        <ToggleSwitch defaultChecked />
      </FormControl>,
    )
    expect(screen.getByRole('switch', {name: 'Notifications'})).toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('updates uncontrolled state once per activation', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const onClick = jest.fn()
    render(<ToggleSwitch aria-label="Notifications" onChange={onChange} onClick={onClick} />)
    const control = screen.getByRole('switch')
    await user.click(control)
    expect(control).toHaveAttribute('aria-checked', 'true')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(true)
    expect(onClick).toHaveBeenCalledTimes(1)
    await user.click(control)
    expect(control).toHaveAttribute('aria-checked', 'false')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(false)
  })

  it.each(['small', 'medium'] as const)('shows decorative I/O symbols for both %s states', async size => {
    const user = userEvent.setup()
    render(<ToggleSwitch size={size} aria-label="Notifications" />)
    const control = screen.getByRole('switch', {name: 'Notifications'})
    const icon = control.querySelector('svg')
    const offPath = icon?.querySelector('path')?.getAttribute('d')

    expect(icon).toHaveAttribute('width', size === 'small' ? '10' : '14')
    expect(icon).toHaveAttribute('height', size === 'small' ? '10' : '14')
    expect(icon).toHaveAttribute('focusable', 'false')
    expect(icon?.parentElement).toHaveAttribute('aria-hidden', 'true')
    expect(icon).not.toHaveClass('ToggleSwitch-icon--checked')
    expect(offPath).toBe('M8 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z')

    await user.click(control)

    expect(icon).toHaveClass('ToggleSwitch-icon--checked')
    expect(icon?.querySelector('path')).toHaveAttribute(
      'd',
      'M8 2a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-1.5 0V2.75A.75.75 0 0 1 8 2Z',
    )
    expect(control).toHaveAccessibleName('Notifications')
    expect(control).toHaveAttribute('aria-checked', 'true')

    await user.click(control)

    expect(icon).not.toHaveClass('ToggleSwitch-icon--checked')
    expect(icon?.querySelector('path')).toHaveAttribute('d', offPath)
    expect(control).toHaveAttribute('aria-checked', 'false')
  })

  it.each([{disabled: true}, {loading: true}, {checked: true, disabled: true}, {checked: true, loading: true}])(
    'retains the state symbol with %j',
    props => {
      render(<ToggleSwitch {...props} aria-label="Notifications" />)
      const icon = screen.getByRole('switch').querySelector('svg')
      expect(icon).toBeInTheDocument()
      expect(icon?.parentElement).toHaveAttribute('aria-hidden', 'true')
      if (props.checked) {
        expect(icon).toHaveClass('ToggleSwitch-icon--checked')
      } else {
        expect(icon).not.toHaveClass('ToggleSwitch-icon--checked')
      }
    },
  )

  it('allows onClick to cancel activation', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const onClick = jest.fn(event => event.preventDefault())
    render(<ToggleSwitch aria-label="Notifications" onChange={onChange} onClick={onClick} />)

    const control = screen.getByRole('switch')
    await user.click(control)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onChange).not.toHaveBeenCalled()
    expect(control).toHaveAttribute('aria-checked', 'false')
  })

  it('uses defaultChecked only for initial uncontrolled state', () => {
    const {rerender} = render(<ToggleSwitch aria-label="Notifications" defaultChecked />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
    rerender(<ToggleSwitch aria-label="Notifications" defaultChecked={false} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('requests controlled changes without overriding the supplied value', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const {rerender} = render(
      <ToggleSwitch aria-label="Notifications" checked={false} defaultChecked onChange={onChange} />,
    )
    const control = screen.getByRole('switch')
    expect(control).toHaveAttribute('aria-checked', 'false')
    expect(onChange).not.toHaveBeenCalled()
    await user.click(control)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(true)
    expect(control).toHaveAttribute('aria-checked', 'false')
    rerender(<ToggleSwitch aria-label="Notifications" checked onChange={onChange} />)
    expect(control).toHaveAttribute('aria-checked', 'true')
    expect(onChange).toHaveBeenCalledTimes(1)
    await user.click(control)
    expect(onChange).toHaveBeenLastCalledWith(false)
    expect(control).toHaveAttribute('aria-checked', 'true')
  })

  it('does not notify onChange for external prop or callback changes', () => {
    const onChange = jest.fn()
    const replacementOnChange = jest.fn()
    const {rerender} = render(<ToggleSwitch aria-label="Notifications" checked={false} onChange={onChange} />)
    rerender(<ToggleSwitch aria-label="Notifications" checked disabled onChange={replacementOnChange} />)
    rerender(<ToggleSwitch aria-label="Notifications" checked loading onChange={replacementOnChange} />)
    expect(onChange).not.toHaveBeenCalled()
    expect(replacementOnChange).not.toHaveBeenCalled()
  })

  it('supports tab, Space, and Enter without duplicate changes or focus movement', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(
      <>
        <ToggleSwitch aria-label="Notifications" onChange={onChange} />
        <button>Next control</button>
      </>,
    )
    const control = screen.getByRole('switch')
    await user.tab()
    expect(control).toHaveFocus()
    await user.keyboard(' ')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(control).toHaveAttribute('aria-checked', 'true')
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(control).toHaveAttribute('aria-checked', 'false')
    expect(control).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', {name: 'Next control'})).toHaveFocus()
  })

  it('activates once when its associated setting label is clicked', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(
      <FormControl>
        <FormControl.Label>Enable notifications</FormControl.Label>
        <ToggleSwitch onChange={onChange} />
      </FormControl>,
    )
    await user.click(screen.getByText('Enable notifications'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(true)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it.each([{loading: false}, {loading: true}])(
    'blocks pointer, keyboard, and label activation when disabled with %j',
    async props => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const onClick = jest.fn()
      render(
        <FormControl>
          <FormControl.Label>Enable notifications</FormControl.Label>
          <ToggleSwitch {...props} disabled defaultChecked onChange={onChange} onClick={onClick} />
        </FormControl>,
      )
      const control = screen.getByRole('switch')
      await user.tab()
      expect(control).toHaveFocus()
      expect(control).toHaveAttribute('aria-disabled', 'true')
      await user.keyboard(' {Enter}')
      await user.click(control)
      await user.click(screen.getByText('Enable notifications'))
      expect(control).toHaveAttribute('aria-checked', 'true')
      expect(onChange).not.toHaveBeenCalled()
      expect(onClick).not.toHaveBeenCalled()
    },
  )

  it('allows pointer, keyboard, and label activation while loading', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const onClick = jest.fn()
    render(
      <FormControl>
        <FormControl.Label>Enable notifications</FormControl.Label>
        <ToggleSwitch loading onChange={onChange} onClick={onClick} />
      </FormControl>,
    )
    const control = screen.getByRole('switch')
    expect(control).toHaveAttribute('aria-busy', 'true')
    expect(control).not.toHaveAttribute('aria-disabled')
    expect(control).not.toHaveClass('ToggleSwitch-button--unavailable')

    await user.tab()
    await user.keyboard(' ')
    await user.keyboard('{Enter}')
    await user.click(control)
    await user.click(screen.getByText('Enable notifications'))

    expect(onChange.mock.calls).toEqual([[true], [false], [true], [false]])
    expect(onClick).toHaveBeenCalledTimes(4)
    expect(control).toHaveAttribute('aria-checked', 'false')
  })

  it.each(['small', 'medium'] as const)('shows the %s adjacent spinner only while loading', size => {
    const {rerender} = render(<ToggleSwitch size={size} aria-label="Notifications" checked loading />)
    const control = screen.getByRole('switch')
    const indicator = screen.getByTestId(ToggleSwitch.testIds.spinner)
    const slot = indicator.parentElement?.parentElement

    expect(control).not.toContainElement(indicator)
    expect(screen.getByTestId(ToggleSwitch.testIds.root)).toContainElement(indicator)
    expect(slot).toHaveAttribute('aria-hidden', 'true')
    expect(control.nextElementSibling).toBe(slot)
    expect(control).toHaveAttribute('aria-checked', 'true')

    rerender(<ToggleSwitch size={size} aria-label="Notifications" checked />)
    expect(screen.queryByTestId(ToggleSwitch.testIds.spinner)).not.toBeInTheDocument()
    expect(slot).not.toBeInTheDocument()
    expect(control.nextElementSibling).toHaveAttribute('role', 'status')
    expect(control).toHaveAttribute('aria-checked', 'true')
  })

  it('does not render an idle loading slot', () => {
    render(<ToggleSwitch aria-label="Notifications" />)
    const control = screen.getByRole('switch')
    expect(control.previousElementSibling).toBeNull()
    expect(control.nextElementSibling).toHaveAttribute('role', 'status')
  })

  it('supports a leading spinner for standalone switches', () => {
    render(<ToggleSwitch aria-label="Notifications" loading spinnerPosition="start" />)
    const indicator = screen.getByTestId(ToggleSwitch.testIds.spinner)
    const spinnerSlot = indicator.parentElement?.parentElement
    const control = screen.getByRole('switch')
    const statusLabel = screen.getByTestId(ToggleSwitch.testIds.statusLabel)
    expect(spinnerSlot?.nextElementSibling).toBe(control)
    expect(control.firstElementChild).toBe(statusLabel)
    expect(statusLabel.nextElementSibling).toHaveClass('ToggleSwitch-track')
  })

  it('keeps the same focused node when entering and leaving loading', () => {
    const ref = createRef<HTMLButtonElement>()
    const {rerender} = render(<ToggleSwitch ref={ref} aria-label="Notifications" />)
    const control = screen.getByRole('switch')
    control.focus()
    rerender(<ToggleSwitch ref={ref} aria-label="Notifications" loading />)
    expect(screen.getByRole('switch')).toBe(control)
    expect(ref.current).toBe(control)
    expect(control).toHaveFocus()
    rerender(<ToggleSwitch ref={ref} aria-label="Notifications" />)
    expect(control).toHaveFocus()
  })

  it('does not submit a form by default', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn(event => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <ToggleSwitch aria-label="Notifications" />
      </form>,
    )
    await user.click(screen.getByRole('switch'))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('forwards native control attributes to the switch and className to the wrapper', () => {
    const ref = createRef<HTMLButtonElement>()
    const handleKeyDown = jest.fn()
    render(
      <>
        <span id="setting-label">Enable notifications</span>
        <span id="setting-hint">Project updates</span>
        <ToggleSwitch
          ref={ref}
          id="setting"
          aria-labelledby="setting-label"
          aria-describedby="setting-hint"
          aria-controls="notification-settings"
          aria-invalid
          className="custom-switch"
          style={{opacity: 0.5}}
          tabIndex={-1}
          title="Notifications"
          onKeyDown={handleKeyDown}
          data-testid="custom-test-id"
        />
      </>,
    )
    const control = screen.getByRole('switch', {name: 'Enable notifications'})
    expect(ref.current).toBe(control)
    expect(control).toHaveAttribute('id', 'setting')
    expect(control).toHaveAttribute('aria-controls', 'notification-settings')
    expect(control).toHaveAttribute('aria-invalid', 'true')
    expect(control).toHaveAccessibleDescription('Project updates')
    expect(control).toHaveStyle({opacity: '0.5'})
    expect(control).toHaveAttribute('tabindex', '-1')
    expect(control).toHaveAttribute('title', 'Notifications')
    control.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true}))
    expect(handleKeyDown).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('custom-test-id')).toHaveClass('custom-switch')
    expect(screen.getByTestId('custom-test-id')).not.toHaveAttribute('id')
  })

  it.each([{checked: false}, {checked: true}, {disabled: true}, {loading: true}])(
    'has no automated accessibility violations for %j',
    async props => {
      const {container} = render(<ToggleSwitch aria-label="Enable notifications" {...props} />)
      expect(await axe(container)).toHaveNoViolations()
    },
  )

  it('announces persistent loading after the default delay and combines descriptions', () => {
    jest.useFakeTimers()

    const {rerender} = render(
      <ToggleSwitch
        id="notifications"
        aria-label="Notifications"
        aria-describedby="hint"
        loading
        loadingLabel="Saving notifications"
      />,
    )
    const control = screen.getByRole('switch')
    const announcement = screen.getByTestId(ToggleSwitch.testIds.loadingAnnouncement)
    expect(control).toHaveAttribute('aria-busy', 'true')
    expect(control).toHaveAttribute('aria-describedby', 'hint')
    expect(screen.getByTestId(ToggleSwitch.testIds.spinner)).toBeInTheDocument()
    expect(announcement).toBeEmptyDOMElement()
    act(() => jest.advanceTimersByTime(1999))
    expect(announcement).toBeEmptyDOMElement()
    act(() => jest.advanceTimersByTime(1))
    expect(announcement).toHaveTextContent('Saving notifications')
    expect(control).toHaveAttribute('aria-describedby', 'hint notifications-loading')
    rerender(<ToggleSwitch id="notifications" aria-label="Notifications" aria-describedby="hint" />)
    expect(announcement).toBeEmptyDOMElement()
    expect(control).toHaveAttribute('aria-describedby', 'hint')
    expect(control).not.toHaveAttribute('aria-busy')
  })

  it('does not announce requests that finish before the delay', () => {
    jest.useFakeTimers()

    const {rerender} = render(<ToggleSwitch aria-label="Notifications" loading />)
    act(() => jest.advanceTimersByTime(1000))
    rerender(<ToggleSwitch aria-label="Notifications" />)
    act(() => jest.advanceTimersByTime(3000))
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('starts a fresh delay for a new loading request', () => {
    jest.useFakeTimers()

    const {rerender} = render(<ToggleSwitch aria-label="Notifications" loading />)
    act(() => jest.advanceTimersByTime(2000))
    expect(screen.getByRole('status')).toHaveTextContent('Loading')
    rerender(<ToggleSwitch aria-label="Notifications" />)
    rerender(<ToggleSwitch aria-label="Notifications" loading loadingLabel="Saving again" />)
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    act(() => jest.advanceTimersByTime(2000))
    expect(screen.getByRole('status')).toHaveTextContent('Saving again')
  })

  it('restarts the announcement delay when loadingLabelDelay changes', () => {
    jest.useFakeTimers()

    const {rerender} = render(<ToggleSwitch aria-label="Notifications" loading loadingLabelDelay={1000} />)
    act(() => jest.advanceTimersByTime(1000))
    expect(screen.getByRole('status')).toHaveTextContent('Loading')
    rerender(<ToggleSwitch aria-label="Notifications" loading loadingLabelDelay={3000} />)
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    act(() => jest.advanceTimersByTime(2999))
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    act(() => jest.advanceTimersByTime(1))
    expect(screen.getByRole('status')).toHaveTextContent('Loading')
  })

  it('cleans up the pending announcement on unmount', () => {
    jest.useFakeTimers()

    const {unmount} = render(<ToggleSwitch aria-label="Notifications" loading />)
    expect(jest.getTimerCount()).toBe(1)
    unmount()
    expect(jest.getTimerCount()).toBe(0)
  })

  it('supports localized loading announcements and an immediate delay', () => {
    jest.useFakeTimers()

    render(
      <ToggleSwitch
        aria-label="Notifications"
        loading
        loadingLabel="Enregistrement des notifications"
        loadingLabelDelay={0}
      />,
    )
    act(() => jest.advanceTimersByTime(0))
    expect(screen.getByRole('status')).toHaveTextContent('Enregistrement des notifications')
  })
})
