import React from 'react'
import clsx from 'clsx'

import {InlineLink, Link, RiverAccordion, Text} from '../../../..'

import placeholderImage from '../../../../fixtures/images/placeholder.png'

import styles from '../FlexSection.module.css'

// biome-ignore lint/suspicious/noExplicitAny: TODO - Add proper types for Contentful data
export function ContentfulRiverAccordion({rivers, className}: any) {
  return (
    <RiverAccordion align={rivers.fields.align} className={className}>
      {Array.from({length: 3}).map((_, i) => {
        return (
          <RiverAccordion.Item key={i}>
            <RiverAccordion.Heading>Heading {i + 1}</RiverAccordion.Heading>
            <RiverAccordion.Content>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus veniam
                <sup>
                  <InlineLink
                    href=""
                    className={clsx(styles.footnoteInlineLink, styles.footnoteSizeSmall)}
                    aria-label="Footnote 7"
                  >
                    7
                  </InlineLink>
                </sup>{' '}
                repellat unde ex aut minus iusto, ad a vero optio at eligendi, ratione commodi minima! Laboriosam quas
                numquam totam.
              </Text>
              {rivers.fields.hasCta ? (
                <Link variant={rivers.fields.ctaVariant ?? 'accent'} href="#">
                  Learn more
                </Link>
              ) : null}
            </RiverAccordion.Content>
            <RiverAccordion.Visual className={styles['width-full']}>
              <img
                src={placeholderImage}
                alt="placeholder, blank area with a gray background color"
                className={styles['width-full']}
              />
            </RiverAccordion.Visual>
          </RiverAccordion.Item>
        )
      })}
    </RiverAccordion>
  )
}
