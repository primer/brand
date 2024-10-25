import React, {type ReactElement, RefObject, forwardRef, useCallback} from 'react'
import clsx from 'clsx'
import {Text, useTheme, CardSkewEffect, Card} from '..'
import {ExpandableArrow} from '../ExpandableArrow'
import type {BaseProps} from '../component-helpers'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import {Colors} from '../constants'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/card/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/card/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './Card.module.css'
import stylesLink from '../Link/Link.module.css'

export const CardIconColors = Colors

export const defaultCardIconColor = CardIconColors[0]
export type CardProps = {
  /**
   * Specify alternative card appearance
   */
  variant?: 'default' | 'minimal'
  /**
   * Disable the default hover animation
   */
  disableAnimation?: boolean
  /**
   * The href of the link
   * */
  href: string
  /**
   * Changes the cta text of the card
   * */
  ctaText?: string
  hasBorder?: boolean
  /**
   * Fills the width of the parent container and removes the default max-width.
   */
  fullWidth?: boolean
  renderIcon?: () => ReactElement
  renderLabel?: () => ReactElement
  renderHeading: (props: {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    href: string
  }) => ReactElement
  renderDescription?: () => ReactElement
} & Omit<BaseProps<HTMLDivElement>, 'animate'> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'> &
  Pick<React.ComponentPropsWithoutRef<'a'>, 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'>

export const CardWithRenderProps = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      children,
      className,
      ctaText = 'Learn more',
      disableAnimation = false,
      fullWidth = false,
      href,
      hasBorder = false,
      style,
      variant = 'default',
      renderIcon = () => null,
      renderLabel = () => null,
      renderHeading,
      renderDescription = () => null,
      ...props
    },
    ref,
  ) => {
    const cardRef = useProvidedRefOrCreate(ref as RefObject<HTMLDivElement>)
    const {colorMode} = useTheme()
    const [isActive, setIsActive] = React.useState(false)

    const handleActiveCard = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setIsActive(true)
        onMouseEnter?.(event)
      },
      [onMouseEnter, setIsActive],
    )

    const handleInactiveCard = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setIsActive(false)
        onMouseLeave?.(event)
      },
      [onMouseLeave, setIsActive],
    )

    const icon = renderIcon()

    const hasSkewEffect = colorMode === 'dark' && variant !== 'minimal'
    const showBorder = hasSkewEffect || hasBorder

    const WrapperComponent = hasSkewEffect ? CardSkewEffect : DefaultCardWrapperComponent

    return (
      <WrapperComponent
        style={style}
        disableSkew={disableAnimation}
        className={clsx(fullWidth ? styles['Card--fullWidth'] : styles['Card--maxWidth'])}
      >
        <div
          className={clsx(
            styles.Card,
            disableAnimation && styles['Card--disableAnimation'],
            styles[`Card--colorMode-${colorMode}`],
            styles[`Card--variant-${variant}`],
            icon && styles['Card--icon'],
            showBorder && styles['Card--border'],
            styles[`Card--colorMode-${colorMode}`],
            className,
          )}
          style={style}
          ref={cardRef}
          {...props}
        >
          {icon}
          {renderLabel()}
          {renderDescription()}
          {renderHeading({onMouseEnter: handleActiveCard, onMouseLeave: handleInactiveCard, href})}
          <div className={styles.Card__action}>
            <Text as="span" size="200" className={clsx(stylesLink['Link--label'])}>
              {ctaText}
            </Text>
            <ExpandableArrow className={stylesLink['Link-arrow']} expanded={isActive} aria-hidden="true" />
          </div>
        </div>
      </WrapperComponent>
    )
  },
)

function DefaultCardWrapperComponent({className, children}) {
  return <div className={clsx(styles['Card__outer'], className)}>{children}</div>
}
