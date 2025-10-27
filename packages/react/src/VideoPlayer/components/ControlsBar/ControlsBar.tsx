import React, {type HTMLAttributes} from 'react'
import {clsx} from 'clsx'

import styles from '../../VideoPlayer.module.css'

export type ControlsBarProps = HTMLAttributes<HTMLDivElement>

export const ControlsBar = ({className, ...rest}: ControlsBarProps) => (
  <div className={clsx(styles.VideoPlayer__controlsBar, className)} {...rest} />
)
