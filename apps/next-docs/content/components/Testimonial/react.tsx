'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {
  TestimonialQuoteMarkColors,
  TestimonialVariants,
} from '../../../../../packages/react/src/Testimonial/Testimonial'

export const TestimonialSizeProp = () => <PropTableValues addLineBreaks values={['small', 'large']} />
export const TestimonialQuoteMarkColorProp = () => (
  <PropTableValues addLineBreaks values={[...TestimonialQuoteMarkColors]} />
)
export const TestimonialVariantProp = () => <PropTableValues addLineBreaks values={[...TestimonialVariants]} />

export const TestimonialChildrenProp = () => (
  <PropTableValues
    values={['Testimonial.Quote', 'Testimonial.Name', 'Testimonial.Logo', 'Testimonial.Avatar', 'React.ReactNode']}
    addLineBreaks
  />
)

export const TestimonialLogoChildrenProp = () => (
  <PropTableValues addLineBreaks values={['SVGElement', 'HTMLImageElement']} />
)
