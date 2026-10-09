import React from 'react'
import {clsx} from 'clsx'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/spinner/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/spinner/colors-with-modes.css'
import styles from './Spinner.module.css'

export type SpinnerProps = {
  size?: 'small' | 'medium' | 'large'
  accessibleLabel?: string | null
  className?: string
  'data-testid'?: string
}

export function Spinner({
  size = 'medium',
  accessibleLabel = 'Loading',
  className,
  'data-testid': testId = 'Spinner',
}: SpinnerProps) {
  return (
    <span className={styles.Spinner__box} data-component="Spinner">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className={clsx(styles.Spinner, styles[`Spinner--${size}`], className)}
        data-testid={testId}
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M15 8a7.002 7.002 0 00-7-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {accessibleLabel !== null ? <span className="visually-hidden">{accessibleLabel}</span> : null}
    </span>
  )
}
