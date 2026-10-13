import {type PropsWithChildren} from 'react'
import {Heading as HeadingComponent, type HeadingProps} from '../../Heading'
import {useTableContext, testIds} from '../FeatureComparisonTableContext'

export type FeatureComparisonTableHeadingProps = PropsWithChildren<Omit<HeadingProps, 'ref'>>

export const FeatureComparisonTableHeading = (props: FeatureComparisonTableHeadingProps) => {
  const {children, as = 'h2', size = 'subhead-large', id, ...rest} = props
  const {instanceId} = useTableContext()

  return (
    <HeadingComponent as={as} size={size} data-testid={testIds.heading} id={id || `${instanceId}-heading`} {...rest}>
      {children}
    </HeadingComponent>
  )
}
