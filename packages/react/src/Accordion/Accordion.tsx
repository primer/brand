import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  type DetailsHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type RefObject,
  type SyntheticEvent,
} from 'react'
import clsx from 'clsx'

import {Heading, type HeadingProps} from '../'
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react'
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
  ({className, variant = 'default', open, onToggle, onKeyDown, handleOpen, ...rest}, forwardedRef) => {
    const ref = useProvidedRefOrCreate(forwardedRef as RefObject<HTMLDetailsElement>)
    const accordionContextValue = useMemo(() => ({variant}), [variant])

    const handleToggle = useCallback<(event: Event) => void>(
      event => {
        const toggleEvent = event as unknown as SyntheticEvent<HTMLDetailsElement>
        onToggle?.(toggleEvent)
        handleOpen?.(toggleEvent.currentTarget.open)
      },
      [onToggle, handleOpen],
    )

    const handleKeyDown = useCallback<EventListener>(
      event => {
        const keyboardEvent = event as unknown as KeyboardEvent<HTMLDetailsElement>
        onKeyDown?.(keyboardEvent)

        const details = ref.current

        if (keyboardEvent.key === 'Escape' && details?.open) {
          details.open = false
          details.querySelector('summary')?.focus()
        }
      },
      [onKeyDown, ref],
    )

    useEffect(() => {
      const detailsElement = ref.current
      // This can't practically be tested, so ignoring it from coverage
      /* istanbul ignore next */
      if (!detailsElement) return

      detailsElement.addEventListener('toggle', handleToggle)
      detailsElement.addEventListener('keydown', handleKeyDown)

      return () => {
        detailsElement.removeEventListener('toggle', handleToggle)
        detailsElement.removeEventListener('keydown', handleKeyDown)
      }
    }, [handleToggle, handleKeyDown, ref])

    return (
      <AccordionContext.Provider value={accordionContextValue}>
        <details
          className={clsx(styles.Accordion, styles[`Accordion--${variant}`], className)}
          ref={ref}
          open={open}
          {...rest}
        />
      </AccordionContext.Provider>
    )
  },
)

export const AccordionToggleColors = [...Colors, ...Gradients] as const

export type AccordionHeadingProps = HTMLAttributes<HTMLElement> & {
  as?: HeadingProps['as']
  reversedToggles?: boolean
  toggleColor?: (typeof AccordionToggleColors)[number]
}

export const AccordionHeading = forwardRef<HTMLHeadingElement, AccordionHeadingProps>(
  ({children, className, as = 'h4', toggleColor, reversedToggles, ...rest}, ref) => {
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
        <span aria-hidden="true" className={styles['Accordion__summary--collapsed']}>
          {variant === 'emphasis' && <ChevronDownIcon size={24} fill="var(--brand-color-text-default)" />}
        </span>
        <Heading as={as} size={variant === 'emphasis' ? '6' : 'subhead-large'}>
          {children}
        </Heading>
        <span aria-hidden="true" className={styles['Accordion__summary--expanded']}>
          {variant === 'emphasis' && <ChevronUpIcon size={24} fill="var(--brand-color-text-default)" />}
        </span>
      </summary>
    )
  },
)

export type AccordionContentProps = HTMLAttributes<HTMLElement>

export const AccordionContent = ({className, ...rest}: AccordionContentProps) => (
  <section className={clsx(styles.Accordion__content, className)} {...rest} />
)

export const Accordion = Object.assign(AccordionRoot, {Content: AccordionContent, Heading: AccordionHeading})
