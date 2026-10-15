import {useEffect, useMemo, useRef, type RefObject} from 'react'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import styles from './TestimonialGroup.module.css'

type TestimonialGroupTimerOptions = {
  rootRef: RefObject<HTMLDivElement | null>
  slidesRef: RefObject<HTMLDivElement | null>
  itemCount: number
  enabled: boolean
  isPaused: boolean
  isTransitioningOut: boolean
  activeIndex: number
  onElapsed: () => void
}

export function useTestimonialGroupTimer({
  rootRef,
  slidesRef,
  itemCount,
  enabled,
  isPaused,
  isTransitioningOut,
  activeIndex,
  onElapsed,
}: TestimonialGroupTimerOptions) {
  const optionsRef = useRef({isPaused, isTransitioningOut, onElapsed})
  const controller = useRef<{
    stop: (holdProgress?: boolean) => void
    reset: () => void
    resume: () => void
    sync: () => void
  } | null>(null)
  const timer = useMemo(
    () => ({
      stop: (holdProgress = false) => controller.current?.stop(holdProgress),
      reset: () => controller.current?.reset(),
      resume: () => controller.current?.resume(),
    }),
    [],
  )

  useIsomorphicLayoutEffect(() => {
    optionsRef.current = {isPaused, isTransitioningOut, onElapsed}
  }, [isPaused, isTransitioningOut, onElapsed])

  useEffect(() => {
    const root = rootRef.current
    if (!root || itemCount === 0) return
    let animation: Animation | null = null
    let timerElement: HTMLElement | null = null
    let visible = false
    let suspended = false
    let hovered = root.matches(':hover')
    let nextTimerStart = 0

    const getRing = () =>
      root.querySelector<HTMLElement>(
        `.${styles['TestimonialGroup__slide--active']} .${styles.TestimonialGroup__avatar}`,
      )
    const stop = (holdProgress = false) => {
      if (!animation) return
      if (holdProgress && timerElement) {
        timerElement.style.setProperty(
          '--brand-TestimonialGroup-ring-progress',
          getComputedStyle(timerElement).getPropertyValue('--brand-TestimonialGroup-ring-progress'),
        )
      }
      animation.onfinish = null
      animation.cancel()
      animation = null
    }
    const sync = () => {
      const ring = getRing()
      if (!enabled || itemCount <= 1) {
        stop()
        ring?.style.setProperty('--brand-TestimonialGroup-ring-progress', '360deg')
        return
      }
      if (
        !visible ||
        document.hidden ||
        suspended ||
        hovered ||
        optionsRef.current.isPaused ||
        optionsRef.current.isTransitioningOut
      ) {
        animation?.pause()
        return
      }
      if (animation) {
        if (animation.playState === 'paused') animation.play()
        return
      }
      timerElement = ring ?? root.querySelector<HTMLElement>(`.${styles['TestimonialGroup__slide--active']}`)
      if (!timerElement?.animate) return
      const start = nextTimerStart
      nextTimerStart = 0
      timerElement.style.setProperty('--brand-TestimonialGroup-ring-progress', `${start}deg`)
      const nextAnimation = timerElement.animate(
        [
          {'--brand-TestimonialGroup-ring-progress': `${start}deg`},
          {'--brand-TestimonialGroup-ring-progress': '360deg'},
        ] as Keyframe[],
        {duration: (1 - start / 360) * 7000, easing: 'linear', fill: 'both'},
      )
      animation = nextAnimation
      nextAnimation.onfinish = () => {
        if (animation !== nextAnimation) return
        animation = null
        timerElement?.style.setProperty('--brand-TestimonialGroup-ring-progress', '360deg')
        nextAnimation.cancel()
        optionsRef.current.onElapsed()
      }
    }
    controller.current = {
      stop,
      reset: () => {
        nextTimerStart = 0
        getRing()?.style.setProperty('--brand-TestimonialGroup-ring-progress', '0deg')
      },
      resume: () => {
        nextTimerStart =
          parseFloat(getRing()?.style.getPropertyValue('--brand-TestimonialGroup-ring-progress') ?? '') || 0
        if (nextTimerStart >= 360) nextTimerStart = 0
        sync()
      },
      sync,
    }

    const onVisibilityChange = () => sync()
    const onMouseEnter = () => {
      hovered = true
      sync()
    }
    const onMouseLeave = () => {
      hovered = false
      sync()
    }
    const onPageHide = () => {
      suspended = true
      sync()
    }
    const onPageShow = () => {
      suspended = false
      sync()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    root.addEventListener('mouseenter', onMouseEnter)
    root.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('pagehide', onPageHide)
    window.addEventListener('pageshow', onPageShow)
    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.intersectionRatio >= 0.2
              sync()
            },
            {threshold: [0, 0.2]},
          )
        : null
    if (slidesRef.current) observer?.observe(slidesRef.current)
    sync()
    return () => {
      stop()
      observer?.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      root.removeEventListener('mouseenter', onMouseEnter)
      root.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('pagehide', onPageHide)
      window.removeEventListener('pageshow', onPageShow)
      controller.current = null
    }
  }, [enabled, itemCount, rootRef, slidesRef])

  useIsomorphicLayoutEffect(() => {
    controller.current?.sync()
  }, [activeIndex, isPaused, isTransitioningOut])

  return timer
}
