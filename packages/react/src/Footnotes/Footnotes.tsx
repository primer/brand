import React from 'react'
import {ReplyIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'

import {Heading, InlineLink, Text} from '../'
import type {BaseProps} from '../component-helpers'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Footnotes.module.css'
import {getTextContent} from '../utils/getTextContent'

export const FootnotesTags = ['div', 'ol'] as const

type FootnotesRestrictedPolymorphism =
  | (React.HTMLAttributes<HTMLDivElement> & BaseProps<HTMLDivElement> & {as?: 'div'})
  | (React.HTMLAttributes<HTMLParagraphElement> & BaseProps<HTMLOListElement> & {as?: 'ol'})

type FootnotesProps = {
  as?: (typeof FootnotesTags)[number]
  visuallyHiddenHeading?: string
} & FootnotesRestrictedPolymorphism

function Root({as = 'ol', className, children, visuallyHiddenHeading = 'Footnotes', ...rest}: FootnotesProps) {
  const memoizedChildren = React.useMemo(() => React.Children.toArray(children), [children])

  if (as === 'div') {
    const filteredChildren = memoizedChildren.map(child => {
      if (React.isValidElement<FootnotesItemProps>(child) && child.type === Item) {
        return React.cloneElement(child, {
          _variant: 'disclaimer',
          ...child.props,
        })
      }
      return null
    })
    return (
      <>
        <Heading className="visually-hidden" as="h2" id="footnote-label">
          {visuallyHiddenHeading}
        </Heading>
        <div
          className={clsx(styles.Footnotes, styles['Footnotes--variant-disclaimer'], className)}
          {...(rest as BaseProps<HTMLDivElement>)}
        >
          {filteredChildren}
        </div>
      </>
    )
  }

  return (
    <>
      <Heading className="visually-hidden" as="h2" id="footnote-label">
        {visuallyHiddenHeading}
      </Heading>
      <ol
        className={clsx(styles.Footnotes, styles['Footnotes--variant-citations'], className)}
        {...(rest as BaseProps<HTMLOListElement>)}
      >
        {children}
      </ol>
    </>
  )
}

export const FootnotesItemTags = ['a', 'p'] as const

type DefaultFootnotesItemProps = {
  _variant?: 'disclaimer'
}

type CitationFootnotesItemProps = {
  _variant?: 'citation'
  href?: string
}

type FootnotesItemProps = (DefaultFootnotesItemProps | CitationFootnotesItemProps) &
  React.HTMLAttributes<HTMLParagraphElement> &
  BaseProps<HTMLParagraphElement>

function Item({className, children, _variant = 'citation', ...rest}: FootnotesItemProps) {
  if (_variant === 'disclaimer') {
    return (
      <Text as="p" variant="muted" size="100" className={clsx(styles.FootnotesItem, className)}>
        {children}
      </Text>
    )
  }

  const {href, ...restSansHref} = rest as CitationFootnotesItemProps
  return (
    <li className={clsx(styles.FootnotesItem, className)} {...(restSansHref as CitationFootnotesItemProps)}>
      <Text as="p" variant="muted" size="100" className={clsx(styles.FootnotesItem__citationText)}>
        {children}
        {href && (
          <InlineLink href={href} aria-label={`Back to content ${getTextContent(children)}`}>
            <ReplyIcon className={styles.FootnotesItem__citationIcon} />
          </InlineLink>
        )}
      </Text>
    </li>
  )
}

/**
 * Footnotes component
 * {@link https://primer.style/brand/components/Footnotes/ See usage examples}.
 */
export const Footnotes = Object.assign(Root, {Item})
