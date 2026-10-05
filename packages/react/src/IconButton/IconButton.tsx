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

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon-button/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/icon-button/colors-with-modes.css'
import styles from './IconButton.module.css'

export const IconButtonVariants = [...ButtonVariants, 'danger', 'invisible'] as const
export const IconButtonSizes = [...ButtonSizes] as const
export const defaultIconButtonVariant = defaultButtonVariant
export const defaultIconButtonSize = defaultButtonSize

export type IconButtonVariant = (typeof IconButtonVariants)[number]
export type IconButtonSize = (typeof IconButtonSizes)[number]

type IconButtonBaseProps<C extends React.ElementType> = Omit<BaseProps<C>, 'ref'> & {
  as?: C
  variant?: IconButtonVariant
  icon: Icon
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
  get loadingIndicator() {
    return `${this.root}-loading-indicator`
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
    <span className={styles.IconButton__loadingIndicator} data-testid={iconButtonTestIds.loadingIndicator} />
  ) : (
    <IconComponent className={styles.IconButton__icon} />
  )

  const ButtonElement = (
    <Button
      {...props}
      ref={shouldRenderTooltip ? undefined : ref}
      as={as}
      variant={buttonVariant}
      size={size}
      disabled={disabled}
      aria-disabled={isLoading || isInactive ? true : ariaDisabled}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      aria-label={!shouldRenderTooltip || description ? ariaLabel : undefined}
      className={clsx(
        styles.IconButton,
        styles[`IconButton--${size}`],
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
