import React, {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../../component-helpers'
import type {HeroMediaPositions} from '../HeroContext'
import {useProvidedRefOrCreate} from '../../hooks/useRef'

import styles from '../Hero.module.css'

export type HeroVideoProps = {
  position?: HeroMediaPositions
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLDivElement>>

export const HeroVideo = forwardRef<HTMLDivElement, HeroVideoProps>(
  ({className, children, 'data-testid': testId, ...rest}: HeroVideoProps, ref) => {
    const containerRef = useProvidedRefOrCreate(ref as React.RefObject<HTMLDivElement>)

    return (
      <div
        className={clsx(styles['Hero-video'], className)}
        ref={containerRef}
        data-testid={testId || 'Hero-video'}
        {...rest}
      >
        {children}
      </div>
    )
  },
)
