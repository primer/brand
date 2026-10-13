import {type PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Text} from '../../Text'
import styles from '../FeatureComparisonTable.module.css'
import {type FeatureComparisonTableAnimatedBaseProps} from '../FeatureComparisonTableContext'

export type FeatureComparisonTableDescriptionProps = PropsWithChildren<
  FeatureComparisonTableAnimatedBaseProps<HTMLParagraphElement>
>

export const FeatureComparisonTableDescription = (props: FeatureComparisonTableDescriptionProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTableDescriptionProps & {id?: string} = props

  return (
    <Text
      as="p"
      size="100"
      variant="muted"
      className={clsx(styles.FeatureComparisonTable__description, className)}
      {...rest}
    >
      {children}
    </Text>
  )
}
