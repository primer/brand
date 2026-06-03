import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type DetailsHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type RefObject,
  type ToggleEvent,
} from 'react'
import {clsx} from 'clsx'

import {Heading, type HeadingProps} from '../'
import {Colors, BiColorGradients as Gradients} from '../constants'
import {useProvidedRefOrCreate} from '../hooks/useRef'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/accordion/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Accordion.module.css'

export type AccordionRootProps = DetailsHTMLAttributes<HTMLDetailsElement> & {
  children: ReactElement<AccordionHeadingProps | AccordionContentProps>[]
  variant?: 'default' | 'emphasis'
  disableAnimation?: boolean
  handleOpen?: (isOpen: boolean) => void
}

type AccordionContextType = {
  variant: 'default' | 'emphasis'
}

const AccordionContext = createContext<AccordionContextType | null>(null)

const useAccordionContext = (): AccordionContextType => {
  const context = useContext(AccordionContext)

  if (context === null) {
    throw new Error('Unable to find Accordion provider. Did you forget to wrap your component in an Accordion?')
  }

  return context
}

export const AccordionRoot = forwardRef<HTMLDetailsElement, AccordionRootProps>(
  (
    {
      children,
      className,
      variant = 'default',
      disableAnimation = false,
      open,
      onToggle,
      onKeyDown,
      handleOpen,
      ...rest
    },
    forwardedRef,
  ) => {
    const ref = useProvidedRefOrCreate(forwardedRef as RefObject<HTMLDetailsElement | null>)
    const closeAnimationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isClosingRef = useRef(false)
    const accordionContextValue = useMemo(() => ({variant}), [variant])

    const setContentHeight = useCallback((details: HTMLDetailsElement) => {
      const content = details.querySelector<HTMLElement>(`:scope > .${styles.Accordion__content}`)
      const contentInner = content?.querySelector<HTMLElement>(`.${styles['Accordion__content-inner']}`)

      if (!content || !contentInner) {
        return null
      }

      const contentOffset = parseFloat(getComputedStyle(content).getPropertyValue('--brand-Accordion-content-offset'))
      const contentHeight = Math.max(0, contentInner.scrollHeight - (Number.isNaN(contentOffset) ? 0 : contentOffset))

      details.style.setProperty('--brand-Accordion-content-height', `${contentHeight}px`)

      return content
    }, [])

    const clearCloseAnimation = useCallback(() => {
      if (closeAnimationTimeout.current) {
        clearTimeout(closeAnimationTimeout.current)
        closeAnimationTimeout.current = null
      }
    }, [])

    const closeWithAnimation = useCallback(
      (details: HTMLDetailsElement) => {
        clearCloseAnimation()
        const content = setContentHeight(details)

        if (content) {
          content.getBoundingClientRect()
        }

        isClosingRef.current = true
        details.classList.add(styles['Accordion--closing'])

        closeAnimationTimeout.current = setTimeout(() => {
          details.open = false
          isClosingRef.current = false
          details.classList.remove(styles['Accordion--closing'])
          closeAnimationTimeout.current = null
        }, 400)
      },
      [clearCloseAnimation, setContentHeight],
    )

    const handleToggle = useCallback<(event: Event) => void>(
      event => {
        const toggleEvent = event as unknown as ToggleEvent<HTMLDetailsElement>
        if (toggleEvent.currentTarget.open) {
          clearCloseAnimation()
          isClosingRef.current = false
          toggleEvent.currentTarget.classList.remove(styles['Accordion--closing'])
          setContentHeight(toggleEvent.currentTarget)
        }
        onToggle?.(toggleEvent)
        handleOpen?.(toggleEvent.currentTarget.open)
      },
      [clearCloseAnimation, onToggle, handleOpen, setContentHeight],
    )

    const handleClick = useCallback<EventListener>(
      event => {
        const details = ref.current
        const target = event.target

        if (!(target instanceof Element) || !details?.open || disableAnimation) {
          return
        }

        const summary = target.closest('summary')

        if (summary?.parentElement === details) {
          event.preventDefault()

          if (!isClosingRef.current) {
            closeWithAnimation(details)
          }
        }
      },
      [closeWithAnimation, disableAnimation, ref],
    )

    const handleKeyDown = useCallback<EventListener>(
      event => {
        const keyboardEvent = event as unknown as KeyboardEvent<HTMLDetailsElement>
        onKeyDown?.(keyboardEvent)

        const details = ref.current

        if (keyboardEvent.key === 'Escape' && details?.open) {
          clearCloseAnimation()
          details.open = false
          isClosingRef.current = false
          details.classList.remove(styles['Accordion--closing'])
          details.querySelector('summary')?.focus()
        }
      },
      [clearCloseAnimation, onKeyDown, ref],
    )

    useEffect(() => {
      const detailsElement = ref.current
      if (detailsElement) {
        const contentInner = detailsElement.querySelector<HTMLElement>(`.${styles['Accordion__content-inner']}`)
        let resizeObserver: ResizeObserver | undefined

        if (detailsElement.open) {
          setContentHeight(detailsElement)
        }

        if (typeof ResizeObserver !== 'undefined' && contentInner) {
          resizeObserver = new ResizeObserver(() => {
            if (detailsElement.open) {
              setContentHeight(detailsElement)
            }
          })
          resizeObserver.observe(contentInner)
        }

        detailsElement.addEventListener('toggle', handleToggle)
        detailsElement.addEventListener('click', handleClick)
        detailsElement.addEventListener('keydown', handleKeyDown)

        return () => {
          clearCloseAnimation()
          resizeObserver?.disconnect()
          detailsElement.removeEventListener('toggle', handleToggle)
          detailsElement.removeEventListener('click', handleClick)
          detailsElement.removeEventListener('keydown', handleKeyDown)
        }
      }
    }, [clearCloseAnimation, handleClick, handleToggle, handleKeyDown, ref, setContentHeight])

    return (
      <AccordionContext.Provider value={accordionContextValue}>
        <details
          className={clsx(
            styles.Accordion,
            styles[`Accordion--${variant}`],
            disableAnimation && styles['Accordion--disableAnimation'],
            className,
          )}
          ref={ref}
          open={open}
          {...rest}
        >
          {children}
        </details>
      </AccordionContext.Provider>
    )
  },
)

