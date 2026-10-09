import React, {forwardRef, useEffect, useState, type HTMLAttributes, type MouseEventHandler} from 'react'
import {clsx} from 'clsx'
import {useId} from '../../hooks/useId'
import {Spinner} from '../../Spinner/Spinner'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/toggle-switch/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/toggle-switch/colors-with-modes.css'
import styles from './ToggleSwitch.module.css'

type ToggleSwitchSize = 'small' | 'medium'
type ToggleSwitchSpinnerPosition = 'start' | 'end'

export type ToggleSwitchProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onClick' | 'children'> & {
  'data-testid'?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  loading?: boolean
  size?: ToggleSwitchSize
  loadingLabel?: string
  loadingLabelDelay?: number
  spinnerPosition?: ToggleSwitchSpinnerPosition
}

export type ToggleSwitchInternalProps = ToggleSwitchProps & {
  toggleSwitchSpinnerInLabel?: boolean
}

const testIds = {
  root: 'ToggleSwitch',
  spinner: 'ToggleSwitch-spinner',
  loadingAnnouncement: 'ToggleSwitch-loading-announcement',
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
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const [announceLoading, setAnnounceLoading] = useState(false)
  const isChecked = checked ?? internalChecked

  useEffect(() => {
    setAnnounceLoading(false)
    if (!loading) return

    const timeout = setTimeout(() => setAnnounceLoading(true), Math.max(0, loadingLabelDelay))
    return () => clearTimeout(timeout)
  }, [loading, loadingLabelDelay])

  const describedBy =
    [ariaDescribedBy, loading && announceLoading && loadingLabel && loadingId].filter(Boolean).join(' ') || undefined

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    const nextChecked = !isChecked
    if (checked === undefined) setInternalChecked(nextChecked)
    onChange?.(nextChecked)
    onClick?.(event)
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

  return (
    <div
      {...rest}
      className={clsx(styles.ToggleSwitch, styles[`ToggleSwitch--${size}`], className)}
      data-testid={testId || testIds.root}
    >
      {spinnerPosition === 'start' && spinnerElement}
      <button
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
        <span className={styles['ToggleSwitch-track']} aria-hidden="true">
          <span
            className={clsx(
              styles['ToggleSwitch-thumb'],
              isChecked && styles['ToggleSwitch-thumb--checked'],
              disabled && styles['ToggleSwitch-thumb--disabled'],
            )}
          />
        </span>
      </button>
      {spinnerPosition === 'end' && spinnerElement}
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
 * @see https://primer.style/brand/components/ToggleSwitch
 */
export const ToggleSwitch = Object.assign(Root, {testIds})
