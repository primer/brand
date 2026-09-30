'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {IconButtonSizes, IconButtonVariants, TooltipDirections} from '@primer/react-brand'

export const IconButtonVariantsProp = () => <PropTableValues values={[...IconButtonVariants]} commaSeparated />
export const IconButtonSizesProp = () => <PropTableValues values={[...IconButtonSizes]} commaSeparated />
export const IconButtonDirectionsProp = () => <PropTableValues values={[...TooltipDirections]} commaSeparated />
