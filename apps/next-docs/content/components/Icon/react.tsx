'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {iconColors, namedIconSizes, numericIconSizes} from '../../../../../packages/react/src/Icon/Icon'

export const IconColorProp = () => <PropTableValues values={[...iconColors]} commaSeparated />
export const IconSizeProp = () => <PropTableValues values={[...namedIconSizes, ...numericIconSizes]} commaSeparated />
