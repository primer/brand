import {type PropsWithChildren} from 'react'
import {Heading as HeadingComponent, type HeadingProps} from '../../Heading'

export type FeatureComparisonTableGroupHeadingProps = PropsWithChildren<Omit<HeadingProps, 'ref'>>

export const FeatureComparisonTableGroupHeading = ({
  children,
  as = 'h3',
  size = 'subhead-large',
  ...rest
}: FeatureComparisonTableGroupHeadingProps) => {
  return (
    <HeadingComponent as={as} size={size} {...rest}>
      {children}
    </HeadingComponent>
  )
}
