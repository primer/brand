'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {SubNavSubMenuVariants} from '../../../../../packages/react/src/SubNav/SubNav'

export const SubNavLinkVariantProp = () => <PropTableValues values={['default', 'muted']} addLineBreaks />
export const SubNavSubMenuVariantProp = () => <PropTableValues values={[...SubNavSubMenuVariants]} addLineBreaks />
