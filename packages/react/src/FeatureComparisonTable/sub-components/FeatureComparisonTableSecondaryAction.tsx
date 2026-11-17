import {Button} from '../../Button'
import {type FeatureComparisonTableActionProps} from './FeatureComparisonTablePrimaryAction'

export const FeatureComparisonTableSecondaryAction = (props: FeatureComparisonTableActionProps) => {
  const {id: _id, ...rest}: FeatureComparisonTableActionProps & {id?: string} = props

  return <Button {...rest} variant="secondary" size="small" block />
}
