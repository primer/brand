import {clsx} from 'clsx'
import React, {forwardRef, type Ref} from 'react'
import type {Icon} from '@primer/octicons-react'

import {
  Button,
  ButtonSizes,
  ButtonVariants,
  defaultButtonSize,
  defaultButtonVariant,
  type ButtonVariant,
} from '../Button'
import {Tooltip, TooltipContext, type TooltipDirection} from '../Tooltip'
import type {BaseProps} from '../component-helpers'
import {Spinner} from '../Spinner/Spinner'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon-button/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon-button/colors-with-modes.css'
import styles from './IconButton.module.css'

export const IconButtonVariants = [...ButtonVariants, 'danger', 'invisible'] as const
export const IconButtonSizes = [...ButtonSizes] as const
export const defaultIconButtonVariant = defaultButtonVariant
export const defaultIconButtonSize = defaultButtonSize

export type IconButtonVariant = (typeof IconButtonVariants)[number]
export type IconButtonSize = (typeof IconButtonSizes)[number] | number

type IconButtonBaseProps<C extends React.ElementType> = Omit<BaseProps<C>, 'ref'> & {
  as?: C
  variant?: IconButtonVariant
  icon: Icon | React.ReactElement<React.SVGProps<SVGSVGElement>>
  'aria-label': string
  description?: string
  inactive?: boolean
  loading?: boolean
  loadingAnnouncement?: string
  rounded?: boolean
  size?: IconButtonSize
  tooltipDirection?: TooltipDirection
}

export type IconButtonProps<C extends React.ElementType = 'button'> = IconButtonBaseProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof IconButtonBaseProps<C> | 'children'>

const iconButtonTestIds = {
  root: 'IconButton',
  get spinner() {
    return `${this.root}-spinner`
  },
  get loadingAnnouncement() {
    return `${this.root}-loading-announcement`
  },
}

type IconButtonComponent = <C extends React.ElementType = 'button'>(
  props: IconButtonProps<C> & React.RefAttributes<HTMLButtonElement>,
) => React.ReactElement | null

function IconButtonRoot(
  {
    as,
    icon: IconComponent,
    'aria-label': ariaLabel,
    description,
    loading = false,
    loadingAnnouncement = 'Loading',
    rounded = false,
    tooltipDirection = 's',
    size = defaultIconButtonSize,
    variant = defaultIconButtonVariant,
    inactive = false,
    disabled,
    className,
    onClick,
    'aria-disabled': ariaDisabled,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'data-testid': testId,
    style,
    ...props
  }: React.PropsWithoutRef<IconButtonProps<React.ElementType>>,
  ref: Ref<HTMLButtonElement>,
) {
  const {tooltipId: externalTooltipId} = React.useContext(TooltipContext)
  const isLoading = loading && !disabled
  const isInactive = inactive && !disabled && !isLoading
  const shouldRenderTooltip = !disabled && !externalTooltipId
  const tooltipText = description || ariaLabel
  const buttonVariant: ButtonVariant = variant === 'danger' ? 'secondary' : variant === 'invisible' ? 'subtle' : variant
  const isCustomSize = typeof size === 'number'
  const buttonSize = isCustomSize ? defaultIconButtonSize : size
  const controlSize = isCustomSize ? `${size}px` : `var(--brand-IconButton-control-size-${size})`
  const iconSize = isCustomSize ? `${size / 2}px` : `var(--brand-IconButton-icon-size-${size})`
  const buttonStyle = {
    ['--brand-IconButton-control-size' as string]: controlSize,
    ['--brand-IconButton-icon-size' as string]: iconSize,
    ...style,
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!ariaLabel.trim()) {
      // eslint-disable-next-line no-console
      console.warn('IconButton requires a non-empty `aria-label`.')
    }

    if ([disabled, loading, inactive].filter(Boolean).length > 1) {
      // eslint-disable-next-line no-console
      console.warn('IconButton has conflicting props for `disabled`, `loading`, or `inactive` states.')
    }
  }

  const ButtonIcon = isLoading ? (
    <Spinner accessibleLabel={null} className={styles.IconButton__spinner} data-testid={iconButtonTestIds.spinner} />
  ) : React.isValidElement<React.SVGProps<SVGSVGElement>>(IconComponent) ? (
    React.cloneElement(IconComponent, {
      className: clsx(IconComponent.props.className, styles.IconButton__icon),
    })
  ) : (
    <IconComponent className={styles.IconButton__icon} />
  )

  const ButtonElement = (
    <Button
      {...props}
      ref={shouldRenderTooltip ? undefined : ref}
      as={as}
      variant={buttonVariant}
      size={buttonSize}
      style={buttonStyle}
      disabled={disabled}
      aria-disabled={isLoading || isInactive ? true : ariaDisabled}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      aria-label={!shouldRenderTooltip || description ? ariaLabel : undefined}
      className={clsx(
        styles.IconButton,
        styles[`IconButton--variant-${variant}`],
        isInactive && styles['IconButton--inactive'],
        rounded && styles['IconButton--rounded'],
        className,
      )}
      data-testid={testId || iconButtonTestIds.root}
      leadingVisual={ButtonIcon}
      onClick={
        isLoading
          ? event => {
              event.preventDefault()
              event.stopPropagation()
            }
          : onClick
      }
    />
  )

  return (
    <>
      {shouldRenderTooltip ? (
        <Tooltip ref={ref} direction={tooltipDirection} text={tooltipText} type={description ? 'description' : 'label'}>
          {ButtonElement}
        </Tooltip>
      ) : (
        ButtonElement
      )}
      <span
        aria-live="polite"
        className={styles.IconButton__loadingAnnouncement}
        data-testid={iconButtonTestIds.loadingAnnouncement}
      >
        {isLoading ? loadingAnnouncement : null}
      </span>
    </>
  )
}

export const IconButton = forwardRef(IconButtonRoot) as IconButtonComponent
