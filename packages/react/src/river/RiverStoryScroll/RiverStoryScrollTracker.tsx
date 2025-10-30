import React, {useEffect, useRef, useState} from 'react'
import {clsx} from 'clsx'

import {useWindowSize} from '../../'
import {useStoryScrollContext} from './RiverStoryScrollProvider'
import styles from './RiverStoryScroll.module.css'

type RiverStoryScrollTrackerProps = {
  index: number
  children?: React.ReactNode
  className?: string
  location?: string
}

export const RiverStoryScrollTracker = ({index, children, className = ''}: RiverStoryScrollTrackerProps) => {
  const {isLarge} = useWindowSize()
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const {setVisibilityStates} = useStoryScrollContext()

  useEffect(() => {
    function isLandscape() {
      return window.innerWidth / window.innerHeight >= 0.78
    }

    const observerCallback = ([entry]: IntersectionObserverEntry[]) => {
      if (isLandscape()) {
        setIsIntersecting(entry.isIntersecting)
        setVisibilityStates(index, entry.isIntersecting)
      }
    }

    const observerCallbackPortrait = ([entry]: IntersectionObserverEntry[]) => {
      if (!isLandscape()) {
        setIsIntersecting(entry.isIntersecting)
        setVisibilityStates(index, entry.isIntersecting)
      }
    }

    const observer = new IntersectionObserver(
      observerCallback,
      !isLarge
        ? {
            rootMargin: '-80% 0% -19.99% 0%',
            threshold: 0,
          }
        : {threshold: 0.8},
    )

    const observerPortrait = new IntersectionObserver(
      observerCallbackPortrait,
      !isLarge
        ? {
            rootMargin: '-65% 0% -34.99% 0%',
            threshold: 0,
          }
        : {threshold: 0.8},
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
      observerPortrait.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
      observerPortrait.disconnect()
    }
  }, [index, isLarge, setVisibilityStates])

  return (
    <div
      ref={elementRef}
      className={clsx(className, isIntersecting ? styles['in-viewport'] : styles['outside-viewport'])}
    >
      {children}
    </div>
  )
}
