'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const RiverAccordionChildrenProp = () => <PropTableValues values={[`RiverAccordion.Item[]`]} addLineBreaks />

export const RiverAccordionAlignProp = () => <PropTableValues values={['start', 'end']} addLineBreaks />

export const RiverAccordionItemChildrenProp = () => (
  <PropTableValues
    values={[`RiverAccordion.Heading`, `RiverAccordion.Content`, `RiverAccordion.Visual`]}
    addLineBreaks
  />
)
