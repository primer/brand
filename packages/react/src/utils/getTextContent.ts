import React from 'react'

export function getTextContent(node: React.ReactNode): string {
  if (!node) return ''

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('')
  }

  if (React.isValidElement(node)) {
    const props = node.props as {children?: React.ReactNode}
    return getTextContent(props.children)
  }

  return ''
}
