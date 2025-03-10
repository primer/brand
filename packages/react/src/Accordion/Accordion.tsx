import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  type DetailsHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type RefObject,
} from 'react'
import clsx from 'clsx'

import {Heading, type HeadingProps} from '../'
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react'
import {Colors, BiColorGradients as Gradients} from '../constants'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/accordion/colors-with-modes.css'

import styles from './Accordion.module.css'
import {useProvidedRefOrCreate} from '../hooks/useRef'

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
  (
    {className, variant = 'default', open, onToggle: _onToggle, onKeyDown: _onKeyDown, handleOpen, ...rest},
    forwardedRef,
  ) => {
    const ref = useProvidedRefOrCreate(forwardedRef as RefObject<HTMLDetailsElement>)
    const accordionContextValue = useMemo(() => ({variant}), [variant])

    const onToggle = useCallback<NonNullable<AccordionRootProps['onToggle']>>(
      event => {
        _onToggle?.(event)
        handleOpen?.(event.currentTarget.open)
      },
      [_onToggle, handleOpen],
    )

    const onKeyDown = useCallback<NonNullable<AccordionRootProps['onKeyDown']>>(
      event => {
        _onKeyDown?.(event)

        const details = ref.current

        if (event.key === 'Escape' && details?.open) {
          details.open = false
          details.querySelector('summary')?.focus()
        }
      },
      [_onKeyDown, ref],
    )

    return (
      <AccordionContext.Provider value={accordionContextValue}>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <details
          className={clsx(styles.Accordion, styles[`Accordion--${variant}`], className)}
          ref={ref}
          onToggle={onToggle}
          onKeyDown={onKeyDown}
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
