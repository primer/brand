'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {HeadingTags} from '../../../../../packages/react/src/Heading/Heading'
import {AccordionToggleColors} from '../../../../../packages/react/src/Accordion/Accordion'

// TODO Fix missing key prop error
export const FAQChildrenProp = () => (
  <PropTableValues
    values={[
      <a href="#faq-heading">FAQ.Heading</a>,
      <a href="#faq-subheading">FAQ.Subheading</a>,
      <a href="#faq-item">FAQ.Item</a>,
    ]}
    addLineBreaks
  />
)

export const FAQHeadingAlignProp = () => <PropTableValues values={['start', 'center']} addLineBreaks />
export const FAQHeadingSizeProp = () => <PropTableValues values={['medium', 'large']} addLineBreaks />
export const FAQHeadingAsProp = () => <PropTableValues values={[...HeadingTags]} addLineBreaks />
export const FAQHeadingToggleColorProp = () => <PropTableValues values={AccordionToggleColors} addLineBreaks />
export const FAQSubheadingAsProp = () => <PropTableValues values={HeadingTags.slice(1)} addLineBreaks />
export const FAQQuestionAsProp = () => <PropTableValues values={HeadingTags.slice(1)} addLineBreaks />

export const FAQGroupChildrenProp = () => (
  <PropTableValues
    values={[<a href="#faq-required">FAQ</a>, <a href="#faqgroup-heading">FAQGroup.Heading</a>]}
    addLineBreaks
  />
)

export const FAQItemChildrenProp = () => (
  <PropTableValues
    values={[<a href="#faq-question">FAQ.Question</a>, <a href="#faq-answer">FAQ.Answer</a>]}
    addLineBreaks
  />
)

export const FAQGroupHeadingAsProp = () => <PropTableValues values={HeadingTags} addLineBreaks />
