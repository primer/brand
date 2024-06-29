import React, {useEffect, useRef} from 'react'
import {Stack, Heading, River, RiverProps, Text} from '../../'
import {RiverStoryScrollProvider} from './RiverStoryScrollProvider'
import {RiverStoryScrollResponder} from './RiverStoryScrollResponder'
import {RiverStoryScrollTracker} from './RiverStoryScrollTracker'
import {BaseProps} from '../../component-helpers'
import clsx from 'clsx'

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
  disable?: boolean
} & BaseProps<HTMLDivElement>

export function RiverStoryScroll({
  children,
  disable,
  align = 'start',
  imageTextRatio = '50:50',
}: React.PropsWithChildren<RiverStoryScrollProps>) {
  const visualContainerRef = useRef<HTMLDivElement | null>()
  const contentContainerRef = useRef<HTMLDivElement | null>()

  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)
  const [images, setImages] = React.useState<string[]>()

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
    if (disable || prefersReducedMotion) return
    if (contentContainerRef.current) {
      const origImages = Array.from(contentContainerRef.current.querySelectorAll('img'))

      const imageSources = origImages.map(image => image.src)

      // set the images state
      setImages(imageSources)
    }
  }, [disable, prefersReducedMotion])

  if (disable || prefersReducedMotion) {
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
            {images?.map((item, index) => (
              <RiverStoryScrollResponder
                className={styles['RiverStoryScroll__visual-scroll-responder']}
                key={index}
                index={index}
              >
                {/* <video
                    playsInline={true}
                    muted={true}
                    preload="auto"
                    poster={`/assets/projects/copilot-workspace/river-poster-${
                      index + 1
                    }.webp`}
                    width="1032"
                    height="690"
                    className={styles['RiverStoryScroll__image']}
                  >
                    <source
                      src={`/assets/projects/copilot-workspace/features-river-${
                        index + 1
                      }.mp4`}
                      type="video/mp4; codecs=avc1.4d002a"
                    />
                  </video> */}
                <img className={styles['RiverStoryScroll__image']} src={`${images[index]}`} alt="" />
              </RiverStoryScrollResponder>
            ))}
            <div className={styles['RiverStoryScroll__pagination']}>
              {images?.map((item, index) => (
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
          {/*
          {copy.map((item, index) => (
            <RiverStoryScrollTracker
              key={index}
              location="below"
              index={index}
              className={styles.RiverStoryScroll__tracker}
            >
              <Stack
                direction={{narrow: 'vertical', regular: 'vertical'}}
                padding={'none'}
                className={styles['RiverStoryScroll__content-stack']}
              >
                <Heading as="h5">{item.title}</Heading>
                <Text as="p" variant="muted" size={'100'}>
                  {item.description}
                </Text>
              </Stack>
            </RiverStoryScrollTracker>
          ))}*/}
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
