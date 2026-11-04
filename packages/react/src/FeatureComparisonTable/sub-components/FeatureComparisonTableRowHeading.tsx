import {type PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Text} from '../../Text'
import styles from '../FeatureComparisonTable.module.css'
import {type FeatureComparisonTableBaseProps} from '../FeatureComparisonTableContext'

export type FeatureComparisonTableRowHeadingProps = PropsWithChildren<FeatureComparisonTableBaseProps<HTMLDivElement>>

export const FeatureComparisonTableRowHeading = (props: FeatureComparisonTableRowHeadingProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTableRowHeadingProps & {id?: string} = props

  return (
    <Text
      as="span"
      size="200"
      variant="muted"
      className={clsx(styles.FeatureComparisonTable__rowHeading, className)}
      {...rest}
    >
      {children}
    </Text>
  )
}
