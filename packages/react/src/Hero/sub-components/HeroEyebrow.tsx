import React, {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../../component-helpers'

import styles from '../Hero.module.css'

export type HeroEyebrowProps = PropsWithChildren<BaseProps<HTMLDivElement>>

export const HeroEyebrow = forwardRef<HTMLDivElement, HeroEyebrowProps>(
  ({children, className, ...rest}: PropsWithChildren<HeroEyebrowProps>, ref) => {
    return (
      <div ref={ref} className={clsx(styles['Hero-eyebrow'], className)} {...rest}>
        {children}
      </div>
    )
  },
)
