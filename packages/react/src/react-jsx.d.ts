// Needed after upgrading to React 19, which has a new JSX runtime.
// This re-exports  the JSX namespace so that we don't need to rely on
// users providing their own, which could be different versions of React.

import type {Component, ReactElement, JSX as ReactJSX} from 'react'

declare global {
  namespace JSX {
    type Element = ReactElement
    type ElementClass = Component
    type ElementAttributesProperty = ReactJSX.ElementAttributesProperty
    type ElementChildrenAttribute = ReactJSX.ElementChildrenAttribute
    type ElementType = ReactJSX.ElementType
    type LibraryManagedAttributes<C, P> = ReactJSX.LibraryManagedAttributes<C, P>
    type IntrinsicAttributes = ReactJSX.IntrinsicAttributes
    type IntrinsicClassAttributes<T> = ReactJSX.IntrinsicClassAttributes<T>
    type IntrinsicElements = ReactJSX.IntrinsicElements
  }
}

export {}
