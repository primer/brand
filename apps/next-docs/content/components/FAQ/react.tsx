'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {HeadingTags} from '../../../../../packages/react/src/Heading/Heading'
import {AccordionToggleColors} from '../../../../../packages/react/src/Accordion/Accordion'

export const FAQChildrenProp = () => (
  <PropTableValues
    values={['FAQ.Heading (#faq-heading)', 'FAQ.Subheading (#faq-subheading)', 'FAQ.Item (#faq-item)']}
    addLineBreaks
  />
)

export const FAQHeadingAlignProp = () => <PropTableValues values={['start', 'center']} addLineBreaks />
export const FAQHeadingSizeProp = () => <PropTableValues values={['medium', 'large']} addLineBreaks />
export const FAQHeadingAsProp = () => <PropTableValues values={[...HeadingTags]} addLineBreaks />
export const FAQHeadingToggleColorProp = () => <PropTableValues values={[...AccordionToggleColors]} addLineBreaks />
export const FAQSubheadingAsProp = () => <PropTableValues values={HeadingTags.slice(1)} addLineBreaks />
export const FAQQuestionAsProp = () => <PropTableValues values={HeadingTags.slice(1)} addLineBreaks />

export const FAQGroupChildrenProp = () => (
  <PropTableValues values={['FAQ (#faq-required)', 'FAQGroup.Heading (#faqgroup-heading)']} addLineBreaks />
)

export const FAQItemChildrenProp = () => (
  <PropTableValues values={['FAQ.Question (#faq-question)', 'FAQ.Answer (#faq-answer)']} addLineBreaks />
)

export const FAQGroupHeadingAsProp = () => <PropTableValues values={[...HeadingTags]} addLineBreaks />
