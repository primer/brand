import React, {useEffect, useRef, useState, ReactElement} from 'react'
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
  const isVideo = React.Children.toArray(children).some(child => React.isValidElement(child) && child.type === 'video')

  const {visibilityStates} = useStoryScrollContext()
  const isVisible = visibilityStates[index]
  const dynamicClassName = `${className || ''} ${isVisible ? visibleClassName : hiddenClassName}`
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoStatus, setVideoStatus] = useState<'playing' | 'paused' | 'ended'>('paused')

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.onended = () => setVideoStatus('ended')
      if (isVisible) {
        setVideoStatus('playing')
        videoElement.play().catch(error => {
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
      return React.cloneElement(child as ReactElement<any>, {ref: videoRef})
    }
    return child
  })

  const handlePlayPause = () => {
    const videoElement = videoRef.current
    if (videoElement) {
      if (videoStatus !== 'playing') {
        videoElement.play()
        setVideoStatus('playing')
      } else {
        videoElement.pause()
        setVideoStatus('paused')
      }
    }
  }

  const handleReplay = () => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.currentTime = 0
      videoElement.play()
      setVideoStatus('playing')
    }
  }

  return (
    <div className={dynamicClassName}>
      {parsedChildren}
      {isVideo && (
        <div className={`video-controls video-controls-${videoStatus}`}>
          {videoStatus === 'paused' && (
            <button className="video-control" onClick={handlePlayPause}>
              <img
                src="/assets/projects/copilot-workspace/icon-play-small.webp"
                className="video-control-img"
                width="21"
                height="21"
              />
            </button>
          )}
          {videoStatus === 'playing' && (
            <button className="video-control" onClick={handlePlayPause}>
              <img
                src="/assets/projects/copilot-workspace/icon-pause.webp"
                className="video-control-img"
                width="21"
                height="21"
              />
            </button>
          )}
          {videoStatus === 'ended' && (
            <button className="video-control" onClick={handleReplay}>
              <img
                src="/assets/projects/copilot-workspace/icon-replay.webp"
                className="video-control-img"
                width="21"
                height="21"
              />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
