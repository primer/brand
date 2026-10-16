import {type PropsWithChildren} from 'react'
import {CheckIcon, DashIcon, InfinityIcon, SyncIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'
import {Text} from '../../Text'
import styles from '../FeatureComparisonTable.module.css'
import {type FeatureComparisonTableBaseProps, testIds} from '../FeatureComparisonTableContext'

export const cellVariants = {
  included: {icon: CheckIcon, label: 'Included'},
  unavailable: {icon: DashIcon, label: 'Unavailable'},
  unlimited: {icon: InfinityIcon, label: 'Unlimited'},
  refresh: {icon: SyncIcon, label: 'Refresh'},
}

export type FeatureComparisonTableCellVariantProps =
  | {
      variant?: undefined
      variantAriaLabel?: never
    }
  | {
      variant: keyof typeof cellVariants
      variantAriaLabel?: string
    }

export type FeatureComparisonTableCellProps = PropsWithChildren<
  FeatureComparisonTableBaseProps<HTMLDivElement> & FeatureComparisonTableCellVariantProps
>

export const FeatureComparisonTableCell = (props: FeatureComparisonTableCellProps) => {
  const {
    children,
    className,
    variant,
    variantAriaLabel,
    id: _id,
    ...rest
  }: FeatureComparisonTableCellProps & {id?: string} = props
  const CellIcon = variant ? cellVariants[variant].icon : null
  const resolvedVariantAriaLabel = variantAriaLabel ?? (variant ? cellVariants[variant].label : undefined)

  return (
    <Text
      as="div"
      size="200"
      variant="muted"
      className={clsx(styles.FeatureComparisonTable__cell, className)}
      data-testid={testIds.cell}
      {...rest}
    >
      {variant ? (
        <>
          <span
            className={clsx(
              styles.FeatureComparisonTable__cellIcon,
              variant === 'included' && styles['FeatureComparisonTable__cellIcon--included'],
              variant === 'unlimited' && styles['FeatureComparisonTable__cellIcon--unlimited'],
              variant === 'refresh' && styles['FeatureComparisonTable__cellIcon--refresh'],
            )}
            aria-hidden="true"
          >
            {CellIcon && <CellIcon size={16} />}
          </span>
          <span className="visually-hidden">{resolvedVariantAriaLabel}</span>
        </>
      ) : null}
      {children}
    </Text>
  )
}
