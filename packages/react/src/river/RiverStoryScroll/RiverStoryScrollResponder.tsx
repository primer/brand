import React, {useEffect, useRef} from 'react'
import {useStoryScrollContext} from './RiverStoryScrollProvider' // Adjust the import path as necessary

import styles from './RiverStoryScroll.module.css'
import {clsx} from 'clsx'

type RiverStoryScrollResponderProps = {
  index: number
  children?: React.ReactNode
  className?: string
  visibleClassName?: string // Optional: A class to apply when the item is supposed to be visible
  hiddenClassName?: string // Optional: A class to apply when the item is hidden
}

export function RiverStoryScrollResponder({
  index,
  children,
  className,
  visibleClassName = styles['tracker-in-viewport'],
  hiddenClassName = styles['tracker-outside-viewport'],
}: RiverStoryScrollResponderProps) {
  const {visibilityStates} = useStoryScrollContext()
  const isVisible = visibilityStates[index]
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current

    if (!videoElement) return

    if (isVisible) {
      // eslint-disable-next-line github/no-then
      videoElement.play().catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error playing the video:', error)
      })
    } else {
      videoElement.pause()
    }
  }, [isVisible])

  // Parse children to attach ref to video elements
  const parsedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === 'video') {
      return React.cloneElement(child, {ref: videoRef} as React.HTMLAttributes<HTMLVideoElement>)
    }
    return child
  })

  return <div className={clsx(className, isVisible ? visibleClassName : hiddenClassName)}>{parsedChildren}</div>
}