export const AccordionToggleColors = [...Colors, ...Gradients] as const

export type AccordionHeadingProps = HTMLAttributes<HTMLElement> & {
  as?: HeadingProps['as']
  reversedToggles?: boolean
  toggleColor?: (typeof AccordionToggleColors)[number]
  weight?: HeadingProps['weight']
}

/**
 * TODO This type is incorrect
 * The ref is applied to the summary, not the heading, so the correct type is
 * `forwardRef<HTMLElement, AccordionHeadingProps>`
 */
export const AccordionHeading = forwardRef<HTMLHeadingElement, AccordionHeadingProps>(
  ({children, className, as = 'h4', toggleColor, reversedToggles, weight = 'normal', ...rest}, ref) => {
    const {variant} = useAccordionContext()

    return (
      <summary
        className={clsx(
          styles.Accordion__summary,
          reversedToggles && styles['Accordion__summary--reversed-toggles'],
          styles[`Accordion__summary--${variant}`],
          toggleColor && styles[`Accordion__summary--toggleColor-${toggleColor}`],
          className,
        )}
        ref={ref}
        {...rest}
      >
        <span aria-hidden="true" className={styles['Accordion__summary-toggle']}>
          {/* This is a custom icon that animates a line into an active down chevron */}
          <svg
            className={styles['Accordion__summary-toggleIcon']}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            focusable="false"
          >
            <line
              className={clsx(styles['Accordion__summary-toggleLine'], styles['Accordion__summary-toggleLine--start'])}
              x1="4"
              y1="12"
              x2="12"
              y2="12"
            />
            <line
              className={clsx(styles['Accordion__summary-toggleLine'], styles['Accordion__summary-toggleLine--end'])}
              x1="12"
              y1="12"
              x2="20"
              y2="12"
            />
          </svg>
        </span>
        <Heading as={as} size={variant === 'emphasis' ? '6' : 'subhead-large'} weight={weight}>
          {children}
        </Heading>
      </summary>
    )
  },
)

export type AccordionContentProps = HTMLAttributes<HTMLElement>

export const AccordionContent = ({children, className, ...rest}: AccordionContentProps) => (
  <section className={clsx(styles.Accordion__content, className)} {...rest}>
    <div className={styles['Accordion__content-inner']}>{children}</div>
  </section>
)

export const Accordion = Object.assign(AccordionRoot, {Content: AccordionContent, Heading: AccordionHeading})
