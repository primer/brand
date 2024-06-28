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

  const riverImageContainerRef = React.useRef<HTMLDivElement>(null)
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
            const index = Array.from(targets).indexOf(entry.target) + 1

            const imageContainerEl = riverImageContainerRef.current

            if (imageContainerEl) {
              // hide all images that are more than current index
              const imageEls = imageContainerEl.querySelectorAll(`[data-storyscroll-image-index]`)
              imageEls.forEach(imageEl => {
                if (parseInt(imageEl.getAttribute('data-storyscroll-image-index') || '0') > index) {
                  imageEl.classList.remove(styles['RiverStoryScroll__visual-image--active'])
                }
              })

              const imageEl = imageContainerEl.querySelector(`[data-storyscroll-image-index="${index}"]`)
              imageEl?.classList.add(styles['RiverStoryScroll__visual-image--active'])

              /* for each image that is less than the current index, add inline styles for following
                  transform: translateY(calc(15 * 4)) scale(0.8);
                  filter: brightness(10%);
                  */

              imageEls.forEach((imageEl, newIndex) => {
                if (parseInt(imageEl.getAttribute('data-storyscroll-image-index') || '0') < index) {
                  imageEl.classList.add(styles['RiverStoryScroll__visual-image--stacked'])
                } else {
                  // remove
                  imageEl.classList.remove(styles['RiverStoryScroll__visual-image--stacked'])
                }
              })
            }

            // create image stacking effect
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
        <div className={clsx(styles.RiverStoryScroll__visual)} ref={riverImageContainerRef}>
          <div className={styles['RiverStoryScroll__visual-inner']}>
            {/* <Image
              borderRadius="large"
              src={currImage}
              className={clsx(styles['RiverStoryScroll__visual-image'])}
              // FIXME: infer alt text from original river
              alt="Story Image"
            /> */}
            {images &&
              images.map(image => (
                <Image
                  key={image}
                  borderRadius="large"
                  src={image}
                  className={clsx(styles['RiverStoryScroll__visual-image'])}
                  data-storyscroll-image-index={images.indexOf(image) + 1}
                  // FIXME: infer alt text from original river
                  alt="Story Image"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
