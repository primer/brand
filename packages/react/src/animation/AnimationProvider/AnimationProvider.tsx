import React, {createContext, PropsWithChildren, useEffect, useState} from 'react'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/animation/base.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from '../Animation.module.css'
import {useId} from '../../hooks/useId'

export const AnimationVariants = [
  'fade-in',
  'fade-out',
  'slide-in-up',
  'slide-in-down',
  'slide-in-left',
  'slide-in-right',
  'scale-in-up',
  'scale-in-down',
  'scale-in',
  'fill-in-top',
  'scale-in-right',
  'scale-in-left',
  'fill-in-right',
] as const

type Variant = (typeof AnimationVariants)[number]

type VariantAdvanced = {
  variant: Variant
  delay?: number
  duration?: number
  ease?: string
}
export type AnimateProps = Variant | VariantAdvanced

type AnimationTrigger = 'click' | 'on-visible'
type IntersectionVisibilityeOptions = 'bottom-of-screen' | 'middle-of-screen' | 'about-to-leave' | number

type AnimationProviderProps = {
  /**
   * Prevents animations from running inside the provider
   */
  disableAnimations?: boolean
  /**
   * Controls the trigger method for the animation. One of `click` or `on-visible`.
   */
  animationTrigger?: AnimationTrigger
  /**
   * Controls the intersection observer options for the animation.
   * One of `bottom-of-screen`, `middle-of-screen`, `about-to-leave`, or a number between 0 and 1.
   */
  visibilityOptions?: IntersectionVisibilityeOptions
  /**
   * Will persist the animation end-state after the animation has completed
   */
  runOnce?: boolean

  /**
   * Will stagger the animations of the children using an incrementing delay
   */
  autoStaggerChildren?: boolean

  /**
   * Stagger delay increment. Should be used alongside `autoStaggerChildren`.
   */
  staggerDelayIncrement?: number
}

export const AnimationContext = createContext<AnimationProviderProps>({})

function getIntersectionObserverOptions(animationOptions: AnimationProviderProps): IntersectionObserverInit {
  const {visibilityOptions} = animationOptions

  switch (visibilityOptions) {
    case 'bottom-of-screen':
      return {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.4,
      }
    case 'middle-of-screen':
      return {
        rootMargin: '0px 0px -30% 0px',
        threshold: 0.4,
      }
    case 'about-to-leave':
      return {
        rootMargin: '0px 0px -100% 0px',
        threshold: 0.4,
      }
    default:
      return typeof visibilityOptions === 'number'
        ? {
            rootMargin: '0px',
            threshold: visibilityOptions / 100,
          }
        : {
            rootMargin: '0px',
            threshold: 0.4,
          }
  }
}

export function AnimationProvider({
  children,
  disableAnimations = false,
  animationTrigger = 'on-visible',
  visibilityOptions = 'bottom-of-screen',
  runOnce = false,
  autoStaggerChildren = true,
  staggerDelayIncrement = 100,
}: PropsWithChildren<AnimationProviderProps>) {
  const uniqueId = useId()
  const [animationContext, setAnimationContext] = useState<AnimationProviderProps>({
    disableAnimations,
    animationTrigger,
    visibilityOptions,
    runOnce,
  })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setAnimationContext({
        disableAnimations: true,
        animationTrigger,
        visibilityOptions,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // add useEffect to add transition-delay to children that contain the Animation class
  useEffect(() => {
    if (!disableAnimations && autoStaggerChildren && uniqueId) {
      const stagger = staggerDelayIncrement
      const animationProvider = document.getElementById(uniqueId)

      if (!animationProvider) return

      const items = Array.from(animationProvider.querySelectorAll<HTMLElement>(`.${styles.Animation}`))

      if (items.length === 0) return

      for (let i = 0; i < items.length; i++) {
        items[i].style.transitionDelay = `${i * stagger}ms`
      }
    }
  }, [disableAnimations, autoStaggerChildren, staggerDelayIncrement, uniqueId])

  useEffect(() => {
    if (!disableAnimations && animationTrigger === 'on-visible') {
      const observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.target.classList.contains(styles.Animation)) {
              entry.target.classList.add(styles['Animation--active'])
            } else {
              if (!runOnce) {
                entry.target.classList.remove(styles['Animation--active'])
              }
            }
          }
        },
        getIntersectionObserverOptions({
          disableAnimations,
          animationTrigger,
          visibilityOptions,
        }),
      )

      const elements = Array.from(document.querySelectorAll(`.${styles.Animation}`))

      for (const element of elements) {
        observer.observe(element)
      }

      return () => {
        observer.disconnect()
      }
    }

    if (!disableAnimations && animationTrigger === 'click') {
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (target.classList.contains(styles.Animation)) {
          target.classList.add(styles['Animation--active'])
        }
      }

      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('click', handleClick)
      }
    }
  }, [disableAnimations, animationTrigger, visibilityOptions, runOnce])
  return (
    <AnimationContext.Provider value={animationContext}>
      <div id={uniqueId}>{children}</div>
    </AnimationContext.Provider>
  )
}
