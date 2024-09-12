import clsx from 'clsx'
import React, {useEffect, useRef} from 'react'
import {River, RiverProps} from '../../'
import {BaseProps} from '../../component-helpers'
import {RiverStoryScrollProvider} from './RiverStoryScrollProvider'
import {RiverStoryScrollResponder} from './RiverStoryScrollResponder'
import {RiverStoryScrollTracker} from './RiverStoryScrollTracker'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/river-story-scroll/colors-with-modes.css'
import styles from './RiverStoryScroll.module.css'

export type RiverStoryScrollProps = {
  /**
   * Adjust the order of the `Content` column. The default is `start`.
   */
  align?: 'start' | 'end'
  /**
   * Apply an alternative image to text column ratio. The default is `50:50`.
   */
  imageTextRatio?: '60:40' | '50:50'
  /**
   * Disable the scroll effect.
   */
  disabled?: boolean
} & BaseProps<HTMLDivElement>

export function RiverStoryScroll({children, disabled}: React.PropsWithChildren<RiverStoryScrollProps>) {
  const visualContainerRef = useRef<HTMLDivElement | null>(null)
  const contentContainerRef = useRef<HTMLDivElement | null>(null)

  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)
  const [media, setMedia] = React.useState<
    Array<{type: 'image'; src: string} | {type: 'video'; src: string}> | undefined
  >([])

  const Children = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === River) {
      return React.cloneElement(child as React.ReactElement<RiverProps>, {
        className: clsx(styles['RiverStoryScroll__internal-river'], styles['RiverStoryScroll__content-stack']),
      })
    }
  })

  const initialVisibilityStates = Children ? new Array(Children.length).fill(false) : []

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [])

  useEffect(() => {
    if (disabled || prefersReducedMotion || !contentContainerRef.current) return

    const mediaElements = Array.from(contentContainerRef.current.querySelectorAll('img, video')).filter(element => {
      return element.tagName === 'IMG' || element.tagName === 'VIDEO'
    })

    const newMedia = mediaElements
      .map((element): {type: 'image' | 'video'; src: string} | undefined => {
        if (element.tagName === 'IMG') {
          return {
            type: 'image',
            src: (element as HTMLImageElement).src,
          }
        } else if (element.tagName === 'VIDEO') {
          return {
            type: 'video',
            src: (element as HTMLVideoElement).querySelector('source')?.src || '',
          }
        }
        return undefined
      })
      .filter(Boolean) as Array<{type: 'image' | 'video'; src: string}>

    // set new media
    setMedia(newMedia)
  }, [disabled, prefersReducedMotion])

  if (disabled || prefersReducedMotion) {
    return <div className={clsx(styles.RiverStoryScroll, styles['RiverStoryScroll--disabled'])}>{Children}</div>
  }

  return (
    <div className={clsx(styles.RiverStoryScroll, styles['RiverStoryScroll--enabled'])}>
      <RiverStoryScrollProvider initialStates={initialVisibilityStates} className={styles.RiverStoryScroll__inner}>
        <div className={styles['RiverStoryScroll__visual-container']} ref={visualContainerRef}>
          <div
            className={clsx(
              styles['RiverStoryScroll__visual-container-inner'],
              styles['RiverStoryScroll__visual--below'],
            )}
          >
            <div className={styles['RiverStoryScroll__visual-cover']} />
            {media?.map((item, index) => (
              <RiverStoryScrollResponder
                className={styles['RiverStoryScroll__visual-scroll-responder']}
                key={index}
                index={index}
              >
                {media[index].type === 'video' && (
                  <video playsInline={true} muted={true} preload="auto" className={styles['RiverStoryScroll__image']}>
                    <source src={media[index].src} type="video/mp4; codecs=avc1.4d002a" />
                  </video>
                )}
                {media[index].type === 'image' && (
                  <img className={styles['RiverStoryScroll__image']} src={`${media[index].src}`} alt="" />
                )}
              </RiverStoryScrollResponder>
            ))}
            <div className={styles['RiverStoryScroll__pagination']}>
              {media?.map((_, index) => (
                <div className={styles['RiverStoryScroll__pagination-dot']} key={index} />
              ))}
            </div>
          </div>
        </div>

        <div
          ref={contentContainerRef}
          className={clsx(
            styles['RiverStoryScroll__content-container'],
            styles['RiverStoryScroll__content-container--below'],
          )}
        >
          {React.Children.map(Children, (child, index) => (
            <RiverStoryScrollTracker
              key={index}
              location="below"
              index={index}
              className={styles.RiverStoryScroll__tracker}
            >
              {child}
            </RiverStoryScrollTracker>
          ))}
        </div>
      </RiverStoryScrollProvider>
    </div>
  )
}
