'use client'

import {PropTableValues} from '@primer/doctocat-nextjs/components'
import {HeadingTags} from '../../../../../packages/react/src/Heading/Heading'

export function RiverBreakoutTabsHeadingAsProp() {
  return <PropTableValues values={[...HeadingTags]} addLineBreaks />
}
