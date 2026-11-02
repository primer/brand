import React, {forwardRef, useEffect, useRef, useState, type ButtonHTMLAttributes, type MouseEventHandler} from 'react'
import {clsx} from 'clsx'
import {useId} from '../../hooks/useId'
import {Spinner} from '../../Spinner/Spinner'
import {Text} from '../../Text/Text'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/toggle-switch/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/toggle-switch/colors-with-modes.css'
import styles from './ToggleSwitch.module.css'

type ToggleSwitchSize = 'small' | 'medium'
type ToggleSwitchSpinnerPosition = 'start' | 'end'
type ToggleSwitchStatusLabelPosition = 'start' | 'end'

type ToggleSwitchButtonPropKeysToOmit =
  | 'aria-busy'
  | 'aria-checked'
  | 'aria-disabled'
  | 'children'
  | 'onChange'
  | 'role'
  | 'type'

export type ToggleSwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, ToggleSwitchButtonPropKeysToOmit> & {
  'data-testid'?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  loading?: boolean
  size?: ToggleSwitchSize
  loadingLabel?: string
  loadingLabelDelay?: number
  spinnerPosition?: ToggleSwitchSpinnerPosition
  hasStatusLabel?: boolean
  statusLabelPosition?: ToggleSwitchStatusLabelPosition
  statusLabelOn?: string
  statusLabelOff?: string
}

export type ToggleSwitchInternalProps = ToggleSwitchProps & {
  toggleSwitchSpinnerInLabel?: boolean
}

const testIds = {
  root: 'ToggleSwitch',
  spinner: 'ToggleSwitch-spinner',
  loadingAnnouncement: 'ToggleSwitch-loading-announcement',
  statusAnnouncement: 'ToggleSwitch-status-announcement',
  statusLabel: 'ToggleSwitch-status-label',
}

type ToggleSwitchComponent = React.ForwardRefExoticComponent<ToggleSwitchProps & React.RefAttributes<HTMLButtonElement>>

