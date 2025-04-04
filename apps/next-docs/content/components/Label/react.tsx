'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {LabelSizes, LabelColors} from '../../../../../packages/react/src/Label/Label'

export const LabelSizeProp = () => <PropTableValues values={[...LabelSizes]} addLineBreaks />
export const LabelColorProp = () => <PropTableValues values={[...LabelColors]} addLineBreaks />
