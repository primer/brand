import {type PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Text} from '../../Text'
import styles from '../FeatureComparisonTable.module.css'
import {type FeatureComparisonTableBaseProps} from '../FeatureComparisonTableContext'

export type FeatureComparisonTableRowDescriptionProps = PropsWithChildren<
  FeatureComparisonTableBaseProps<HTMLParagraphElement>
>

export const FeatureComparisonTableRowDescription = (props: FeatureComparisonTableRowDescriptionProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTableRowDescriptionProps & {id?: string} = props

  return (
    <Text
      as="p"
      size="100"
      weight="normal"
      variant="muted"
      className={clsx(styles.FeatureComparisonTable__rowDescription, className)}
      {...rest}
    >
      {children}
    </Text>
  )
}
