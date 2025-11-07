import React from 'react'

import {FrostedGlassVFX, Grid, Testimonial} from '../../../..'
import type {FlexTemplateTestimonialsConfig} from '../../FlexTemplate.types'

import monaAvatar from '../../../../fixtures/images/avatar-mona.png'
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

  const testimonialItems =
    testimonials.items && testimonials.items.length > 0
      ? testimonials.items
      : Array.from({length: testimonialCount}).map(() => ({
          quote:
            "GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first line of code we're writing.",
          authorName: 'David Ross',
          authorTitle: 'Staff Security Engineer',
        }))

  return (
    <Grid className={className}>
      {testimonialItems.map((item, i) => {
        const quote =
          item.quote ??
          "GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first line of code we're writing."
        // eslint-disable-next-line i18n-text/no-en
        const authorName = item.authorName ?? 'David Ross'
        // eslint-disable-next-line i18n-text/no-en
        const authorTitle = item.authorTitle ?? 'Staff Security Engineer'
        const authorImage = item.authorImage

        const testimonialContent = (
          <Testimonial
            className={variant === 'frosted-glass' ? undefined : styles['height-full']}
            size={isSingleTestimonial ? 'large' : 'small'}
            variant={variant === 'frosted-glass' ? 'default' : undefined}
            quoteMarkColor={testimonials.quoteMarkColor}
          >
            <Testimonial.Quote>{quote}</Testimonial.Quote>

            <Testimonial.Name position={authorTitle}>{authorName}</Testimonial.Name>

            {testimonials.displayedAuthorImage === 'logo' ? (
              <Testimonial.Logo>
                <img
                  src={authorImage ?? 'https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png'}
                  alt="GitHub logo"
                  width={60}
                />
              </Testimonial.Logo>
            ) : testimonials.displayedAuthorImage === 'avatar' ? (
              <Testimonial.Avatar alt="The testimonial author" src={authorImage ?? monaAvatar} />
            ) : null}
          </Testimonial>
        )

        return (
          <Grid.Column
            start={isSingleTestimonial && isMinimalVariant ? {medium: 2} : undefined}
            span={{medium: span}}
            key={i}
          >
            {variant === 'frosted-glass' ? (
              <FrostedGlassVFX className={styles['height-full']}>{testimonialContent}</FrostedGlassVFX>
            ) : (
              testimonialContent
            )}
          </Grid.Column>
        )
      })}
    </Grid>
  )
}
