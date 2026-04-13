import {clsx} from 'clsx'
import React, {forwardRef, type Ref} from 'react'

import {Text} from '../Text'
import {useAnimation} from '../animation'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/token/colors-with-modes.css'

import styles from './Token.module.css'

export const TokenVariants = ['default', 'dark-gray', 'accent', 'outline', 'invisible'] as const

export const defaultTokenVariant = TokenVariants[0]

type TokenLeadingVisual = React.ReactElement | React.ComponentType<{className?: string}>

type TokenSharedProps = {
  /**
   * The leading visual appears before the Token content.
   * Pass an element to supply custom props, or a component type that accepts an optional className.
   */
  leadingVisual?: TokenLeadingVisual
  /**
   * The variant variations available in Token.
   */
  variant?: (typeof TokenVariants)[number]
  /**
   * The HTML element rendered by Token.
   */
  as?: 'span' | 'a'
  ['data-testid']?: string
}

type TokenSpanProps = BaseProps<HTMLSpanElement> &
  TokenSharedProps & {
    as?: 'span'
  } & React.ComponentPropsWithoutRef<'span'>

type TokenAnchorProps = BaseProps<HTMLAnchorElement> &
  TokenSharedProps & {
    as: 'a'
    href: string
  } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export type TokenProps = TokenSpanProps | TokenAnchorProps

const testIds = {
  root: 'Token',
  get leadingVisual() {
    return `${this.root}-leading-visual`
  },
}

const _Token = forwardRef<HTMLSpanElement | HTMLAnchorElement, TokenProps>(
  (
    {
      animate,
      variant = defaultTokenVariant,
      as = 'span',
      children,
      className,
      'data-testid': testId,
      leadingVisual: LeadingVisual,
      style,
      ...props
    },
    ref: Ref<HTMLSpanElement | HTMLAnchorElement>,
  ) => {
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    const tokenClassName = clsx(
      animationClasses,
      styles.Token,
      LeadingVisual && styles['Token--hasLeadingVisual'],
      as === 'a' && styles['Token--interactive'],
      styles[`Token--variant-${variant}`],
      className,
    )

    const tokenChildren = (
      <>
        {LeadingVisual && (
          <span className={styles['Token__leading-visual']} data-testid={testIds.leadingVisual} aria-hidden="true">
            {typeof LeadingVisual === 'function' ? (
              <LeadingVisual className={styles['Token__visual']} />
            ) : (
              React.isValidElement<{className?: string}>(LeadingVisual) &&
              React.cloneElement(LeadingVisual, {
                className: clsx(styles['Token__visual'], LeadingVisual.props.className),
              })
            )}
          </span>
        )}
        <Text as="span" size="100" className={styles['Token__label']}>
          {children}
        </Text>
      </>
    )

    if (as === 'a') {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={tokenClassName}
          data-testid={testId || testIds.root}
          style={{...animationInlineStyles, ...style}}
          {...props}
        >
          {tokenChildren}
        </a>
      )
    }

    return (
      <span
        ref={ref as Ref<HTMLSpanElement>}
        className={tokenClassName}
        data-testid={testId || testIds.root}
        style={{...animationInlineStyles, ...style}}
        {...props}
      >
        {tokenChildren}
      </span>
    )
  },
)

/**
 * Use a Token to group short metadata or categories, with optional leading visuals.
 * @see https://primer.style/brand
 */
export const Token = Object.assign(_Token, {testIds})
