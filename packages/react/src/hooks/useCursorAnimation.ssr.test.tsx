/** @jest-environment node */

import React from 'react'
import {renderToString} from 'react-dom/server'
import {useCursorAnimation} from './useCursorAnimation'

describe('useCursorAnimation SSR', () => {
  it('renders the hydration-stable initial frame without a document', () => {
    const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window')
    Object.defineProperty(globalThis, 'window', {configurable: true, value: undefined})

    const TestComponent = () => {
      const {visibleText, showCursor, cursorPhase} = useCursorAnimation({text: 'Hello world', animate: true})

      return <span>{`${visibleText}:${showCursor}:${cursorPhase}`}</span>
    }

    try {
      expect(renderToString(<TestComponent />)).toContain(':false:initial')
    } finally {
      if (windowDescriptor) {
        Object.defineProperty(globalThis, 'window', windowDescriptor)
      } else {
        Reflect.deleteProperty(globalThis, 'window')
      }
    }
  })
})
