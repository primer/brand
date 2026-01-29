import React, {forwardRef, PropsWithChildren, useMemo, type Ref} from 'react'
import {clsx} from 'clsx'
import {
  Heading,
  LinkProps,
  HeadingProps,
  TextProps,
  Text,
  Link,
  useAnimation,
  Label,
  LabelProps,
  EyebrowText,
  EyebrowTextProps,
} from '../../'

import type {BaseProps} from '../../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/river/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/river/river.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from '../river-shared.module.css'

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
          if (child.type === RiverContent) {
            acc.Content = child as React.ReactElement<RiverContentProps>
          }
        }
        return acc
      },
      {Visual: null, Content: null},
    )

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
        {ContentChild}
        {VisualChild}
      </section>
    )
  },
)

export type RiverContentProps = BaseProps<HTMLDivElement> & {
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  trailingComponent?: React.FunctionComponent
  /**
   * When `true`, a divider will be rendered between the standard river and optional trailing content.
   */
  trailingComponentDivider?: boolean
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

export const RiverContent = forwardRef(
  (
    {
      animate,
      children,
      className,
      leadingComponent: LeadingComponent,
      trailingComponent: TrailingComponent,
      trailingComponentDivider = false,
      style,
      ...rest
    }: RiverContentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const Children = useMemo(() => React.Children.toArray(children), [children])

    const HeadingChild = Children.find(child => React.isValidElement(child) && child.type === Heading)

    const TextChild = Children.find(child => React.isValidElement(child) && child.type === Text)

    const LinkChild = Children.find(child => React.isValidElement(child) && child.type === Link)

    const LabelChild = Children.find(child => React.isValidElement(child) && child.type === Label)

    const EyebrowTextChild = Children.find(child => React.isValidElement(child) && child.type === EyebrowText)

    return (
      <div
        ref={ref}
        className={clsx(animationClasses, styles.River__content, className)}
        style={{...animationInlineStyles, ...style}}
        {...rest}
      >
        {React.isValidElement(LabelChild) && !LeadingComponent && (
          <div className={styles.River__label}>
            {React.cloneElement(LabelChild as React.ReactElement<LabelProps>, {})}
          </div>
        )}

        {!LabelChild && React.isValidElement(EyebrowTextChild) && !LeadingComponent && (
          <div className={styles.River__label}>
            {React.cloneElement(EyebrowTextChild as React.ReactElement<EyebrowTextProps>, {})}
          </div>
        )}

        {!LabelChild && !EyebrowTextChild && LeadingComponent && (
          <div>
            <LeadingComponent />
          </div>
        )}

        {React.isValidElement<HeadingProps>(HeadingChild) && (
          <div className={styles.River__heading}>
            {React.cloneElement(HeadingChild as React.ReactElement<HeadingProps>, {
              // as uses h3 default, but can be overridden
              as: HeadingChild.props.as || 'h3',
              size: HeadingChild.props.size || '5',
              weight: HeadingChild.props.weight,
            })}
          </div>
        )}

        {React.isValidElement<TextProps>(TextChild) && (
          <div className={styles['River__body-text']}>
            {React.cloneElement(TextChild as React.ReactElement<TextProps>, {
              variant: 'muted',
              as: 'p',
              className: clsx(styles.River__text, TextChild.props.className),
            })}
          </div>
        )}
        {React.isValidElement<LinkProps>(LinkChild) && (
          <div className={styles['River__call-to-action']}>
            {React.cloneElement(LinkChild as React.ReactElement<LinkProps>, {
              size: 'medium',
              variant: LinkChild.props.variant || 'accent',
            })}
          </div>
        )}
        {TrailingComponent && (
          <div
            className={clsx(
              styles.River__trailingComponent,
              trailingComponentDivider && styles['River__trailingComponent--divider'],
            )}
          >
            <TrailingComponent />
          </div>
        )}
      </div>
    )
  },
)

export type RiverVisualProps = BaseProps<HTMLDivElement> &
  React.HtmlHTMLAttributes<HTMLDivElement> &
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
    /**
     * Enables rounded corners.
     * Can optionally be disabled.
     */
    rounded?: boolean
  }>

const Visual = forwardRef(
  (
    {
      fillMedia = true,
      children,
      className,
      hasShadow = false,
      rounded = true,
      ...rest
    }: PropsWithChildren<RiverVisualProps>,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.River__visual,
          hasShadow && styles['River__visual--has-shadow'],
          fillMedia && styles['River__visual--fill-media'],
          rounded && styles['River__visual--rounded'],
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

/**
 * Alternating text and image pairs.
 */
export const River = Object.assign(Root, {Visual, Content: RiverContent})
