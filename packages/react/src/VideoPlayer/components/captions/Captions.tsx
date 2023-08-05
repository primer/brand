import React from 'react'
import clsx from 'clsx'
import {Text} from '../../../Text'

import styles from '../../VideoPlayer.module.css'

type CaptionsProps = {
  videoRef: React.RefObject<HTMLVideoElement>
  disabled?: boolean
  trackInformation?: TextTrackCueList
}

export const Captions = ({videoRef, disabled, trackInformation}: CaptionsProps) => {
  const [caption, setCaption] = React.useState('')

  React.useEffect(() => {
    const compareAndSetCaption = () => {
      if (trackInformation) {
        for (let i = 0; i < trackInformation.length; i++) {
          const cue = trackInformation[i]
          if (
            videoRef.current?.currentTime &&
            videoRef.current.currentTime >= cue.startTime &&
            videoRef.current.currentTime <= cue.endTime
          ) {
            setCaption(cue['text'])
            break
          } else {
            setCaption('')
          }
        }
      }
    }

    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', compareAndSetCaption)
    }
    return () => window.removeEventListener('timeupdate', compareAndSetCaption)
  }, [videoRef, trackInformation])

  return (
    <div className={clsx(styles.VideoPlayer__captions, (disabled || !caption) && styles.VideoPlayer__captions__empty)}>
      <Text as="p" className={styles.VideoPlayer__captions__text}>
        {caption}
      </Text>
    </div>
  )
}
