import React, {useEffect, useRef, useState, type HTMLAttributes} from 'react'
import {clsx} from 'clsx'

import {Text} from '../../../Text'
import styles from '../../VideoPlayer.module.css'

type VideoTooltipProps = HTMLAttributes<HTMLDivElement>

export const VideoTooltip = ({children, className, ...rest}: VideoTooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [hasFocus, setHasFocus] = useState(false)
  const mouseenterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const tooltip = tooltipRef.current
    const parent = tooltip?.parentElement

    if (!tooltip || !parent) {
      return
    }

    const clearTimeoutAndRef = () => {
      if (mouseenterTimeoutRef.current) {
        clearTimeout(mouseenterTimeoutRef.current)
        mouseenterTimeoutRef.current = null
      }
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

    const onClick = () => {
      // Close tooltip when element is clicked
      setHasFocus(false)
    }

    const onMouseEnterTooltip = () => {
      clearTimeoutAndRef()
      setHasFocus(true)
    }

    const onMouseLeaveTooltip = () => {
      clearTimeoutAndRef()

      mouseenterTimeoutRef.current = setTimeout(() => {
        setHasFocus(false)
      }, 100)
    }

    parent.addEventListener('focus', checkFocus)
    parent.addEventListener('blur', checkFocus)
    parent.addEventListener('focusin', checkFocus)
    parent.addEventListener('focusout', checkFocus)
    parent.addEventListener('click', onClick)
    parent.addEventListener('mouseenter', onMouseEnterTooltip)
    parent.addEventListener('mouseleave', onMouseLeaveTooltip)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeoutAndRef()

      parent.removeEventListener('focus', checkFocus)
      parent.removeEventListener('blur', checkFocus)
      parent.removeEventListener('focusin', checkFocus)
      parent.removeEventListener('focusout', checkFocus)
      parent.removeEventListener('click', onClick)
      parent.removeEventListener('mouseenter', onMouseEnterTooltip)
      parent.removeEventListener('mouseleave', onMouseLeaveTooltip)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [tooltipRef])

  return (
    <div
      className={clsx(styles.VideoPlayer__tooltip, hasFocus && styles['VideoPlayer__tooltip-visible'], className)}
      ref={tooltipRef}
      {...rest}
    >
      {hasFocus ? (
        <span className={styles.VideoPlayer__tooltipContent}>
          <Text className={styles.VideoPlayer__tooltipText} weight="medium">
            {children}
          </Text>
        </span>
      ) : (
        <span className="visually-hidden">{children}</span>
      )}
    </div>
  )
}
