import React from 'react'
import clsx from 'clsx'

import {InlineLink, Link, RiverAccordion, Text} from '../../../..'
import type {FlexTemplateRiverAccordionItem, FlexTemplateRiverItem} from '../../FlexTemplate.types'

import placeholderImage from '../../../../fixtures/images/placeholder.png'

import styles from '../FlexSection.module.css'

type ContentfulRiverAccordionProps = {
  rivers: FlexTemplateRiverItem
} & React.HTMLAttributes<HTMLDivElement>

export function ContentfulRiverAccordion({rivers, className}: ContentfulRiverAccordionProps) {
  const items = rivers.items || []

  return (
    <RiverAccordion align={rivers.align === 'center' ? 'start' : rivers.align ?? 'start'} className={className}>
      {items.map((item: FlexTemplateRiverAccordionItem, i: number) => {
        return (
          <RiverAccordion.Item key={i}>
            {/* eslint-disable-next-line i18n-text/no-en */}
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
