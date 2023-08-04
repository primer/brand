import React from 'react'
import {Text} from '../../../Text'

import styles from '../../VideoPlayer.module.css'

export const Tooltip = ({children}: {children: string}) => {
  return (
    <div className={styles.VideoPlayer__tooltip} aria-hidden="true">
      <span className={styles.VideoPlayer__tooltipContent}>
        <Text className={styles.VideoPlayer__tooltipText} weight="medium">
          {children}
        </Text>
      </span>
    </div>
  )
}
