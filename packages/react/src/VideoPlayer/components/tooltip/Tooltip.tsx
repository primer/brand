import React from 'react'
import clsx from 'clsx'
import {Text} from '../../../Text'

import styles from '../../VideoPlayer.module.css'

type TooltipProps = React.HTMLAttributes<HTMLDivElement>

export const Tooltip = ({children, className, style, ...rest}: TooltipProps) => {
  return (
    <div {...rest} style={style} className={clsx(styles.VideoPlayer__tooltip, className)} aria-hidden="true">
      <span className={styles.VideoPlayer__tooltipContent}>
        <Text className={styles.VideoPlayer__tooltipText} weight="medium">
          {children}
        </Text>
      </span>
    </div>
  )
}
