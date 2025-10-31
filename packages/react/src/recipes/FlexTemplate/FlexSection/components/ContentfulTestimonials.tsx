import React from 'react'

import {FrostedGlassVFX, Grid} from '../../../..'
import {ContentfulTestimonialContent} from './ContentfulTestimonialContent'
import type {FlexTemplateTestimonialsConfig} from '../../FlexTemplate.types'

import styles from '../FlexSection.module.css'

type ContentfulTestimonialsProps = {
  testimonials: FlexTemplateTestimonialsConfig
  className?: string
}

export function ContentfulTestimonials({testimonials, className}: ContentfulTestimonialsProps) {
  const testimonialCount = testimonials.testimonialCount ?? 0
  const variant = testimonials.variant ?? 'minimal'
  const isSingleTestimonial = testimonialCount === 1
  // The default variant is 'minimal', so if the variant is not set, we should treat it as 'minimal'.
  const isMinimalVariant = variant === 'minimal'
  const span = isSingleTestimonial ? (isMinimalVariant ? 10 : 12) : 6

  return (
    <Grid className={className}>
      {Array.from({length: testimonialCount}).map((_, i) => (
        <Grid.Column
          start={isSingleTestimonial && isMinimalVariant ? {medium: 2} : undefined}
          span={{medium: span}}
          key={i}
        >
          {variant === 'frosted-glass' ? (
            <FrostedGlassVFX className={styles['height-full']}>
              <ContentfulTestimonialContent
                variant="default"
                size={isSingleTestimonial ? 'large' : 'small'}
                quoteMarkColor={testimonials.quoteMarkColor}
                displayedAuthorImage={testimonials.displayedAuthorImage}
              />
            </FrostedGlassVFX>
          ) : (
            <ContentfulTestimonialContent
              className={styles['height-full']}
              size={isSingleTestimonial ? 'large' : 'small'}
              quoteMarkColor={testimonials.quoteMarkColor}
              displayedAuthorImage={testimonials.displayedAuthorImage}
            />
          )}
        </Grid.Column>
      ))}
    </Grid>
  )
}
