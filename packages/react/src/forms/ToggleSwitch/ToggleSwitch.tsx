import React, {forwardRef, useEffect, useState, type ButtonHTMLAttributes, type MouseEventHandler} from 'react'
import {clsx} from 'clsx'
import {useId} from '../../hooks/useId'
import {Spinner} from '../../Spinner/Spinner'

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
    hasStatusLabel = true,
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
  const loadingId = `${uniqueId}-loading`
  const statusDescriptionId = `${uniqueId}-status`
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const [announceLoading, setAnnounceLoading] = useState(false)
  const isChecked = checked ?? internalChecked
  // aria-checked already announces On/Off, so only custom wording needs to be exposed as a description.
  const hasStatusDescription = hasStatusLabel && (statusLabelOn !== 'On' || statusLabelOff !== 'Off')

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
      className={clsx(
        styles['ToggleSwitch-statusLabel'],
        styles[`ToggleSwitch-statusLabel--${statusLabelPosition}`],
        disabled && styles['ToggleSwitch-statusLabel--disabled'],
      )}
      aria-hidden="true"
      data-testid={testIds.statusLabel}
    >
      <span
        className={clsx(
          styles['ToggleSwitch-statusLabelText'],
          !isChecked && styles['ToggleSwitch-statusLabelText--hidden'],
        )}
      >
        {statusLabelOn}
      </span>
      <span
        className={clsx(
          styles['ToggleSwitch-statusLabelText'],
          isChecked && styles['ToggleSwitch-statusLabelText--hidden'],
        )}
      >
        {statusLabelOff}
      </span>
    </span>
  ) : null

  return (
    <div
      className={clsx(styles.ToggleSwitch, styles[`ToggleSwitch--${size}`], className)}
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
          <svg
            className={clsx(styles['ToggleSwitch-icon'], isChecked && styles['ToggleSwitch-icon--checked'])}
            width={size === 'small' ? 10 : 14}
            height={size === 'small' ? 10 : 14}
            viewBox="0 0 16 16"
            fill="currentColor"
            focusable="false"
          >
            <path
              fillRule="evenodd"
              d={
                isChecked
                  ? 'M8 2a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-1.5 0V2.75A.75.75 0 0 1 8 2Z'
                  : 'M8 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z'
              }
            />
          </svg>
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
          {isChecked ? statusLabelOn : statusLabelOff}
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
