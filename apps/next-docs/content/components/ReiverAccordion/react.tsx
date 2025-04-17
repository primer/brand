'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const RiverAccordionChildrenProp = () => (
  <PropTableValues values={[<a href="#riveraccordionitem-required">RiverAccordion.Item[]</a>]} addLineBreaks />
)

export const RiverAccordionAlignProp = () => <PropTableValues values={['start', 'end']} addLineBreaks />

export const RiverAccordionItemChildrenProp = () => (
  <PropTableValues
    values={[
      <a href="#riveraccordionheading-required">RiverAccordion.Heading</a>,
      <a href="#riveraccordioncontent-required">RiverAccordion.Content</a>,
      <a href="#riveraccordionvisual-required">RiverAccordion.Visual</a>,
    ]}
    addLineBreaks
  />
)
