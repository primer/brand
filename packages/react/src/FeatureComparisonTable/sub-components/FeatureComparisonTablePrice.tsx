import {type PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Text} from '../../Text'
import styles from '../FeatureComparisonTable.module.css'
import {type FeatureComparisonTableAnimatedBaseProps, testIds} from '../FeatureComparisonTableContext'

export type FeatureComparisonTablePriceProps = PropsWithChildren<
  FeatureComparisonTableAnimatedBaseProps<HTMLParagraphElement>
>

export const FeatureComparisonTablePrice = (props: FeatureComparisonTablePriceProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTablePriceProps & {id?: string} = props

  return (
    <Text
      as="p"
      size="100"
      variant="default"
      className={clsx(styles.FeatureComparisonTable__price, className)}
      data-testid={testIds.price}
      {...rest}
    >
      {children}
    </Text>
  )
}
