import React, {forwardRef, useEffect, useId, type HTMLAttributes, type PropsWithChildren} from 'react'
import clsx from 'clsx'

import {Accordion} from '../../'
import {
  RiverAccordionProvider,
  RiverAccordionItemProvider,
  useRiverAccordionContext,
  useRiverAccordionItemContext,
  type RiverContentData,
  type RiverVisualData,
  type RiverHeadingData,
} from './RiverAccordion.provider'

import styles from './RiverAccordion.module.css'

export type RiverAccordionProps = PropsWithChildren<{
  align?: 'start' | 'end'
}> &
  HTMLAttributes<HTMLDivElement>

const Root = forwardRef<HTMLDivElement, RiverAccordionProps>(({align, children, ...rest}, forwardedRef) => {
  return (
    <RiverAccordionProvider align={align}>
      <div aria-hidden className="visually-hidden">
        {children}
      </div>
      <div ref={forwardedRef} className={clsx(styles['RiverAccordion'])} {...rest}>
        <AccordionRenderer />
        <VisualRenderer />
      </div>
    </RiverAccordionProvider>
  )
})

const AccordionRenderer = () => {
  const {visuals, headings, contents, expandedId, setExpandedId} = useRiverAccordionContext()

  const itemIds = Array.from(new Set([...visuals.keys(), ...headings.keys(), ...contents.keys()])).sort()

  useEffect(() => {
    if (!expandedId) {
      setExpandedId(itemIds[0])
    }
  }, [expandedId, itemIds, setExpandedId])

  return itemIds.map(itemId => {
    const heading = headings.get(itemId)
    const content = contents.get(itemId)
    const visual = visuals.get(itemId)

    if (!heading || !content || !visual) return

    return (
      <Accordion
        key={itemId}
        open={itemId === expandedId}
        handleOpen={isOpen => {
          if (isOpen) {
            setExpandedId(itemId)
          }
          if (!isOpen && itemId === expandedId) {
            return
          }
        }}
      >
        <Accordion.Heading {...heading.props} />
        <Accordion.Content {...content.props} />
      </Accordion>
    )
  })
}

const VisualRenderer = () => {
  const {visuals, expandedId} = useRiverAccordionContext()

  if (!expandedId) return null

  const visual = visuals.get(expandedId)
  if (!visual) return null

  const {alt, ...props} = visual.props
  return <img key={visual.id} alt={alt} {...props} />
}

const Item = ({children}) => {
  const itemId = useId()

  return <RiverAccordionItemProvider itemId={itemId}>{children}</RiverAccordionItemProvider>
}

const Heading = (props: RiverHeadingData['props']) => {
  const {itemId} = useRiverAccordionItemContext()
  const {registerHeading, unregisterHeading} = useRiverAccordionContext()

  useEffect(() => {
    registerHeading({
      type: 'heading',
      id: itemId,
      props,
    })

    return () => {
      unregisterHeading(itemId)
    }
  }, [itemId, props, registerHeading, unregisterHeading])

  return null
}

const Visual = (props: RiverVisualData['props']) => {
  const {itemId} = useRiverAccordionItemContext()
  const {registerVisual, unregisterVisual} = useRiverAccordionContext()

  useEffect(() => {
    registerVisual({
      type: 'image',
      id: itemId,
      props,
    })

    return () => {
      unregisterVisual(itemId)
    }
  }, [itemId, registerVisual, unregisterVisual, props])

  return null
}

const Content = (props: RiverContentData['props']) => {
  const {itemId} = useRiverAccordionItemContext()
  const {registerContent, unregisterContent} = useRiverAccordionContext()

  useEffect(() => {
    registerContent({
      type: 'content',
      id: itemId,
      props,
    })

    return () => {
      unregisterContent(itemId)
    }
  }, [itemId, props, registerContent, unregisterContent])

  return null
}

export const RiverAccordion = Object.assign(Root, {
  Content,
  Heading,
  Item,
  Visual,
})
