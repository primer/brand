import React, {type HTMLAttributes, useEffect, useState} from 'react'
import clsx from 'clsx'

import {Text} from '../../../Text'
import styles from './Captions.module.css'
import {useVideo} from '../../hooks/useVideo'

export const Captions = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => {
  const [caption, setCaption] = useState('')
  const {ref} = useVideo()

  const videoRef = ref?.current
  const trackInformation = videoRef?.textTracks[0]?.cues

  useEffect(() => {
    if (!videoRef) {
      return
    }

    const compareAndSetCaption = () => {
      if (!trackInformation) {
        return
      }

      for (let i = 0; i < trackInformation.length; i++) {
        const cue = trackInformation[i]

        if (videoRef.currentTime >= cue.startTime && videoRef.currentTime < cue.endTime) {
          setCaption(cue['text'])
          break
        }

        setCaption('')
      }
    }

    videoRef.addEventListener('timeupdate', compareAndSetCaption)

    return () => videoRef.removeEventListener('timeupdate', compareAndSetCaption)
  }, [videoRef, trackInformation])

  if (!trackInformation) {
    return null
  }

  return (
    <div className={clsx(className, styles.Captions)} {...props}>
      <Text as="p" className={styles.Captions__text} align="center">
        {caption}
      </Text>
    </div>
  )
}
