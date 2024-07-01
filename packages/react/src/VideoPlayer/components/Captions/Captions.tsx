import React, {useEffect, useState} from 'react'
import clsx from 'clsx'

import {Text} from '../../../Text'
import styles from './Captions.module.css'

type CaptionsProps = {
  videoRef: React.RefObject<HTMLVideoElement>
}

export const Captions = ({videoRef}: CaptionsProps) => {
  const [caption, setCaption] = useState('')
  const trackInformation = videoRef.current?.textTracks[0]?.cues

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const compareAndSetCaption = () => {
      if (!trackInformation) {
        return
      }

      for (let i = 0; i < trackInformation.length; i++) {
        const cue = trackInformation[i]

        if (video.currentTime >= cue.startTime && video.currentTime < cue.endTime) {
          setCaption(cue['text'])
          break
        }

        setCaption('')
      }
    }

    video.addEventListener('timeupdate', compareAndSetCaption)

    return () => window.removeEventListener('timeupdate', compareAndSetCaption)
  }, [videoRef, trackInformation])

  if (!caption) {
    return null
  }

  return (
    <div className={clsx(styles.Captions)}>
      <Text as="p" className={styles.Captions__text}>
        {caption}
      </Text>
    </div>
  )
}
