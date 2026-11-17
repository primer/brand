import React, {createRef} from 'react'
import {flushSync} from 'react-dom'
import {act, fireEvent, render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'
import {ToggleSwitch} from './ToggleSwitch'
import {FormControl} from '../FormControl'

expect.extend(toHaveNoViolations)

describe('ToggleSwitch', () => {
  afterEach(() => jest.useRealTimers())

  it('renders an unchecked named switch without visible state text by default', () => {
    render(<ToggleSwitch aria-label="Enable notifications" />)
    const control = screen.getByRole('switch', {name: 'Enable notifications'})
    expect(control).toHaveAttribute('aria-checked', 'false')
    expect(control).not.toHaveAttribute('aria-pressed')
    expect(control).toHaveAttribute('type', 'button')
    expect(screen.queryByTestId(ToggleSwitch.testIds.statusLabel)).not.toBeInTheDocument()
    expect(screen.queryByText(/^(On|Off)$/)).not.toBeInTheDocument()
  })

  it('shows opted-in status text and updates it with the current state', async () => {
    const user = userEvent.setup()
    render(<ToggleSwitch aria-label="Enable notifications" hasStatusLabel />)
    const control = screen.getByRole('switch', {name: 'Enable notifications'})

    expect(screen.getByTestId(ToggleSwitch.testIds.statusLabel)).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Off')).toHaveClass('Text--100', 'Text--muted')
    expect(screen.getByText('Off')).not.toHaveClass('ToggleSwitch-statusLabelText--hidden')
    expect(screen.getByText('On')).toHaveClass('ToggleSwitch-statusLabelText--hidden')

    await user.click(screen.getByText('Off'))

    expect(control).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByText('On')).not.toHaveClass('ToggleSwitch-statusLabelText--hidden')
    expect(screen.getByText('Off')).toHaveClass('ToggleSwitch-statusLabelText--hidden')
  })

  it('accepts custom status text without changing the accessible name', () => {
    render(
      <ToggleSwitch
        aria-label="Beta features"
        defaultChecked
        hasStatusLabel
        labels={{on: 'Enabled', off: 'Disabled'}}
      />,
    )
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
        hasStatusLabel
        labels={{on: 'Public', off: 'Private'}}
      />,
    )
    const control = screen.getByRole('switch', {name: 'Repository visibility'})
    const [statusDescriptionId] = control.getAttribute('aria-describedby')!.split(' ')
    expect(statusDescriptionId).not.toBe('visibility-status')
    expect(control).toHaveAttribute('aria-describedby', `${statusDescriptionId} hint`)
    expect(control).toHaveAccessibleDescription('Private')
    expect(screen.getByTestId(ToggleSwitch.testIds.statusAnnouncement)).toBeEmptyDOMElement()

    await user.click(control)

    expect(control).toHaveAccessibleDescription('Public')
    expect(screen.getByTestId(ToggleSwitch.testIds.statusAnnouncement)).toHaveTextContent('Public')
  })

  it('announces immediate controlled changes from pointer and keyboard activation', async () => {
    const user = userEvent.setup()
    function ControlledSwitch() {
      const [checked, setChecked] = React.useState(false)
      return (
        <ToggleSwitch
          aria-label="Enable beta features"
          checked={checked}
          onChange={setChecked}
          hasStatusLabel
          labels={{on: 'Enabled', off: 'Disabled'}}
        />
      )
    }

    render(
      <React.StrictMode>
        <ControlledSwitch />
      </React.StrictMode>,
    )
    const control = screen.getByRole('switch')
    const announcement = screen.getByTestId(ToggleSwitch.testIds.statusAnnouncement)

    await user.click(control)
    expect(control).toHaveAccessibleDescription('Enabled')
    expect(announcement).toHaveTextContent('Enabled')

    await user.keyboard(' ')
    expect(control).toHaveAccessibleDescription('Disabled')
    expect(announcement).toHaveTextContent('Disabled')
  })

  it('announces a controlled change flushed during activation', async () => {
    const user = userEvent.setup()
    function ControlledSwitch() {
      const [checked, setChecked] = React.useState(false)
      return (
        <ToggleSwitch
          aria-label="Enable beta features"
          checked={checked}
          onChange={nextChecked => {
            flushSync(() => setChecked(nextChecked))
          }}
          hasStatusLabel
          labels={{on: 'Enabled', off: 'Disabled'}}
        />
      )
    }

    render(<ControlledSwitch />)
    await user.click(screen.getByRole('switch'))
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('Enabled')
    expect(screen.getByTestId(ToggleSwitch.testIds.statusAnnouncement)).toHaveTextContent('Enabled')
  })

  it('updates the description without announcing external controlled changes', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    const {rerender} = render(
      <ToggleSwitch
        aria-label="Enable beta features"
        checked={false}
        onChange={onChange}
        hasStatusLabel
        labels={{on: 'Enabled', off: 'Disabled'}}
      />,
    )
    const control = screen.getByRole('switch')
    const announcement = screen.getByTestId(ToggleSwitch.testIds.statusAnnouncement)

    await user.click(control)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(announcement).toBeEmptyDOMElement()

    rerender(
      <ToggleSwitch
        aria-label="Enable beta features"
        checked
        onChange={onChange}
        hasStatusLabel
        labels={{on: 'Enabled', off: 'Disabled'}}
      />,
    )
    expect(control).toHaveAccessibleDescription('Enabled')
    expect(announcement).toBeEmptyDOMElement()
  })

  it('does not announce a delayed controlled change while the switch remains focused', () => {
    jest.useFakeTimers()

    function DelayedSwitch() {
      const [checked, setChecked] = React.useState(false)
      return (
        <ToggleSwitch
          aria-label="Enable beta features"
          checked={checked}
          onChange={nextChecked => {
            setTimeout(() => setChecked(nextChecked), 100)
          }}
          hasStatusLabel
          labels={{on: 'Enabled', off: 'Disabled'}}
        />
      )
    }

    render(<DelayedSwitch />)
    const control = screen.getByRole('switch')
    const announcement = screen.getByTestId(ToggleSwitch.testIds.statusAnnouncement)
    control.focus()
    fireEvent.click(control)
    expect(announcement).toBeEmptyDOMElement()

    act(() => jest.advanceTimersByTime(100))
    expect(control).toHaveFocus()
    expect(control).toHaveAccessibleDescription('Enabled')
    expect(announcement).toBeEmptyDOMElement()
  })

  it('does not announce a controlled change deferred to a microtask', async () => {
    const user = userEvent.setup()

    function DeferredSwitch() {
      const [checked, setChecked] = React.useState(false)
      return (
        <ToggleSwitch
          aria-label="Enable beta features"
          checked={checked}
          onChange={async nextChecked => {
            await Promise.resolve()
            setChecked(nextChecked)
          }}
          hasStatusLabel
          labels={{on: 'Enabled', off: 'Disabled'}}
        />
      )
    }

    render(<DeferredSwitch />)
    const control = screen.getByRole('switch')
    const announcement = screen.getByTestId(ToggleSwitch.testIds.statusAnnouncement)

    await user.click(control)
    expect(control).toHaveAccessibleDescription('Enabled')
    expect(announcement).toBeEmptyDOMElement()
  })

  it('clears an earlier announcement after an external state change', async () => {
    const user = userEvent.setup()
    let updateChecked: React.Dispatch<React.SetStateAction<boolean>> = () => {}

    function ControlledSwitch() {
      const [checked, setChecked] = React.useState(false)
      updateChecked = setChecked
      return (
        <ToggleSwitch
          aria-label="Enable beta features"
          checked={checked}
          onChange={setChecked}
          hasStatusLabel
          labels={{on: 'Enabled', off: 'Disabled'}}
        />
      )
    }

    render(<ControlledSwitch />)
    const control = screen.getByRole('switch')
    const announcement = screen.getByTestId(ToggleSwitch.testIds.statusAnnouncement)

    await user.click(control)
    expect(announcement).toHaveTextContent('Enabled')

    act(() => updateChecked(false))
    expect(control).toHaveAccessibleDescription('Disabled')
    expect(announcement).toBeEmptyDOMElement()
  })

  it('does not collide with caller-provided label IDs', () => {
    render(
      <>
        <span id="visibility-status">Make repository public</span>
        <ToggleSwitch
          id="visibility"
          aria-labelledby="visibility-status"
          hasStatusLabel
          labels={{on: 'Public', off: 'Private'}}
        />
      </>,
    )

    const control = screen.getByRole('switch', {name: 'Make repository public'})
    expect(document.querySelectorAll('[id="visibility-status"]')).toHaveLength(1)
    expect(control).toHaveAccessibleDescription('Private')
  })

  it('announces only the custom wording for the state that uses it', async () => {
    const user = userEvent.setup()
    render(<ToggleSwitch aria-label="Make repository public" defaultChecked hasStatusLabel labels={{off: 'Private'}} />)
    const control = screen.getByRole('switch')
    const announcement = screen.getByTestId(ToggleSwitch.testIds.statusAnnouncement)

    expect(control).not.toHaveAttribute('aria-describedby')
    expect(announcement).toBeEmptyDOMElement()

    await user.click(control)

    expect(control).toHaveAccessibleDescription('Private')
    expect(announcement).toHaveTextContent('Private')

    await user.click(control)

    expect(control).not.toHaveAttribute('aria-describedby')
    expect(announcement).toBeEmptyDOMElement()
  })

  it('does not describe the switch with the default status text', () => {
    render(<ToggleSwitch aria-label="Enable notifications" hasStatusLabel />)
    expect(screen.getByRole('switch')).not.toHaveAttribute('aria-describedby')
  })

  it('does not describe the switch with custom status text when the status label is hidden', () => {
    render(<ToggleSwitch aria-label="Repository visibility" labels={{on: 'Public', off: 'Private'}} />)
    expect(screen.getByRole('switch')).not.toHaveAttribute('aria-describedby')
  })

  it('adds and removes the custom description when the status label is toggled', () => {
    const {rerender} = render(
      <>
        <span id="hint">Visibility setting</span>
        <ToggleSwitch
          id="visibility"
          aria-label="Repository visibility"
          aria-describedby="hint"
          labels={{off: 'Private'}}
        />
      </>,
    )
    const control = screen.getByRole('switch')
    expect(control).toHaveAttribute('aria-describedby', 'hint')
    expect(control).toHaveAccessibleDescription('Visibility setting')

    rerender(
      <>
        <span id="hint">Visibility setting</span>
        <ToggleSwitch
          id="visibility"
          aria-label="Repository visibility"
          aria-describedby="hint"
          hasStatusLabel
          labels={{off: 'Private'}}
        />
      </>,
    )
    const [statusDescriptionId] = control.getAttribute('aria-describedby')!.split(' ')
    expect(statusDescriptionId).not.toBe('visibility-status')
    expect(control).toHaveAttribute('aria-describedby', `${statusDescriptionId} hint`)
    expect(control).toHaveAccessibleDescription('Private Visibility setting')

    rerender(
      <>
        <span id="hint">Visibility setting</span>
        <ToggleSwitch
          id="visibility"
          aria-label="Repository visibility"
          aria-describedby="hint"
          labels={{off: 'Private'}}
        />
      </>,
    )
    expect(control).toHaveAttribute('aria-describedby', 'hint')
    expect(control).toHaveAccessibleDescription('Visibility setting')
    expect(document.getElementById(statusDescriptionId)).not.toBeInTheDocument()
  })

  it.each(['start', 'end'] as const)('places the status text at the %s of the track', position => {
    render(<ToggleSwitch aria-label="Enable notifications" hasStatusLabel statusLabelPosition={position} />)
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

  it('uses muted status text for disabled switches', () => {
    render(<ToggleSwitch aria-label="Enable notifications" disabled hasStatusLabel />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByText('Off')).toHaveClass('Text--100', 'Text--muted')
  })

  it('keeps the FormControl label as the accessible name when status text is visible', async () => {
    const {container} = render(
      <FormControl>
        <FormControl.Label>Notifications</FormControl.Label>
        <ToggleSwitch defaultChecked hasStatusLabel />
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

  it.each(['start', 'end'] as const)('supports a spinner at the %s of standalone switches', position => {
    render(<ToggleSwitch aria-label="Notifications" loading spinnerPosition={position} hasStatusLabel />)
    const indicator = screen.getByTestId(ToggleSwitch.testIds.spinner)
    const spinnerSlot = indicator.parentElement?.parentElement
    const control = screen.getByRole('switch')
    const statusLabel = screen.getByTestId(ToggleSwitch.testIds.statusLabel)
    expect(position === 'start' ? spinnerSlot?.nextElementSibling : spinnerSlot?.previousElementSibling).toBe(control)
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
