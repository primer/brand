import React, {Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState} from 'react'
import {clsx} from 'clsx'
import {Testimonial, type TestimonialProps} from '../Testimonial'
import {CarouselPagination} from '../CarouselPagination'
import {useReducedMotion} from '../hooks/useReducedMotion'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import type {BaseProps} from '../component-helpers'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/testimonial-group/base.css'
import styles from './TestimonialGroup.module.css'

const testIds = {
  root: 'TestimonialGroup',
}

export type TestimonialGroupProps = BaseProps<HTMLDivElement> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    'data-testid'?: string
    /** Initial testimonial: 0 for the first, 1 for the second. */
    defaultActiveIndex?: number
    /** Called after a testimonial changes, with its index (first is 0). */
    onChange?: (activeIndex: number) => void
    /** Overrides accessible control labels and slide announcements. */
    labels?: {
      carousel?: string
      controlsPrev?: string
      controlsNext?: string
      controlsNavigation?: string
      carouselRoleDescription?: string
      slideRoleDescription?: string
      /** Complete selector label using {current} and {total}. */
      indicator?: string
      /** Complete slide label using {current} and {total}. */
      slide?: string
      /** Complete announcement using {current}, {total}, and {author}. */
      announcement?: string
    }
  }

type TestimonialGroupView = {index: number; targetIndex: number; phase: 'idle' | 'out' | 'in'}

const Root = forwardRef<HTMLDivElement, TestimonialGroupProps>(
  (
    {
      children,
      className,
      defaultActiveIndex = 0,
      onChange,
      labels: {
        carousel = 'Testimonials',
        controlsPrev = 'Previous testimonial',
        controlsNext = 'Next testimonial',
        controlsNavigation = '{carousel} navigation',
        carouselRoleDescription = 'carousel',
        slideRoleDescription = 'slide',
        indicator = 'Go to testimonial {current}',
        slide: slideLabel = 'Testimonial {current} of {total}',
        announcement: announcementLabel = 'Testimonial {current} of {total}: {author}',
      } = {},
      'aria-label': ariaLabel = carousel,
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
    const onChangeRef = useRef(onChange)
    const [announcementIndex, setAnnouncementIndex] = useState<number | null>(null)
    const prefersReducedMotion = useReducedMotion()
    const controller = useRef<{
      changeTo: (index: number) => void
      finishPhase: () => void
    } | null>(null)
    const formatLabel = (
      template: string,
      values: {current?: number; total?: number; author?: string; carousel?: string},
    ) =>
      template.replace(/\{(current|total|author|carousel)\}/g, (placeholder, name: keyof typeof values) =>
        String(values[name] ?? placeholder),
      )

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
      const slides = slidesRef.current?.children
      if (!slides) return

      for (const [index, slide] of Array.from(slides).entries()) {
        // Workaround to avoid React 18 / 19 type and rendering mismatches with the `inert` attribute.
        // TODO: Move back to JSX when React 19 is fully adopted in Dotcom.
        slide.toggleAttribute('inert', index !== view.index)
      }
    }, [testimonials.length, view.index])

    useEffect(() => {
      const root = rootRef.current
      if (!root || testimonials.length === 0) return
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
      }
      const changeTo = (nextIndex: number) => {
        if (nextIndex < 0 || nextIndex >= count) return
        if (nextIndex === current.index && current.phase !== 'out') {
          setAnnouncementIndex(nextIndex)
          return
        }
        announceOnCommit = true
        const wasOutgoing = current.phase === 'out'
        updateView({...current, targetIndex: nextIndex})
        if (prefersReducedMotion) {
          commit()
          return
        }
        if (wasOutgoing) {
          if (nextIndex === current.index) {
            updateView({...current, phase: 'in'})
            setAnnouncementIndex(current.index)
            announceOnCommit = false
          }
          return
        }
        updateView({...current, phase: 'out'})
      }
      controller.current = {
        changeTo,
        finishPhase: () => {
          if (current.phase === 'out') commit()
          else if (current.phase === 'in') updateView({...current, phase: 'idle'})
        },
      }
      if (current.index >= count || current.targetIndex >= count) {
        updateView({index: count - 1, targetIndex: count - 1, phase: 'idle'})
      } else if (current.phase !== 'idle') {
        commit()
      }
      return () => {
        controller.current = null
      }
    }, [prefersReducedMotion, testimonials.length, rootRef])

    useEffect(() => {
      if (view.phase === 'idle' || prefersReducedMotion) return
      const activeSlide = slidesRef.current?.children[view.index]
      if (!activeSlide) return
      const toMilliseconds = (value: string) => {
        const duration = Number.parseFloat(value)
        return Number.isFinite(duration) ? duration * (value.trim().endsWith('ms') ? 1 : 1000) : 0
      }
      let completionTime = 0
      const parts = activeSlide.querySelectorAll<HTMLElement>(
        [styles.TestimonialGroup__quoteMark, styles.TestimonialGroup__quote, styles.TestimonialGroup__media]
          .map(partClassName => `.${partClassName}`)
          .join(','),
      )
      for (const part of parts) {
        const computedStyle = getComputedStyle(part)
        const durations = computedStyle.transitionDuration.split(',').map(toMilliseconds)
        const delays = computedStyle.transitionDelay.split(',').map(toMilliseconds)
        for (const [index, property] of computedStyle.transitionProperty.split(',').entries()) {
          if (property.trim() !== 'opacity' && property.trim() !== 'all') continue
          completionTime = Math.max(completionTime, durations[index % durations.length] + delays[index % delays.length])
        }
      }
      const transitionTimer = setTimeout(() => controller.current?.finishPhase(), completionTime)
      return () => clearTimeout(transitionTimer)
    }, [prefersReducedMotion, view.index, view.phase])

    if (testimonials.length === 0) return null

    const announcedTestimonial = announcementIndex === null ? undefined : testimonials[announcementIndex]
    const announcedName =
      announcedTestimonial &&
      Children.toArray(announcedTestimonial.props.children).find(
        (child): child is React.ReactElement<{children?: React.ReactNode}> =>
          isValidElement(child) && child.type === Testimonial.Name,
      )?.props.children
    const hasAnnouncedName = typeof announcedName === 'string' && announcedName.trim().length > 0

    return (
      <div
        {...props}
        ref={rootRef}
        role="region"
        aria-roledescription={carouselRoleDescription}
        aria-label={ariaLabel}
        data-testid={testId || testIds.root}
        className={clsx(styles.TestimonialGroup, className)}
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
              <CarouselPagination
                loop
                itemCount={testimonials.length}
                activeIndex={view.targetIndex}
                aria-label={formatLabel(controlsNavigation, {carousel: ariaLabel})}
                labels={{
                  previous: controlsPrev,
                  next: controlsNext,
                }}
                itemAttributesBuilder={index => ({
                  'aria-label': formatLabel(indicator, {current: index + 1, total: testimonials.length}),
                })}
                onChange={index => controller.current?.changeTo(index)}
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
                aria-roledescription={slideRoleDescription}
                aria-label={formatLabel(slideLabel, {current: index + 1, total: testimonials.length})}
                aria-hidden={index !== view.index || undefined}
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
            announcedTestimonial &&
            formatLabel(hasAnnouncedName ? announcementLabel : slideLabel, {
              current: announcementIndex + 1,
              total: testimonials.length,
              author: hasAnnouncedName ? announcedName : undefined,
            })}
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
