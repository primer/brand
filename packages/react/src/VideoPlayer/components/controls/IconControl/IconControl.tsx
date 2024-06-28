import React from 'react'
import clsx from 'clsx'
import {Tooltip} from '../../index'

import styles from '../../../VideoPlayer.module.css'

type IconControlProps = {
  tooltip: string
} & React.HTMLAttributes<HTMLButtonElement>
// TODO Can this be improved?
export const IconControl = ({tooltip, children, className, ...rest}: IconControlProps) => {
  return (
    <button className={clsx(styles.VideoPlayer__iconControl, className)} {...rest} aria-label={tooltip}>
      {children}
      <span className="visually-hidden">{tooltip}</span>
      <Tooltip>{tooltip}</Tooltip>
    </button>
  )
}
