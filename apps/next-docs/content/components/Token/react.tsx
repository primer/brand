'use client'

import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {TokenVariants} from '../../../../../packages/react/src/Token/Token'

export const TokenVariantProp = () => <PropTableValues values={[...TokenVariants]} addLineBreaks />
export const TokenAsProp = () => <PropTableValues values={['span', 'a']} commaSeparated />
