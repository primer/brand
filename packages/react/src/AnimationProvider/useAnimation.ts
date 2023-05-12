import {CSSProperties, useContext, useMemo} from 'react'
import {AnimateProps, AnimationContext, AnimationVariants} from './AnimationProvider'

import styles from './AnimationProvider.module.css'

const animationTypeToClass = AnimationVariants.reduce((acc, key) => {
  acc[key] = styles[`Animation--${key}`]
  return acc
}, {})

/**
 * A hook that returns CSS classes and styles for animating an element.
 * @param {AnimateProps} [animateProps] - An object containing animation properties.
 * @returns {{classes: string; styles: CSSProperties}} - An object containing CSS classes and styles for animating an element.
 */
export const useAnimation = (animateProps?: AnimateProps): {classes: string; styles: CSSProperties} => {
  const {disableAnimations} = useContext(AnimationContext)

  const animationClasses = useMemo(() => {
    if (!animateProps || disableAnimations) {
      return ''
    }

    const defaultClasses = styles.Animation
    const dynamicClasses: string[] = []

    const animationType = typeof animateProps === 'string' ? animateProps : animateProps.variant
    const animationClass = animationTypeToClass[animationType]
    if (animationClass) {
      dynamicClasses.push(animationClass)
    }

    return `${defaultClasses} ${dynamicClasses.join(' ')}`
  }, [animateProps, disableAnimations])

  const animationStyles = useMemo(() => {
    if (!animateProps) {
      return {}
    }

    const newStyles: CSSProperties = {}

    if (typeof animateProps === 'object') {
      const {delay, duration, ease} = animateProps
      if (typeof delay === 'number') {
        newStyles.animationDelay = `${delay}ms`
      }
      if (typeof duration === 'number') {
        newStyles.animationDuration = `${duration}ms`
      }

      if (ease) {
        newStyles.animationTimingFunction = ease
      }
    }

    return newStyles
  }, [animateProps])

  return {
    classes: animationClasses,
    styles: animationStyles
  }
}
