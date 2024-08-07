import React, {useEffect, useRef, useState} from 'react'
import {useStoryScrollContext} from './RiverStoryScrollProvider' // Adjust the import path as necessary

import styles from './RiverStoryScroll.module.css'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isVideo = React.Children.toArray(children).some(child => React.isValidElement(child) && child.type === 'video')

  const {visibilityStates} = useStoryScrollContext()
  const isVisible = visibilityStates[index]
  const dynamicClassName = `${className || ''} ${isVisible ? visibleClassName : hiddenClassName}`
  const videoRef = useRef<HTMLVideoElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoStatus, setVideoStatus] = useState<'playing' | 'paused' | 'ended'>('paused')

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.onended = () => setVideoStatus('ended')
      if (isVisible) {
        setVideoStatus('playing')
        // eslint-disable-next-line github/no-then
        videoElement.play().catch(error => {
          // eslint-disable-next-line no-console
          console.error('Error playing the video:', error)
          setVideoStatus('paused')
        })
      } else {
        videoElement.pause()
        setVideoStatus('paused')
      }
    }
  }, [isVisible])

  // Parse children to attach ref to video elements
  const parsedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === 'video') {
      return React.cloneElement(child, {ref: videoRef} as React.HTMLAttributes<HTMLVideoElement>)
    }
    return child
  })

  return <div className={dynamicClassName}>{parsedChildren}</div>
}
