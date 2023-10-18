import React, {useRef, useEffect, PropsWithChildren} from 'react'
import clsx from 'clsx'

import {useTheme} from '../'

import styles from './Card.module.css'

type CardSkewEffectProps = {
  perspective?: number
  disableSkew?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const CardSkewEffect = ({
  color,
  children,
  perspective = 700,
  disableSkew = false,
  ...rest
}: PropsWithChildren<CardSkewEffectProps>) => {
  const {colorMode} = useTheme()
  const boundingRef = useRef<HTMLDivElement | null>(null)
  const shineRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (colorMode === 'light') return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const boundingElement = boundingRef.current
    const shineElement = shineRef.current

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
      const x = shineElement ? rect.width - (e.clientX - rect.left) - shineElement.offsetWidth / 2 : 0
      const y = shineElement ? rect.height - (e.clientY - rect.top) - shineElement.offsetHeight / 2 : 0
      const skewY = !disableSkew ? -((e.clientX - rect.left - rect.width / 2) / rect.width) * 3 : 0
      const skewX = !disableSkew ? ((e.clientY - rect.top - rect.height / 2) / rect.height) * 2 : 0

      if (shineElement) {
        shineElement.style.transform = `translate(${-x}px, ${-y / 2}px)`
      }

      if (!disableSkew) {
        boundingElement.style.transform = `perspective(${perspective}px) rotateX(${
          Math.round(skewX * 100) / 100
        }deg) rotateY(${Math.round(skewY * 100) / 100}deg)`
      }
    }

    motionQuery.addEventListener('change', handleReducedMotionChange)
    boundingElement.addEventListener('mousemove', handleMouseMove)

    handleReducedMotionChange()

    return () => {
      boundingElement.removeEventListener('mousemove', handleMouseMove)
      shineElement?.removeEventListener('mousemove', handleMouseMove)
      motionQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [disableSkew, perspective, colorMode])

  return (
    <div ref={boundingRef} className={styles['Card--skew']} {...rest}>
      <div className={styles['Card__skew-bounding']}>
        {children}
        <div ref={shineRef} className={clsx(styles.Card__shine, styles[`Card--skew-colorMode-${colorMode}`])} />
      </div>
    </div>
  )
}
