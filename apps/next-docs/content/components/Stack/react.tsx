'use client'
import {
  StackAlignItemVariants,
  StackSpacingVariants,
  StackDirectionVariants,
  StackJustifyContentVariants,
} from '../../../../../packages/react/src/Stack/Stack'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

export const StackSpacingValueProp = () => <PropTableValues values={[...StackSpacingVariants]} commaSeparated />
export const StackDirectionValueProp = () => <PropTableValues values={[...StackDirectionVariants]} commaSeparated />
export const StackJustifyContentValueProp = () => (
  <PropTableValues values={[...StackJustifyContentVariants]} commaSeparated />
)
export const StackAlignItemsValueProp = () => <PropTableValues values={[...StackAlignItemVariants]} commaSeparated />

export {defaultStackDirection, defaultStackSpacing} from '../../../../../packages/react/src/Stack/Stack'
