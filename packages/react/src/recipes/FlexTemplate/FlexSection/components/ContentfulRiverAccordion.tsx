import React from 'react'
import clsx from 'clsx'

import {InlineLink, Link, RiverAccordion, Text} from '../../../..'

import placeholderImage from '../../../../fixtures/images/placeholder.png'

import styles from '../FlexSection.module.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContentfulRiverAccordion({rivers, className}: any) {
  const items = rivers.items || []

  return (
    <RiverAccordion align={rivers.align ?? 'start'} className={className}>
      {items.map((item: any, i: number) => {
        return (
          <RiverAccordion.Item key={i}>
            <RiverAccordion.Heading>{item.heading ?? `Heading ${i + 1}`}</RiverAccordion.Heading>
            <RiverAccordion.Content>
              {item.description && (
                <Text>
                  {item.description}
                  {item.footnoteId && item.footnoteHref && (
                    <sup>
                      <InlineLink
                        href={item.footnoteHref}
                        className={clsx(styles.footnoteInlineLink, styles.footnoteSizeSmall)}
                        aria-label={`Footnote ${item.footnoteId}`}
                      >
                        {item.footnoteId}
                      </InlineLink>
                    </sup>
                  )}
                </Text>
              )}
              {item.ctaText && item.ctaHref ? (
                <Link variant={item.ctaVariant ?? 'accent'} href={item.ctaHref}>
                  {item.ctaText}
                </Link>
              ) : null}
            </RiverAccordion.Content>
            <RiverAccordion.Visual className={styles['width-full']}>
              <img
                src={item.imageSrc ?? placeholderImage}
                alt={item.imageAlt ?? 'placeholder, blank area with a gray background color'}
                className={styles['width-full']}
              />
            </RiverAccordion.Visual>
          </RiverAccordion.Item>
        )
      })}
    </RiverAccordion>
  )
}