const Root: ToggleSwitchComponent = forwardRef<HTMLButtonElement, ToggleSwitchInternalProps>(function ToggleSwitch(
  {
    checked,
    defaultChecked = false,
    onChange,
    onClick,
    disabled = false,
    loading = false,
    size = 'medium',
    loadingLabel = 'Loading',
    loadingLabelDelay = 2000,
    spinnerPosition = 'end',
    hasStatusLabel = false,
    statusLabelPosition = 'start',
    statusLabelOn = 'On',
    statusLabelOff = 'Off',
    toggleSwitchSpinnerInLabel = false,
    id,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    'data-testid': testId,
    ...rest
  },
  ref,
) {
  const uniqueId = useId(id)
  const statusDescriptionId = useId()
  const loadingId = `${uniqueId}-loading`
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const [announceLoading, setAnnounceLoading] = useState(false)
  const [statusAnnouncement, setStatusAnnouncement] = useState('')
  const isChecked = checked ?? internalChecked
  const activeStatusLabel = isChecked ? statusLabelOn : statusLabelOff
  const defaultStatusLabel = isChecked ? 'On' : 'Off'
  const hasCustomStatusLabels = statusLabelOn !== 'On' || statusLabelOff !== 'Off'
  const hasStatusDescription = hasStatusLabel && activeStatusLabel !== defaultStatusLabel
  const previousChecked = useRef(isChecked)

  useEffect(() => {
    const stateChanged = previousChecked.current !== isChecked
    previousChecked.current = isChecked

    setStatusAnnouncement(
      stateChanged && hasStatusDescription && activeStatusLabel !== defaultStatusLabel ? activeStatusLabel : '',
    )
  }, [activeStatusLabel, defaultStatusLabel, hasStatusDescription, isChecked])

  useEffect(() => {
    setAnnounceLoading(false)
    if (!loading) return

    const timeout = setTimeout(() => setAnnounceLoading(true), Math.max(0, loadingLabelDelay))
    return () => clearTimeout(timeout)
  }, [loading, loadingLabelDelay])

  const describedBy =
    [
      hasStatusDescription && statusDescriptionId,
      ariaDescribedBy,
      loading && announceLoading && loadingLabel && loadingId,
    ]
      .filter(Boolean)
      .join(' ') || undefined

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    onClick?.(event)
    if (event.defaultPrevented) return

    const nextChecked = !isChecked
    if (checked === undefined) setInternalChecked(nextChecked)
    onChange?.(nextChecked)
  }

  const spinnerElement =
    !toggleSwitchSpinnerInLabel && loading ? (
      <span className={styles['ToggleSwitch-spinnerSlot']} aria-hidden="true">
        <Spinner
          size="small"
          accessibleLabel={null}
          className={styles['ToggleSwitch-spinner']}
          data-testid={testIds.spinner}
        />
      </span>
    ) : null

  // Both labels share one grid cell so the wider label reserves space and state changes do not shift layout.
  const statusLabelElement = hasStatusLabel ? (
    <span
      className={clsx(styles['ToggleSwitch-statusLabel'], styles[`ToggleSwitch-statusLabel--${statusLabelPosition}`])}
      aria-hidden="true"
      data-testid={testIds.statusLabel}
    >
      <Text
        as="span"
        size="100"
        variant="muted"
        className={clsx(
          styles['ToggleSwitch-statusLabelText'],
          !isChecked && styles['ToggleSwitch-statusLabelText--hidden'],
        )}
      >
        {statusLabelOn}
      </Text>
      <Text
        as="span"
        size="100"
        variant="muted"
        className={clsx(
          styles['ToggleSwitch-statusLabelText'],
          isChecked && styles['ToggleSwitch-statusLabelText--hidden'],
        )}
      >
        {statusLabelOff}
      </Text>
    </span>
  ) : null

  return (
    <div
      className={clsx(
        styles.ToggleSwitch,
        styles[`ToggleSwitch--${size}`],
        hasStatusLabel && styles['ToggleSwitch--withStatusLabel'],
        className,
      )}
      data-testid={testId || testIds.root}
    >
      {spinnerPosition === 'start' && spinnerElement}
      <button
        {...rest}
        id={uniqueId}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled || undefined}
        aria-busy={loading || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={describedBy}
        aria-invalid={ariaInvalid}
        className={clsx(styles['ToggleSwitch-button'], disabled && styles['ToggleSwitch-button--unavailable'])}
        onClick={handleClick}
      >
        {statusLabelPosition === 'start' && statusLabelElement}
        <span className={styles['ToggleSwitch-track']} aria-hidden="true">
          <span
            className={clsx(
              styles['ToggleSwitch-thumb'],
              isChecked && styles['ToggleSwitch-thumb--checked'],
              disabled && styles['ToggleSwitch-thumb--disabled'],
            )}
          />
        </span>
        {statusLabelPosition === 'end' && statusLabelElement}
      </button>
      {spinnerPosition === 'end' && spinnerElement}
      {hasStatusDescription ? (
        <span id={statusDescriptionId} className="visually-hidden">
          {activeStatusLabel}
        </span>
      ) : null}
      {hasStatusLabel && hasCustomStatusLabels ? (
        <span
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="visually-hidden"
          data-testid={testIds.statusAnnouncement}
        >
          {statusAnnouncement}
        </span>
      ) : null}
      <span
        id={loadingId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="visually-hidden"
        data-testid={testIds.loadingAnnouncement}
      >
        {loading && announceLoading ? loadingLabel : null}
      </span>
    </div>
  )
})

/**
 * Use ToggleSwitch for settings that take effect immediately.
 * @see https://primer.style/brand/forms/ToggleSwitch
 */
export const ToggleSwitch = Object.assign(Root, {testIds})
