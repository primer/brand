import React, {useEffect, useRef, useState, type HTMLAttributes} from 'react'
import clsx from 'clsx'

import {Text} from '../../../Text'
import styles from '../../VideoPlayer.module.css'

type VideoTooltipProps = HTMLAttributes<HTMLDivElement>

export const VideoTooltip = ({children, className, ...rest}: VideoTooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {
    const tooltip = tooltipRef.current
    const parent = tooltip?.parentElement

    if (!tooltip || !parent) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHasFocus(false)
      }
    }

    const checkFocus = () => {
      const isFocused = parent === document.activeElement || parent.contains(document.activeElement)
      setHasFocus(isFocused)
    }

    parent.addEventListener('focus', checkFocus)
    parent.addEventListener('blur', checkFocus)
    parent.addEventListener('focusin', checkFocus)
    parent.addEventListener('focusout', checkFocus)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      parent.removeEventListener('focus', checkFocus)
      parent.removeEventListener('blur', checkFocus)
      parent.removeEventListener('focusin', checkFocus)
      parent.removeEventListener('focusout', checkFocus)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [tooltipRef])

  return (
    <div
      className={clsx(styles.VideoPlayer__tooltip, hasFocus && styles['VideoPlayer__tooltip-visible'], className)}
      ref={tooltipRef}
      {...rest}
    >
      <span className={styles.VideoPlayer__tooltipContent}>
        <Text className={styles.VideoPlayer__tooltipText} weight="medium">
          {children}
        </Text>
      </span>
    </div>
  )
}
