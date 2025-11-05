import React, {useRef, useEffect, PropsWithChildren} from 'react'
import {clsx} from 'clsx'

import {useTheme} from '../'
import {BaseProps} from '../component-helpers'

import styles from './Card.module.css'

type CardSkewEffectProps = {
  perspective?: number
  disableSkew?: boolean
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>

export const CardSkewEffect = ({
  color,
  children,
  className,
  perspective = 700,
  disableSkew = false,
  ...rest
}: PropsWithChildren<CardSkewEffectProps>) => {
  const {colorMode} = useTheme()
  const boundingRef = useRef<HTMLDivElement | null>(null)
  const torchRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (colorMode === 'light' || disableSkew) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const boundingElement = boundingRef.current
    const torchElement = torchRef.current

    if (!boundingElement) {
      return
    }

    const handleReducedMotionChange = () => {
      if (motionQuery.matches) {
        boundingElement.removeEventListener('mousemove', handleMouseMove)
      } else {
        boundingElement.addEventListener('mousemove', handleMouseMove)
      }
    }

    const handleMouseMove = e => {
      const rect = boundingElement.getBoundingClientRect()
      const x = torchElement ? rect.width - (e.clientX - rect.left) - torchElement.offsetWidth / 2 : 0
      const y = torchElement ? rect.height - (e.clientY - rect.top) - torchElement.offsetHeight / 2 : 0
      const skewY = -((e.clientX - rect.left - rect.width / 2) / rect.width) * 3
      const skewX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 2

      if (torchElement) {
        torchElement.style.transform = `translate(${-x}px, ${-y / 2}px)`
      }

      boundingElement.style.transform = `perspective(${perspective}px) rotateX(${
        Math.round(skewX * 100) / 100
      }deg) rotateY(${Math.round(skewY * 100) / 100}deg)`
    }

    motionQuery.addEventListener('change', handleReducedMotionChange)
    boundingElement.addEventListener('mousemove', handleMouseMove)

    handleReducedMotionChange()

    return () => {
      boundingElement.removeEventListener('mousemove', handleMouseMove)
      torchElement?.removeEventListener('mousemove', handleMouseMove)
      motionQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [disableSkew, perspective, colorMode])

  return (
    <div ref={boundingRef} className={clsx(styles['Card--skew'], className)} {...rest}>
      <div className={styles['Card__skew-bounding']}>
        {children}
        <div
          ref={torchRef}
          className={clsx(!disableSkew && styles.Card__torch, styles[`Card--skew-colorMode-${colorMode}`])}
        />
      </div>
    </div>
  )
}
