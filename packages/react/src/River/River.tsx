import React, {forwardRef, PropsWithChildren, type Ref} from 'react'
import clsx from 'clsx'
import {Heading, LinkProps, HeadingProps, TextProps, Text, Link, useAnimation} from '../'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/river/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/river/river.css'

/** * Main Stylesheet (as a CSS Module) */
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
   * Apply an alternative image to text column ratio. The default is `50:50`.
   */
  imageTextRatio?: '60:40' | '50:50'
  /**
   * Adjust the order of the `Content` column. The default is `start`.
   */
  align?: 'start' | 'end' | 'center'
} & BaseProps<HTMLElement> &
  React.HTMLAttributes<HTMLElement>

export const defaultRiverImageTextRatio = '50:50'
export const defaultRiverAlign = 'start'

type ValidRootChildren = {
  Visual: React.ReactElement<RiverVisualProps> | null
  Content: React.ReactElement<RiverContentProps> | null
}

const Root = forwardRef(
  (
    {
      animate,
      imageTextRatio = defaultRiverImageTextRatio,
      align = defaultRiverAlign,
      className,
      children,
      style,
      ...rest
    }: RiverProps,
    ref: Ref<HTMLElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const {Visual: VisualChild, Content: ContentChild} = React.Children.toArray(children).reduce<ValidRootChildren>(
      (acc, child) => {
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          if (child.type === Visual) {
            acc.Visual = child as React.ReactElement<RiverVisualProps>
          }
          if (child.type === Content) {
            acc.Content = child as React.ReactElement<RiverContentProps>
          }
        }
        return acc
      },
      {Visual: null, Content: null},
    )

    const orderedChildren =
      align === 'start' || align === 'center' ? [ContentChild, VisualChild] : [VisualChild, ContentChild]

    return (
      <section
        ref={ref}
        className={clsx(
          styles.River,
          styles[`River--${imageTextRatio.replace(':', '-')}`],
          styles[`River--align-${align}`],
          animationClasses,
          className,
        )}
        style={{...animationInlineStyles, ...style}}
        {...rest}
      >
        {orderedChildren}
      </section>
    )
  },
)

type RiverContentProps = BaseProps<HTMLDivElement> & {
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
} & React.HTMLAttributes<HTMLDivElement>

const Content = forwardRef(
  (
    {
      animate,
      children,
      className,
      leadingComponent: LeadingComponent,
      trailingComponent: TrailingComponent,
      style,
      ...rest
    }: RiverContentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const HeadingChild = React.Children.toArray(children).find(
      child => React.isValidElement(child) && child.type === Heading,
    )

    const TextChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Text)

    const LinkChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Link)

    return (
      <div
        className={clsx(animationClasses, styles.River__content)}
        style={{...animationInlineStyles, ...style}}
        {...rest}
        ref={ref}
      >
        {LeadingComponent && (
          <div>
            <LeadingComponent />
          </div>
        )}
        {React.isValidElement(HeadingChild) && (
          <div className={styles.River__heading}>
            {React.cloneElement(HeadingChild as React.ReactElement<HeadingProps>, {
              // as uses h3 default, but can be overridden
              as: HeadingChild.props.as || 'h3',
              size: HeadingChild.props.size || '3',
            })}
          </div>
        )}

        {React.isValidElement(TextChild) && (
          <div className={styles['River__body-text']}>
            {React.cloneElement(TextChild as React.ReactElement<TextProps>, {
              variant: 'muted',
              as: 'p',
              className: clsx(styles.River__text, TextChild.props.className),
            })}
          </div>
        )}
        {React.isValidElement(LinkChild) && (
          <div className={styles['River__call-to-action']}>
            {React.cloneElement(LinkChild as React.ReactElement<LinkProps>, {size: 'large'})}
          </div>
        )}
        {TrailingComponent && (
          <div>
            <TrailingComponent />
          </div>
        )}
      </div>
    )
  },
)

type RiverVisualProps = BaseProps<HTMLDivElement> &
  PropsWithChildren<{
    /**
     * Applies automatic size constraints to child images and video.
     * This can be disabled by setting this prop to `false`.
     */
    fillMedia?: boolean
    /**
     * `img` and `video` elements will apply a shadow by default.
     * This can be disabled by setting this prop to `false`.
     */
    hasShadow?: boolean
  }>

const Visual = forwardRef(
  (
    {fillMedia = true, children, className, hasShadow = true, ...rest}: PropsWithChildren<RiverVisualProps>,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <div
        className={clsx(
          styles.River__visual,
          hasShadow && styles['River__visual--has-shadow'],
          fillMedia && styles['River__visual--fill-media'],
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    )
  },
)

/**
 * Alternating text and image pairs.
 */
export const River = Object.assign(Root, {Visual, Content})
