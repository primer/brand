import React, {isValidElement, useEffect, useRef, useState, type PropsWithChildren} from 'react'
import clsx from 'clsx'

import {Accordion, River} from '../../'

import styles from './RiverAccordion.module.css'
import sharedStyles from '../river-shared.module.css'

type RiverAccordionProps = PropsWithChildren<{
  align?: 'start' | 'end'
}>

type RiverElements = {
  content: HTMLDivElement
  visual: HTMLDivElement
  heading: HTMLHeadingElement
}

export const RiverAccordion = ({children, align}: RiverAccordionProps) => {
  const [openIndex, setOpenIndex] = useState(0)
  const [riversElements, setRiversElements] = useState<RiverElements[]>([])
  const riversContainerRef = useRef<HTMLDivElement>(null)

  const riverChildren = React.Children.toArray(children).filter(child => isValidElement(child) && child.type === River)

  useEffect(() => {
    const riversContainer = riversContainerRef.current
    if (!riversContainer) return

    const rivers: RiverElements[] = Array.from(riversContainer.children).flatMap(river => {
      const content = river.querySelector<HTMLDivElement>('[data-pb-type="river-content"]')
      const visual = river.querySelector<HTMLDivElement>('[data-pb-type="river-visual"]')
      const heading = river.querySelector<HTMLHeadingElement>('h1,h2,h3,h4,h5,h6')

      if (!content || !visual || !heading) return []

      content.querySelector<HTMLHeadingElement>('h1,h2,h3,h4,h5,h6')?.remove()

      return {content, heading, visual}
    })

    setRiversElements(rivers)

    // Clear the rivers container now that we have the elements
    riversContainer.replaceChildren()
  }, [riversContainerRef])

  return (
    <>
      {/* Render the river children in a hidden container so that the content can be extracted */}
      <div className="visually-hidden" aria-hidden="true" ref={riversContainerRef}>
        {riverChildren}
      </div>

      {riversElements.map(({content, heading}, index) => {
        if (index !== 0) return
        return (
          <Accordion key={index} open={index === openIndex}>
            <Accordion.Heading>{heading.textContent}</Accordion.Heading>
            <Accordion.Content>
              {/* eslint-disable-next-line github/no-inner-html */}
              <div dangerouslySetInnerHTML={{__html: content.innerHTML}} />
            </Accordion.Content>
          </Accordion>
        )
      })}
    </>
  )
}
