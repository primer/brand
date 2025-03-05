import React, {forwardRef, type HTMLAttributes, type ReactElement} from 'react'
import clsx from 'clsx'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/river/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/river/river.css'

import styles from './RiverAccordion.module.css'
import {RiverProps} from '../River'

export type RiverAccordionProps = {
  children: ReactElement<RiverProps>[]
} & HTMLAttributes<HTMLDivElement>

export const RiverAccordion = forwardRef<HTMLDivElement, RiverAccordionProps>(({children}, ref) => {
  return (
    <div ref={ref} className={clsx(styles['RiverAccordion'])}>
      {children}
    </div>
  )
})
