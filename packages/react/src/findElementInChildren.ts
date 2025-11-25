import React from 'react'

const findElementInChildren = (children: React.ReactNode, element: React.ElementType): boolean => {
  if (!children) {
    return false
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      if (findElementInChildren(child, element)) {
        return true
      }
    }
  } else if (React.isValidElement<{children?: React.ReactNode}>(children)) {
    if (children.type === element) {
      return true
    }

    if (children.props.children && findElementInChildren(children.props.children, element)) {
      return true
    }
  }

  return false
}

export default findElementInChildren
