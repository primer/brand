/** @jest-environment node */

import React from 'react'
import {renderToString} from 'react-dom/server'
import {useFocusTrap} from './useFocusTrap'

describe('useFocusTrap SSR', () => {
  it('renders without a document', () => {
    const TestComponent = () => {
      useFocusTrap()
      return null
    }

    expect(() => renderToString(<TestComponent />)).not.toThrow()
  })
})
