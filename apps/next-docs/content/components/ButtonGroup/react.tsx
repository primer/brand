'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {ButtonGroupVariants} from '../../../../../packages/react/src/ButtonGroup/ButtonGroup'

export const ButtonGroupSizesProp = () => <PropTableValues values={['small', 'medium', 'large']} commaSeparated />
export const ButtonGroupAsProp = () => <PropTableValues values={['button', 'a']} commaSeparated />
export const ButtonGroupVariantsProp = () => <PropTableValues values={[...ButtonGroupVariants]} commaSeparated />
