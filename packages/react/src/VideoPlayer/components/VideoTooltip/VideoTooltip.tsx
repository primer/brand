import React, {type HTMLAttributes} from 'react'
import clsx from 'clsx'

import {Text} from '../../../Text'
import styles from '../../VideoPlayer.module.css'

type VideoTooltipProps = HTMLAttributes<HTMLDivElement>

export const VideoTooltip = ({children, className, ...rest}: VideoTooltipProps) => (
  <div className={clsx(styles.VideoPlayer__tooltip, className)} {...rest}>
    <span className={styles.VideoPlayer__tooltipContent}>
      <Text className={styles.VideoPlayer__tooltipText} weight="medium">
        {children}
      </Text>
    </span>
  </div>
)
