import React, {forwardRef, PropsWithChildren, useCallback, useEffect, useRef} from 'react'
import clsx from 'clsx'

import {Heading} from '../'
import type {BaseProps} from '../component-helpers'
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react'
import {Colors, Gradients} from '../constants'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/accordion/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Accordion.module.css'
import {useProvidedRefOrCreate} from '../hooks/useRef'

export type AccordionRootProps = BaseProps<HTMLDetailsElement> & {
  open?: boolean // Manually declared due to known issue with the native open attribute: https://github.com/facebook/react/issues/15486
  children: React.ReactElement<AccordionHeadingProps | AccordionContentProps>[]
  variant?: 'default' | 'emphasis'
  ref?: React.RefObject<HTMLDetailsElement>
  handleOpen?: (boolean) => void
} & React.HTMLAttributes<HTMLDetailsElement>

type ValidRootChildren = {
  AccordionHeading: React.ReactElement<AccordionHeadingProps> | null
  AccordionContent: React.ReactElement<AccordionContentProps> | null
}

export const AccordionRoot = forwardRef<HTMLDetailsElement, AccordionRootProps>(
  ({children, className, open = false, variant = 'default', handleOpen, ...rest}, ref) => {
    const detailsRef = useProvidedRefOrCreate(ref as React.RefObject<HTMLDetailsElement>)
    const [isOpen, setIsOpen] = React.useState(open)

    const {AccordionHeading: HeadingChild, AccordionContent: AccordionContentChild} = React.Children.toArray(
      children,
    ).reduce<ValidRootChildren>(
      (acc, child) => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === AccordionContent) {
            acc.AccordionContent = React.cloneElement(child as React.ReactElement<AccordionContentProps>, {
              open: isOpen,
              handleOpen: (newValue: boolean) => {
                setIsOpen(newValue)
              },
              parentRef: detailsRef,
            }) as React.ReactElement<AccordionContentProps>
          }
          if (child.type === AccordionHeading) {
            acc.AccordionHeading = React.cloneElement(child as React.ReactElement, {
              variant,
              open: isOpen,
              handleOpen: (newValue: boolean) => {
                if (handleOpen) {
                  handleOpen(newValue)
                }
                setIsOpen(newValue)
              },
              parentRef: detailsRef,
            }) as React.ReactElement<AccordionHeadingProps>
          }
        }
        return acc
      },
      {AccordionHeading: null, AccordionContent: null},
    )

    useEffect(() => {
      setIsOpen(open)
    }, [open])

    return (
      <details
        className={clsx(styles.Accordion, styles[`Accordion--${variant}`], className)}
        open={isOpen}
        {...rest}
        ref={detailsRef}
      >
        {HeadingChild}
        {AccordionContentChild}
      </details>
    )
  },
)

export const AccordionToggleColors = [...Colors, ...Gradients] as const

type AccordionHeadingProps = PropsWithChildren<BaseProps<HTMLHeadingElement>> &
  React.HTMLAttributes<HTMLDetailsElement> & {
    className?: string
    as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    reversedToggles?: boolean
    variant?: 'default' | 'emphasis'
    open?: boolean // private prop passed from AccordionRoot
    handleOpen?: (boolean) => void // private prop passed from AccordionRoot
    parentRef?: React.RefObject<HTMLDetailsElement> // private prop passed from AccordionRoot
    toggleColor?: (typeof AccordionToggleColors)[number]
  }

export const AccordionHeading = forwardRef<HTMLHeadingElement, AccordionHeadingProps>(
  (
    {
      children,
      className,
      as = 'h4',
      variant = 'default',
      toggleColor,
      reversedToggles,
      open,
      handleOpen,
      parentRef,
      style,
      ...rest
    },
    ref,
  ) => {
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDetailsElement, MouseEvent>) => {
        event.preventDefault()

        if (handleOpen) {
          handleOpen(!open)
        }
      },
      [handleOpen, open],
    )

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLDetailsElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          if (handleOpen) handleOpen(!open)
        }

        if (event.key === 'Escape') {
          event.preventDefault()
          if (handleOpen) handleOpen(false)
        }
      },
      [handleOpen, open],
    )

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
        onClick={handleClick}
        onKeyDown={handleKeyPress}
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

type AccordionContentProps = BaseProps<HTMLElement> & {
  children: React.ReactElement | React.ReactElement[]
  open?: boolean // private prop passed from AccordionRoot
  handleOpen?: (boolean) => void // private prop passed from AccordionRoot
  parentRef?: React.RefObject<HTMLDetailsElement> // private prop passed from AccordionRoot
}

export function AccordionContent({children, className, open, handleOpen, parentRef, ...rest}: AccordionContentProps) {
  const contentRef = useRef<HTMLElement>(null)

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        const focusedElement = document.activeElement
        if (contentRef.current && contentRef.current.contains(focusedElement)) {
          // Close the accordion
          if (handleOpen) handleOpen(false)
          if (parentRef?.current) {
            const summary = parentRef.current.querySelector('summary')
            if (summary) summary.focus()
          }
        }
      }
    },
    [parentRef, handleOpen],
  )

  useEffect(() => {
    const contentEl = contentRef.current as HTMLElement | null

    if (open && contentEl) {
      contentEl.addEventListener('keydown', ev => handleKeyPress(ev))
    }
    return () => {
      if (open && contentEl) {
        contentEl.removeEventListener('keydown', ev => handleKeyPress(ev))
      }
    }
  }, [open, handleKeyPress])

  return (
    <section className={clsx(styles.Accordion__content, className)} {...rest} ref={contentRef}>
      {children}
    </section>
  )
}

/**
 * Branded Accordion component
 */
export const Accordion = Object.assign(AccordionRoot, {Content: AccordionContent, Heading: AccordionHeading})
