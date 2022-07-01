import React from 'react'
import clsx from 'clsx'
import {Heading, HeadingTags, LinkProps, HeadingProps, TextProps, Text, Link} from '../'

import '../../lib/design-tokens/css/tokens/functional/components/river/base.css'
import styles from './River.module.css'

export type RiverProps = {
  /**
   * Only specific children are valid.
   * These include: `River.Visual` and `River.Content`.
   * The declarative order of the children will be ignored in the rendered output
   * to enforce correct HTML semantics.
   */
  children: React.ReactElement<RiverVisualProps | RiverContentProps>[]
  /**
   * Apply a custom classname that will be forwarded to the root River element.
   */
  className?: string
  /**
   * Apply an alternative image to text column ratio. The default is `50:50`.
   */
  imageTextRatio?: '60:40' | '50:50'
  /**
   * Adjust the order of the `Content` column. The default is `start`.
   */
  align?: 'start' | 'end' | 'center'
}

export const defaultRiverImageTextRatio = '50:50'
export const defaultRiverAlign = 'start'

type ValidRootChildren = {
  Visual: React.ReactElement<RiverVisualProps> | null
  Content: React.ReactElement<RiverContentProps> | null
}

function Root({
  imageTextRatio = defaultRiverImageTextRatio,
  align = defaultRiverAlign,
  className,
  children,
  ...rest
}: RiverProps) {
  const {Visual: VisualChild, Content: ContentChild} = React.Children.toArray(children).reduce<ValidRootChildren>(
    (acc, child) => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (child.type === Visual) {
          acc.Visual = child
        }
        if (child.type === Content) {
          acc.Content = child
        }
      }
      return acc
    },
    {Visual: null, Content: null}
  )

  const orderedChildren =
    align === 'start' || align === 'center' ? [ContentChild, VisualChild] : [VisualChild, ContentChild]

  return (
    <section
      className={clsx(
        styles.River,
        styles[`River--${imageTextRatio.replace(':', '-')}`],
        styles[`River--align-${align}`],
        className
      )}
      {...rest}
    >
      {orderedChildren}
    </section>
  )
}

type RiverContentProps = {
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  trailingComponent?: React.FunctionComponent
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  leadingComponent?: React.FunctionComponent
  /**
   * Only valid children are allowed.
   * These include: `Heading`, `Text` and `Link`.
   * The declarative order of the children will be ignored in the rendered output
   * to enforce correct HTML semantics.
   */
  children: React.ReactElement<TextProps> | React.ReactElement<HeadingProps | TextProps | LinkProps>[]
}

export const getHeadingWarning = (size: typeof HeadingTags[number]) =>
  `River.Content does not accept a Heading with as="${size}". River automatically applies as="h3" by default.`

function Content({
  children,
  leadingComponent: LeadingComponent,
  trailingComponent: TrailingComponent
}: RiverContentProps) {
  const HeadingChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === Heading
  )

  const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)

  const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)

  const applyHeadingSize = (Component: React.ReactElement) => {
    const {as}: {as: typeof HeadingTags[number] | undefined} = Component.props
    if (as) {
      if (HeadingTags.includes(as) && as !== 'h3') {
        // eslint-disable-next-line no-console
        console.warn(getHeadingWarning(as))
      }
    }

    return 'h3'
  }

  return (
    <div className={styles.River__content}>
      {LeadingComponent && (
        <div>
          <LeadingComponent />
        </div>
      )}
      {React.isValidElement(HeadingChild) && (
        <div className={styles.River__heading}>
          {React.cloneElement(HeadingChild, {as: applyHeadingSize(HeadingChild)})}
        </div>
      )}

      {React.isValidElement(TextChild) && (
        <div className={styles['River__body-text']}>
          {React.cloneElement(TextChild, {
            variant: 'muted',
            as: 'p',
            className: clsx(styles.River__text, TextChild.props.className)
          })}
        </div>
      )}
      {React.isValidElement(LinkChild) && (
        <div className={styles['River__call-to-action']}>{React.cloneElement(LinkChild, {size: 'large'})}</div>
      )}
      {TrailingComponent && (
        <div>
          <TrailingComponent />
        </div>
      )}
    </div>
  )
}

type RiverVisualProps = {
  className?: string
  /**
   * `img` and `video` elements will apply a shadow by default.
   * This can be disabled by setting this prop to `false`.
   */
  hasShadow?: boolean
}

function Visual({children, className, hasShadow = true}: React.PropsWithChildren<RiverVisualProps>) {
  return (
    <div className={clsx(styles.River__visual, hasShadow && styles['River__visual--has-shadow'], className)}>
      {children}
    </div>
  )
}

/**
 * Alternating text and image pairs.
 */
export const River = Object.assign(Root, {Visual, Content})
