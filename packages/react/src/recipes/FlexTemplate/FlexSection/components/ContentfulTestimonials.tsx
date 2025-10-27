import React from 'react'

import {FrostedGlassVFX, Grid} from '../../../..'
import {ContentfulTestimonialContent} from './ContentfulTestimonialContent'

import styles from '../FlexSection.module.css'

// biome-ignore lint/suspicious/noExplicitAny: TODO - Add proper types for Contentful data
export function ContentfulTestimonials({testimonials, className}: any) {
  const isSingleTestimonial = testimonials.fields.testimonialCount === 1
  // The default variant is 'minimal', so if the variant is not set, we should treat it as 'minimal'.
  const isMinimalVariant = testimonials.fields.variant === 'minimal'
  const span = isSingleTestimonial ? (isMinimalVariant ? 10 : 12) : 6

  return (
    <Grid className={className}>
      {Array.from({length: testimonials.fields.testimonialCount}).map((_, i) => (
        <Grid.Column
          start={isSingleTestimonial && isMinimalVariant ? {medium: 2} : undefined}
          span={{medium: span}}
          key={i}
        >
          {testimonials.fields.variant === 'frosted-glass' ? (
            <FrostedGlassVFX className={styles['height-full']}>
              <ContentfulTestimonialContent
                variant="default"
                size={isSingleTestimonial ? 'large' : 'small'}
                quoteMarkColor={testimonials.fields.quoteMarkColor}
                displayedAuthorImage={testimonials.fields.displayedAuthorImage}
              />
            </FrostedGlassVFX>
          ) : (
            <ContentfulTestimonialContent
              className={styles['height-full']}
              size={isSingleTestimonial ? 'large' : 'small'}
              quoteMarkColor={testimonials.fields.quoteMarkColor}
              displayedAuthorImage={testimonials.fields.displayedAuthorImage}
            />
          )}
        </Grid.Column>
      ))}
    </Grid>
  )
}
