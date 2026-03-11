'use client'
import {PropsWithChildren} from 'react'
import {CodeBlock} from '@primer/doctocat-nextjs/components'
// eslint-disable-next-line import/no-namespace
import * as PrimerComponents from '../../../../../packages/react'
// eslint-disable-next-line import/no-namespace
import * as Octicons from '@primer/octicons-react'

type PreProps = {
  'data-language': string
} & PropsWithChildren<HTMLElement>

/**
 * Filters out reserved keywords and non-component keys
 */
function sanitizeKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const exclusions = ['default', 'module.exports']
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(obj)) {
    // Skip reserved keywords and special chars
    if (!exclusions.includes(key) && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
      result[key] = obj[key]
    }
  }
  return result
}

/**
 *
 * @description Use this component to preload your own React components for use in jsx code blocks
 */
export function Pre(props: PreProps) {
  const jsxScope = {
    ...sanitizeKeys(PrimerComponents as Record<string, unknown>),
    ...sanitizeKeys(Octicons as Record<string, unknown>),
  }
  return <CodeBlock jsxScope={jsxScope} {...props} />
}
