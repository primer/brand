'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {HeadingTags, HeadingWeights} from '../../../../../packages/react/src/Heading/Heading'
import {AccordionToggleColors} from '../../../../../packages/react/src/Accordion/Accordion'

export const FAQChildrenProp = () => (
  <PropTableValues values={['FAQ.Heading', 'FAQ.Subheading', 'FAQ.Item']} addLineBreaks commaSeparated />
)

export const FAQHeadingAlignProp = () => <PropTableValues values={['start', 'center']} addLineBreaks commaSeparated />
export const FAQHeadingSizeProp = () => <PropTableValues values={['medium', 'large']} addLineBreaks commaSeparated />
export const FAQHeadingAsProp = () => <PropTableValues values={[...HeadingTags]} addLineBreaks commaSeparated />
export const FAQHeadingToggleColorProp = () => (
  <PropTableValues values={[...AccordionToggleColors]} addLineBreaks commaSeparated />
)
export const FAQSubheadingAsProp = () => <PropTableValues values={HeadingTags.slice(1)} addLineBreaks commaSeparated />
export const FAQQuestionAsProp = () => <PropTableValues values={HeadingTags.slice(1)} addLineBreaks commaSeparated />

export const FAQGroupChildrenProp = () => (
  <PropTableValues values={['FAQ', 'FAQGroup.Heading']} addLineBreaks commaSeparated />
)

export const FAQItemChildrenProp = () => (
  <PropTableValues values={['FAQ.Question', 'FAQ.Answer']} addLineBreaks commaSeparated />
)

export const FAQGroupHeadingAsProp = () => <PropTableValues values={[...HeadingTags]} addLineBreaks commaSeparated />

export const FAQVariantProp = () => <PropTableValues values={['default', 'gridline']} addLineBreaks commaSeparated />

export const FAQQuestionWeightProp = () => <PropTableValues values={[...HeadingWeights]} addLineBreaks commaSeparated />
