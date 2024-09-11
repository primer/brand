import React from 'react'
import {UnderlineNav} from '@primer/react'
import {Link as GatsbyLink} from 'gatsby'

export function ComponentPageNav({
  basePath,
  current,
}: {
  basePath: string
  current?: 'overview' | 'react'
}) {
  return (
    <UnderlineNav>
      <UnderlineNav.Link
        as={GatsbyLink}
        to={basePath}
        selected={current === 'overview'}
      >
        OverviewTEST
      </UnderlineNav.Link>
      <UnderlineNav.Link
        as={GatsbyLink}
        to={`${basePath}/react`}
        selected={current === 'react'}
      >
        ReactTEST
      </UnderlineNav.Link>
    </UnderlineNav>
  )
}
