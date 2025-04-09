import React, {createContext, forwardRef, useCallback, useContext, useMemo, useState} from 'react'
import clsx from 'clsx'
import {PlusIcon} from '@primer/octicons-react'

import {Heading, type HeadingProps, Link, Text} from '../..'
import styles from './RiverAccordion.module.css'
import {useProvidedRefOrCreate} from '../../hooks/useRef'
import {useId} from '../../hooks/useId'

type RiverAccordionContextType = {
  openIndex: number
  setOpenIndex: (index: number) => void
}

const RiverAccordionContext = createContext<RiverAccordionContextType | null>(null)

const useRiverAccordionContext = (): RiverAccordionContextType => {
  const context = useContext(RiverAccordionContext)
  if (context === null) {
    throw new Error('useRiverAccordionContext must be used within a RiverAccordion component')
  }
  return context
}

type RiverAccordionItemContextType = {
  index: number
  isOpen: boolean
  id: string
}

const RiverAccordionItemContext = createContext<RiverAccordionItemContextType | null>(null)

const useRiverAccordionItemContext = (): RiverAccordionItemContextType => {
  const context = useContext(RiverAccordionItemContext)
  if (context === null) {
    throw new Error('useRiverAccordionItemContext must be used within a RiverAccordion component')
  }
  return context
}

export type RiverAccordionProps = React.PropsWithChildren<{
  align?: 'start' | 'end'
}> &
  React.HTMLAttributes<HTMLDivElement>

const RiverAccordionRoot = forwardRef<HTMLDivElement, RiverAccordionProps>(
  ({align = 'start', children, className, ...rest}, forwardedRef) => {
    const containerRef = useProvidedRefOrCreate<HTMLDivElement>(forwardedRef as React.RefObject<HTMLDivElement>)
    const [openIndex, setOpenIndex] = useState(0)

    const accordionComponents = useMemo(() => {
      return React.Children.toArray(children).reduce<{
        items: React.ReactElement<RiverAccordionItemProps>[]
        visuals: React.ReactElement<RiverAccordionVisualProps>[]
      }>(
        (acc, child) => {
          if (!isRiverAccordionItem(child)) {
            return acc
          }

          const visualChild = React.Children.toArray(child.props.children).find(isRiverAccordionVisual)

          if (visualChild) {
            acc.items.push(child)
            acc.visuals.push(visualChild)
          }

          return acc
        },
        {items: [], visuals: []},
      )
    }, [children])

    const items = accordionComponents.items.map((item, index) => React.cloneElement(item, {key: index, index}))
    const visuals = accordionComponents.visuals.map((visual, index) =>
      React.cloneElement(visual, {key: index, 'aria-hidden': true}),
    )

    const contextValue = useMemo(
      () => ({
        openIndex,
        setOpenIndex,
      }),
      [openIndex, setOpenIndex],
    )

    return (
      <RiverAccordionContext.Provider value={contextValue}>
        <div
          ref={containerRef}
          className={clsx(styles.RiverAccordion, styles[`RiverAccordion__align-${align}`], className)}
          {...rest}
        >
          <div className={styles.RiverAccordion__accordionContainer}>{items}</div>
          <div className={styles.RiverAccordion__visualsContainer}>
            <div className={styles.RiverAccordion__visualsWrapper}>{visuals}</div>
          </div>
        </div>
      </RiverAccordionContext.Provider>
    )
  },
)

export type RiverAccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement<RiverAccordionHeadingProps | RiverAccordionContentProps>[]
  index?: number
}

