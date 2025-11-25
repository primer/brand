import React from 'react'

export const isFragmentElement = (
  node: React.ReactNode | null | undefined,
): node is React.ReactElement<{children?: React.ReactNode}> => {
  return React.isValidElement(node) && node.type === React.Fragment
}
