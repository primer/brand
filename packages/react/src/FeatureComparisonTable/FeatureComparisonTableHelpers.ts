import React from 'react'
import {type FeatureComparisonTableItemProps} from './sub-components/FeatureComparisonTableItem'
import {FeatureComparisonTableLabel} from './sub-components/FeatureComparisonTableLabel'

export const getChildrenOfType = <P>(children: React.ReactNode[], type: React.JSXElementConstructor<P>) =>
  children.filter((child): child is React.ReactElement<P> => React.isValidElement<P>(child) && child.type === type)

export const hasItemLabel = (item: React.ReactElement<FeatureComparisonTableItemProps>) =>
  React.Children.toArray(item.props.children).some(
    child => React.isValidElement(child) && child.type === FeatureComparisonTableLabel,
  )
