'use client'
import {PropTableValues} from '@primer/doctocat-nextjs/components'

import {defaultRiverImageTextRatio, defaultRiverAlign} from '../../../../../packages/react/src/river/River'

export const RiverAlignProp = () => <PropTableValues values={[defaultRiverAlign]} />
export const RiverImageTextRatio = () => <PropTableValues values={[defaultRiverImageTextRatio]} />
