import React from 'react'
import styles from './River.module.css'
import '../../lib/design-tokens/css/tokens/functional/components/river/base.css'
import {Heading, HeadingTags, LinkProps, HeadingProps, TextProps, Text, Link} from '../'
import clsx from 'clsx'

export type RiverProps = {
  children: React.ReactElement<RiverVisualProps | RiverContentProps>[]
  className?: string
  imageTextRatio?: '60:40' | '50:50'
  align?: 'left' | 'right' | 'center'
}

export const defaultRiverImageTextRatio = '50:50'
export const defaultRiverAlign = 'left'

type ValidRootChildren = {
  Visual: React.ReactElement<RiverVisualProps> | null
  Content: React.ReactElement<RiverContentProps> | null
}

function Root({
  imageTextRatio = defaultRiverImageTextRatio,
  align = defaultRiverAlign,
  className,
  children
}: RiverProps) {
  const {Visual: VisualChild, Content: ContentChild} = React.Children.toArray(children).reduce<ValidRootChildren>(
    (acc, child) => {
      if (
        React.isValidElement(child) &&
        typeof child.type !== 'string' &&
        (child.type.name === 'Visual' || child.type.name === 'Content')
      ) {
        acc[child.type.name] = child
      }
      return acc
    },
    {Visual: null, Content: null}
  )

  const orderedChildren =
    align === 'left' || align === 'center' ? [ContentChild, VisualChild] : [VisualChild, ContentChild]

  return (
    <section
      className={clsx(
        styles.River,
        styles[`River--${imageTextRatio.replace(':', '-')}`],
        styles[`River--align-${align}`],
        className
      )}
    >
      {orderedChildren}
    </section>
  )
}

type RiverContentProps = {
  trailingComponent?: React.FunctionComponent
  leadingComponent?: React.FunctionComponent
  children: React.ReactElement<TextProps> | React.ReactElement<HeadingProps | TextProps | LinkProps>[]
}

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

  const inferCorrectHeadingSize = (Component: React.ReactElement) => {
    const {as}: {as: typeof HeadingTags[number] | undefined} = Component.props
    if (as) {
      if (HeadingTags.includes(as)) {
        return as
      }
    }
    return 'h3'
  }

  return (
    <div className={styles.Content}>
      <div>{LeadingComponent && <LeadingComponent />}</div>

      {React.isValidElement(HeadingChild) && (
        <div className={styles.heading}>
          {React.cloneElement(HeadingChild, {as: inferCorrectHeadingSize(HeadingChild)})}
        </div>
      )}
      <div className={styles.bodyText}>
        {React.isValidElement(TextChild) &&
          React.cloneElement(TextChild, {
            variant: 'muted',
            as: 'p',
            className: clsx(styles.text, TextChild.props.className)
          })}
      </div>

      <div className={styles['call-to-action']}>
        {React.isValidElement(LinkChild) && React.cloneElement(LinkChild, {size: 'large'})}
      </div>
      <div>{TrailingComponent && <TrailingComponent />}</div>
    </div>
  )
}

type RiverVisualProps = {
  className?: string
  hasShadow?: boolean
}

function Visual({children, className, hasShadow = true}: React.PropsWithChildren<RiverVisualProps>) {
  return <div className={clsx(styles.Visual, hasShadow && styles['Visual--has-shadow'], className)}>{children}</div>
}

/**
 * Alternating text and image pairs.
 */
export const River = Object.assign(Root, {Visual, Content})
