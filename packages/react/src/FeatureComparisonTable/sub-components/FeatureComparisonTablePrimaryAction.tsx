import React, {type PropsWithChildren} from 'react'
import {Button, type ButtonBaseProps} from '../../Button'

export type FeatureComparisonTableActionBaseProps = Omit<ButtonBaseProps, 'block' | 'size' | 'variant'>

export type FeatureComparisonTableAnchorActionProps = {
  as: 'a'
  href: string
} & FeatureComparisonTableActionBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'id'>

export type FeatureComparisonTableButtonActionProps = {
  as: 'button'
} & FeatureComparisonTableActionBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'id'>

export type FeatureComparisonTableActionProps = PropsWithChildren<
  FeatureComparisonTableAnchorActionProps | FeatureComparisonTableButtonActionProps
>

export const FeatureComparisonTablePrimaryAction = (props: FeatureComparisonTableActionProps) => {
  const {id: _id, ...rest}: FeatureComparisonTableActionProps & {id?: string} = props

  return <Button {...rest} variant="primary" size="small" block />
}
