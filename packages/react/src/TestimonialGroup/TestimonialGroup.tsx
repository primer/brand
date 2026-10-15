import React, {Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState} from 'react'
import {clsx} from 'clsx'
import {PauseIcon} from '@primer/octicons-react'
import {Testimonial, type TestimonialProps} from '../Testimonial'
import {CarouselPagination} from '../CarouselPagination/CarouselPagination'
import {IconButton} from '../IconButton'
import {useReducedMotion} from '../hooks/useReducedMotion'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import type {BaseProps} from '../component-helpers'
import {useTestimonialGroupTimer} from './useTestimonialGroupTimer'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/testimonial-group/base.css'
import styles from './TestimonialGroup.module.css'

const testIds = {
  root: 'TestimonialGroup',
}

const testimonialGroupTimings = {
  fadeOut: 370,
  fadeIn: 675,
} as const

export type TestimonialGroupProps = BaseProps<HTMLDivElement> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    /** Automatically advances testimonials every seven seconds. */
    autoPlay?: boolean
    'data-testid'?: string
    /** Initial testimonial: 0 for the first, 1 for the second. */
    defaultActiveIndex?: number
    /** Called after a testimonial changes, with its index (first is 0). */
    onChange?: (activeIndex: number) => void
    /** Overrides accessible control labels and slide announcements. */
    labels?: {
      controlsPrev?: string
      controlsNext?: string
      controlsPause?: string
      controlsPlay?: string
      indicator?: string
      testimonial?: string
      countSeparator?: string
    }
  }

type TestimonialGroupView = {index: number; targetIndex: number; phase: 'idle' | 'out' | 'in'}

const defaultLabels = {
  controlsPrev: 'Previous testimonial',
  controlsNext: 'Next testimonial',
  controlsPause: 'Pause testimonials',
  controlsPlay: 'Play testimonials',
  indicator: 'Go to testimonial',
  testimonial: 'Testimonial',
  countSeparator: 'of',
}

