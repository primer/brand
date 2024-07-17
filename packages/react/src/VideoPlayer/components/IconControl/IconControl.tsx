import React, {type HTMLAttributes} from 'react'
import clsx from 'clsx'

import {VideoTooltip} from '../'
import styles from '../../VideoPlayer.module.css'

type IconControlProps = {
  tooltip: string
} & HTMLAttributes<HTMLButtonElement>

export const IconControl = ({tooltip, children, className, ...rest}: IconControlProps) => (
  <button className={clsx(styles.VideoPlayer__iconControl, className)} {...rest} aria-label={tooltip}>
    {children}
    <span className="visually-hidden">{tooltip}</span>
    <VideoTooltip>{tooltip}</VideoTooltip>
  </button>
)
