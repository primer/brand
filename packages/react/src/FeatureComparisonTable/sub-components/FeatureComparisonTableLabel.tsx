import {type PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import styles from '../FeatureComparisonTable.module.css'
import {type FeatureComparisonTableBaseProps, testIds} from '../FeatureComparisonTableContext'

export type FeatureComparisonTableLabelProps = PropsWithChildren<FeatureComparisonTableBaseProps<HTMLSpanElement>>

export const FeatureComparisonTableLabel = (props: FeatureComparisonTableLabelProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTableLabelProps & {id?: string} = props

  return (
    <div className={styles.FeatureComparisonTable__labelCell} data-testid={testIds.label}>
      <span className={clsx(styles.FeatureComparisonTable__label, className)} {...rest}>
        {children}
      </span>
    </div>
  )
}