const Root = forwardRef<HTMLDivElement, TestimonialGroupProps>(
  (
    {
      children,
      className,
      autoPlay = true,
      defaultActiveIndex = 0,
      onChange,
      labels: labelsProp,
      onFocusCapture,
      'aria-label': ariaLabel = 'Testimonials',
      'data-testid': testId,
      ...props
    },
    forwardedRef,
  ) => {
    const testimonials = useMemo(
      () =>
        Children.toArray(children).filter(
          (child): child is React.ReactElement<TestimonialProps> =>
            isValidElement<TestimonialProps>(child) && child.type === Testimonial,
        ),
      [children],
    )
    const initialIndex = Math.max(
      0,
      Math.min(Number.isInteger(defaultActiveIndex) ? defaultActiveIndex : 0, testimonials.length - 1),
    )
    const [view, setView] = useState<TestimonialGroupView>({
      index: initialIndex,
      targetIndex: initialIndex,
      phase: 'idle',
    })
    const viewRef = useRef(view)
    const rootRef = useProvidedRefOrCreate<HTMLDivElement | null>(forwardedRef)
    const slidesRef = useRef<HTMLDivElement>(null)
    const controlsRef = useRef<HTMLDivElement>(null)
    const playbackRef = useRef<HTMLButtonElement>(null)
    const onChangeRef = useRef(onChange)
    const [isPaused, setIsPaused] = useState(false)
    const [announcementIndex, setAnnouncementIndex] = useState<number | null>(null)
    const prefersReducedMotion = useReducedMotion()
    const controller = useRef<{
      changeTo: (index: number, manual?: boolean) => void
    } | null>(null)
    const timer = useTestimonialGroupTimer({
      rootRef,
      slidesRef,
      itemCount: testimonials.length,
      enabled: autoPlay && !prefersReducedMotion,
      isPaused,
      isTransitioningOut: view.phase === 'out',
      activeIndex: view.index,
      onElapsed: () => controller.current?.changeTo((viewRef.current.index + 1) % testimonials.length),
    })
    const labels = {
      controlsPrev: labelsProp?.controlsPrev ?? defaultLabels.controlsPrev,
      controlsNext: labelsProp?.controlsNext ?? defaultLabels.controlsNext,
      controlsPause: labelsProp?.controlsPause ?? defaultLabels.controlsPause,
      controlsPlay: labelsProp?.controlsPlay ?? defaultLabels.controlsPlay,
      indicator: labelsProp?.indicator ?? defaultLabels.indicator,
      testimonial: labelsProp?.testimonial ?? defaultLabels.testimonial,
      countSeparator: labelsProp?.countSeparator ?? defaultLabels.countSeparator,
    }

    useIsomorphicLayoutEffect(() => {
      onChangeRef.current = onChange
    }, [onChange])

    useIsomorphicLayoutEffect(() => {
      const slidesContainer = slidesRef.current
      if (!slidesContainer) return

      const measureLayout = () => {
        const slides = slidesContainer.querySelectorAll<HTMLElement>(`.${styles.TestimonialGroup__slide}`)
        const tallest = Math.max(0, ...Array.from(slides, slide => slide.getBoundingClientRect().height))
        slidesContainer.style.minHeight = `${Math.ceil(tallest)}px`

        const controls = controlsRef.current
        if (!controls) return
        const quoteMark =
          testimonials[view.index]?.props.variant === 'expressive'
            ? slides[view.index].querySelector<HTMLElement>(`.${styles.TestimonialGroup__quoteMark}`)
            : null
        let inlineInset = 0
        if (quoteMark) {
          const slidesBounds = slidesContainer.getBoundingClientRect()
          const quoteBounds = quoteMark.getBoundingClientRect()
          inlineInset =
            getComputedStyle(slidesContainer).direction === 'rtl'
              ? slidesBounds.right - quoteBounds.right
              : quoteBounds.left - slidesBounds.left
        }
        controls.style.marginInlineStart = `${Math.max(0, inlineInset)}px`
      }
      measureLayout()
      const observer = new ResizeObserver(measureLayout)
      observer.observe(slidesContainer)
      for (const slide of slidesContainer.children) {
        observer.observe(slide)
      }
      return () => observer.disconnect()
    }, [testimonials, view.index])

    useEffect(() => {
      const root = rootRef.current
      if (!root || testimonials.length === 0) return
      let transitionTimer: ReturnType<typeof setTimeout> | undefined
      let announceOnCommit = false
      let current = viewRef.current
      const count = testimonials.length
      const updateView = (nextView: TestimonialGroupView) => {
        current = nextView
        viewRef.current = nextView
        setView(nextView)
      }
      const commit = () => {
        const nextIndex = current.targetIndex
        const changed = nextIndex !== current.index
        updateView({...current, index: nextIndex, phase: prefersReducedMotion ? 'idle' : 'in'})
        if (announceOnCommit) setAnnouncementIndex(nextIndex)
        announceOnCommit = false
        if (changed) onChangeRef.current?.(nextIndex)
        timer.reset()
      }
      const finishTransition = () => {
        transitionTimer = undefined
        updateView({...current, phase: 'idle'})
      }
      const changeTo = (nextIndex: number, manual = false) => {
        if (nextIndex < 0 || nextIndex >= count) return
        if (nextIndex === current.index && current.phase !== 'out') {
          if (manual) setAnnouncementIndex(nextIndex)
          return
        }
        timer.stop(true)
        announceOnCommit ||= manual
        const wasOutgoing = current.phase === 'out'
        updateView({...current, targetIndex: nextIndex})
        if (prefersReducedMotion) {
          clearTimeout(transitionTimer)
          commit()
          return
        }
        if (wasOutgoing) {
          if (nextIndex === current.index) {
            clearTimeout(transitionTimer)
            updateView({...current, phase: 'in'})
            if (announceOnCommit) setAnnouncementIndex(current.index)
            announceOnCommit = false
            timer.resume()
            transitionTimer = setTimeout(finishTransition, testimonialGroupTimings.fadeIn)
          }
          return
        }
        clearTimeout(transitionTimer)
        updateView({...current, phase: 'out'})
        transitionTimer = setTimeout(() => {
          commit()
          transitionTimer = setTimeout(finishTransition, testimonialGroupTimings.fadeIn)
        }, testimonialGroupTimings.fadeOut)
      }
      controller.current = {changeTo}
      if (current.index >= count || current.targetIndex >= count) {
        updateView({index: count - 1, targetIndex: count - 1, phase: 'idle'})
      } else if (current.phase !== 'idle') {
        commit()
      }
      return () => {
        clearTimeout(transitionTimer)
        controller.current = null
      }
    }, [autoPlay, prefersReducedMotion, testimonials.length, rootRef, timer])

    if (testimonials.length === 0) return null

    const announcedTestimonial = announcementIndex === null ? undefined : testimonials[announcementIndex]
    const announcedName =
      announcedTestimonial &&
      Children.toArray(announcedTestimonial.props.children).find(
        (child): child is React.ReactElement<{children?: React.ReactNode}> =>
          isValidElement(child) && child.type === Testimonial.Name,
      )?.props.children

    return (
      <div
        {...props}
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        data-testid={testId || testIds.root}
        className={clsx(styles.TestimonialGroup, className)}
        onFocusCapture={event => {
          onFocusCapture?.(event)
          if (!playbackRef.current?.contains(event.target)) setIsPaused(true)
        }}
      >
        <div
          className={clsx(
            styles.TestimonialGroup__content,
            testimonials.some(testimonial => testimonial.props.variant === 'expressive') &&
              styles['TestimonialGroup__content--expressive'],
          )}
        >
          {testimonials.length > 1 && (
            <div ref={controlsRef} className={styles.TestimonialGroup__controls}>
              {autoPlay && !prefersReducedMotion && (
                <IconButton
                  ref={playbackRef}
                  className={styles.TestimonialGroup__playback}
                  type="button"
                  rounded
                  size="small"
                  variant="secondary"
                  icon={
                    // TODO: Replace with the internal PlayIcon component when it becomes available
                    isPaused ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.3777 6.94756C14.2069 7.40341 14.2069 8.59489 13.3777 9.05073L5.37808 13.4483C4.57834 13.8879 3.60001 13.3093 3.60001 12.3967L3.60001 3.60161C3.60001 2.689 4.57834 2.1104 5.37808 2.55003L13.3777 6.94756Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      PauseIcon
                    )
                  }
                  aria-label={isPaused ? labels.controlsPlay : labels.controlsPause}
                  onClick={() => setIsPaused(paused => !paused)}
                />
              )}
              <CarouselPagination
                loop
                itemCount={testimonials.length}
                activeIndex={view.targetIndex}
                aria-label={`${ariaLabel} navigation`}
                labels={{
                  previous: labels.controlsPrev,
                  next: labels.controlsNext,
                  item: labels.indicator,
                }}
                onChange={index => controller.current?.changeTo(index, true)}
              />
            </div>
          )}
          <div ref={slidesRef} className={styles.TestimonialGroup__slides}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.key}
                className={clsx(
                  styles.TestimonialGroup__slide,
                  index === view.index && styles['TestimonialGroup__slide--active'],
                )}
                role="group"
                aria-roledescription="slide"
                aria-label={`${labels.testimonial} ${index + 1} ${labels.countSeparator} ${testimonials.length}`}
                aria-hidden={index !== view.index || undefined}
                inert={index !== view.index}
              >
                {cloneElement(testimonial, {
                  variant: testimonial.props.variant ?? 'minimal',
                  animate: undefined,
                  quoteMarkClassName: clsx(testimonial.props.quoteMarkClassName, styles.TestimonialGroup__quoteMark),
                  mediaClassName: clsx(testimonial.props.mediaClassName, styles.TestimonialGroup__media),
                  children: Children.map(testimonial.props.children, child => {
                    if (!isValidElement<{className?: string}>(child)) return child
                    if (child.type === Testimonial.Quote) {
                      return cloneElement(child, {
                        className: clsx(child.props.className, styles.TestimonialGroup__quote),
                      })
                    }
                    if (child.type === Testimonial.Avatar) {
                      return cloneElement(child, {
                        className: clsx(child.props.className, styles.TestimonialGroup__avatar),
                      })
                    }
                    return child
                  }),
                  className: clsx(
                    testimonial.props.className,
                    styles.TestimonialGroup__testimonial,
                    styles[`TestimonialGroup__testimonial--${index === view.index ? view.phase : 'out'}`],
                  ),
                })}
              </div>
            ))}
          </div>
        </div>
        <span className={styles.TestimonialGroup__announcement} role="status" aria-live="polite" aria-atomic="true">
          {announcementIndex !== null &&
            `${labels.testimonial} ${announcementIndex + 1} ${labels.countSeparator} ${testimonials.length}${
              typeof announcedName === 'string' ? `: ${announcedName}` : ''
            }`}
        </span>
      </div>
    )
  },
)

/**
 * Use TestimonialGroup to display a collection of testimonials in a carousel format.
 * @see https://primer.style/brand/components/TestimonialGroup/
 */
export const TestimonialGroup = Object.assign(Root, {testIds})