const RiverAccordionItem = ({className, index, children, ...props}: RiverAccordionItemProps) => {
  const {openIndex} = useRiverAccordionContext()
  const panelId = useId()
  const isOpen = index === openIndex

  const itemContextValue = useMemo(
    () => ({
      id: panelId,
      // Index optional for consumers, but always provided by parent
      index: index as number,
      isOpen,
    }),
    [panelId, index, isOpen],
  )

  const {heading, content, visual} = useMemo(() => {
    return React.Children.toArray(children).reduce<{
      heading: React.ReactElement<RiverAccordionHeadingProps> | null
      content: React.ReactElement<RiverAccordionContentProps> | null
      visual: React.ReactElement<RiverAccordionVisualProps> | null
    }>(
      (acc, child) => {
        if (isRiverAccordionHeading(child)) {
          acc.heading = child
        }

        if (isRiverAccordionContent(child)) {
          acc.content = child
        }

        if (isRiverAccordionVisual(child)) {
          acc.visual = child
        }

        return acc
      },
      {heading: null, content: null, visual: null},
    )
  }, [children])

  if (!heading || !content || !visual) {
    return null
  }

  return (
    <RiverAccordionItemContext.Provider value={itemContextValue}>
      <div
        className={clsx(styles.RiverAccordion__item, isOpen && styles['RiverAccordion__item--open'], className)}
        {...props}
      >
        {heading}
        <div
          className={styles.RiverAccordion__panel}
          id={panelId}
          aria-hidden={!isOpen}
          {...(!isOpen && {inert: 'true'})}
        >
          {content}
          {visual}
        </div>
      </div>
    </RiverAccordionItemContext.Provider>
  )
}

export type RiverAccordionHeadingProps = HeadingProps

const RiverAccordionHeading = ({className, children, ...props}: RiverAccordionHeadingProps) => {
  const {setOpenIndex} = useRiverAccordionContext()
  const {id, index, isOpen} = useRiverAccordionItemContext()

  const onClick = useCallback(() => {
    if (!isOpen) {
      setOpenIndex(index)
    }
  }, [index, isOpen, setOpenIndex])

  return (
    <Heading size="6" as="h3" className={clsx(styles.RiverAccordion__heading, className)} {...props}>
      <button
        type="button"
        className={styles.RiverAccordion__trigger}
        onClick={onClick}
        aria-disabled={isOpen}
        aria-controls={id}
        aria-expanded={isOpen}
      >
        {children}
        <PlusIcon size={24} className={styles.RiverAccordion__icon} />
      </button>
    </Heading>
  )
}

export type RiverAccordionContentProps = React.HTMLAttributes<HTMLDivElement>

const RiverAccordionContent = ({className, children, ...props}: RiverAccordionContentProps) => {
  const childrenWithStyledText = useMemo(() => {
    const isLink = createComponentTypeGuard(Link)
    const isText = createComponentTypeGuard(Text)

    return React.Children.toArray(children).map(child => {
      if (isText(child)) {
        return React.cloneElement(child, {
          as: child.props.as ?? 'p',
          variant: child.props.variant ?? 'muted',
          weight: child.props.weight ?? 'medium',
          size: child.props.size ?? '200',
        })
      }

      if (isLink(child)) {
        return React.cloneElement(child, {
          variant: child.props.variant ?? 'accent',
        })
      }

      return child
    })
  }, [children])

  return (
    <div className={clsx(styles.RiverAccordion__content, className)} {...props}>
      {childrenWithStyledText}
    </div>
  )
}

export type RiverAccordionVisualProps = React.HTMLAttributes<HTMLDivElement>

const RiverAccordionVisual = ({className, ...props}: RiverAccordionVisualProps) => {
  return <div className={clsx(styles.RiverAccordion__visual, className)} {...props} />
}

const createComponentTypeGuard =
  <T,>(componentType: React.ComponentType<T>) =>
  (element: unknown): element is React.ReactElement<T> =>
    React.isValidElement(element) && element.type === componentType

const isRiverAccordionItem = createComponentTypeGuard(RiverAccordionItem)
const isRiverAccordionContent = createComponentTypeGuard(RiverAccordionContent)
const isRiverAccordionHeading = createComponentTypeGuard(RiverAccordionHeading)
const isRiverAccordionVisual = createComponentTypeGuard(RiverAccordionVisual)

/**
 * Use the RiverAccordion to create collapsible content panels with associated visuals.
 * @see https://primer.style/brand/components/RiverAccordion
 */
export const RiverAccordion = Object.assign(RiverAccordionRoot, {
  Content: RiverAccordionContent,
  Heading: RiverAccordionHeading,
  Item: RiverAccordionItem,
  Visual: RiverAccordionVisual,
})
