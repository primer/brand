import {type PropsWithChildren} from 'react'
import {Heading as HeadingComponent, type HeadingProps} from '../../Heading'

export type FeatureComparisonTableItemHeadingProps = PropsWithChildren<Omit<HeadingProps, 'id' | 'ref'>>

export const FeatureComparisonTableItemHeading = (props: FeatureComparisonTableItemHeadingProps) => {
  const {
    children,
    as = 'h3',
    size = 'subhead-medium',
    id: _id,
    ...rest
  }: FeatureComparisonTableItemHeadingProps & {id?: string} = props

  return (
    <HeadingComponent as={as} size={size} {...rest}>
      {children}
    </HeadingComponent>
  )
}
