// eslint-disable-next-line filenames/match-regex
'use client'
import React, {PropsWithChildren} from 'react'
import {CodeBlock} from '@primer/doctocat-nextjs/components'

// eslint-disable-next-line import/no-namespace
import * as PrimerComponents from '@primer/react-brand/lib'
// eslint-disable-next-line import/no-namespace
import * as Octicons from '@primer/octicons-react'

type PreProps = {
  'data-language': string
} & PropsWithChildren<HTMLElement>

/**
 *
 * @description Use this component to preload your own React components for use in jsx code blocks
 */
export function Pre(props: PreProps) {
  return <CodeBlock jsxScope={{...PrimerComponents, ...Octicons}} {...props} />
}
