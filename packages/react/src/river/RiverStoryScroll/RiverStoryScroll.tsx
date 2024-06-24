import React, {PropsWithChildren, useEffect} from 'react'
import clsx from 'clsx'

import {River, Image, RiverProps} from '../..'

import {BaseProps} from '../../component-helpers'

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
  align = 'start',
  children,
  disable = false,
  imageTextRatio = '50:50',
}: PropsWithChildren<RiverStoryScrollProps>) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  const riverContainerRef = React.useRef<HTMLDivElement>(null)
  const [images, setImages] = React.useState<string[]>()
  const [currImage, setCurrImage] = React.useState<string>('')

  const Children = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === River) {
      return React.cloneElement(child as React.ReactElement<RiverProps>, {
        className: clsx(styles.RiverStoryScroll__item, 'animated'),
      })
    }
  })

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
    if (!disable && !prefersReducedMotion && images) {
      setCurrImage(images[0])
    }
  }, [images, disable, prefersReducedMotion])

  useEffect(() => {
    if (disable && prefersReducedMotion) return
    const targets = Array.from(document.querySelectorAll(`.animated`))

    const riverImgs = Array.from(riverContainerRef.current?.querySelectorAll('img') || [])

    const tempImages: string[] = []
    for (const image of riverImgs) {
      tempImages.push(image.src)
      const parentDiv = image.parentElement
      if (parentDiv) {
        parentDiv.style.display = 'none'
      }
    }

    setImages(tempImages)

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          entry.target.classList.toggle(styles.visible, entry.isIntersecting)

          if (entry.isIntersecting) {
            const image = entry.target.querySelector('img')
            if (image) {
              setCurrImage(image.src)
            }
          }
        }
      },
      {threshold: 1},
    )

    for (const target of targets) {
      observer.observe(target)
    }

    return () => {
      for (const target of targets) {
        observer.unobserve(target)
      }
    }
  }, [disable, prefersReducedMotion])

  if (disable || prefersReducedMotion) {
    return <div>{children}</div>
  }

  return (
    <div className={clsx(styles.RiverStoryScroll)}>
      <div
        className={clsx(
          styles.RiverStoryScroll__inner,
          styles[`RiverStoryScroll__inner--align-${align}`],
          styles[`RiverStoryScroll__inner--${imageTextRatio.replace(':', '-')}`],
        )}
      >
        <div ref={riverContainerRef} className={clsx(styles.RiverStoryScroll__content)}>
          {Children}
        </div>
        <div className={clsx(styles.RiverStoryScroll__visual)}>
          <div className={styles['RiverStoryScroll__visual-inner']}>
            <Image
              borderRadius="large"
              src={currImage}
              className={clsx(styles['RiverStoryScroll__visual-image'])}
              // FIXME: infer alt text from original river
              alt="Story Image"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
