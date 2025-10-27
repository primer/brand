import React from 'react'
import clsx from 'clsx'

import {Box, Grid, Image, useTheme} from '../../../..'
import {ContentfulTestimonials} from './ContentfulTestimonials'

import startShapeLight from '../../../../fixtures/images/testimonial-bg-1.png'
import endShapeLight from '../../../../fixtures/images/testimonial-bg-2.png'
import startShapeDark from '../../../../fixtures/images/testimonial-bg-1-dark.png'
import endShapeDark from '../../../../fixtures/images/testimonial-bg-2-dark.png'

import styles from '../FlexSection.module.css'

const backgroundStylesMap = {
  Productivity: {
    className: styles.productivity,
    marginBlockStart: 'none',
    marginBlockEnd: 16,
    left: {
      width: 444,
    },
    right: {
      width: 574,
    },
  },
  Collaboration: {
    className: styles.collaboration,
    marginBlockStart: 24,
    marginBlockEnd: 'none',
    left: {
      width: 426,
    },
    right: {
      width: 417,
    },
  },
  AI: {
    className: styles.ai,
    marginBlockStart: 'none',
    marginBlockEnd: 'none',
    left: {
      width: 424,
    },
    right: {
      width: 433,
    },
  },
  Security: {
    className: styles.security,
    marginBlockStart: 8,
    marginBlockEnd: 'none',
    left: {
      width: 349,
    },
    right: {
      width: 521,
    },
  },
  Enterprise: {
    className: styles.enterprise,
    marginBlockStart: 'none',
    marginBlockEnd: 128,
    left: {
      width: 418,
    },
    right: {
      width: 433,
    },
  },
}

// biome-ignore lint/suspicious/noExplicitAny: TODO - Add proper types for Contentful data
export function FlexSectionTestimonials({testimonials, className}: any) {
  const {colorMode} = useTheme()

  const isMinimalVariant = testimonials.fields.variant === 'minimal'

  const set =
    !isMinimalVariant && testimonials.fields.backgroundImageVariant
      ? backgroundStylesMap[testimonials.fields.backgroundImageVariant]
      : undefined

  return set ? (
    <Grid>
      <Grid.Column>
        <Box
          className={clsx(styles['position-relative'], set.className)}
          marginBlockStart={{narrow: 'none', wide: set.marginBlockStart}}
          marginBlockEnd={{narrow: 'none', wide: set.marginBlockEnd}}
        >
          <Image
            src={colorMode === 'light' ? startShapeLight : startShapeDark}
            alt=""
            className={clsx(styles.testimonialBackgroundImageShape, styles.left)}
            width={set.left.width}
            loading="lazy"
          />
          <Image
            src={colorMode === 'light' ? endShapeLight : endShapeDark}
            alt=""
            className={clsx(styles.testimonialBackgroundImageShape, styles.right)}
            width={set.right.width}
            loading="lazy"
          />

          <ContentfulTestimonials className={className} testimonials={testimonials} />
        </Box>
      </Grid.Column>
    </Grid>
  ) : (
    <ContentfulTestimonials className={className} testimonials={testimonials} />
  )
}
