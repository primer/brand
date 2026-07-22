import React from 'react'
import {focusTrap} from '@primer/behaviors'
import {render, renderHook} from '@testing-library/react'
import {useFocusTrap} from './useFocusTrap'

jest.mock('@primer/behaviors', () => ({
  focusTrap: jest.fn(),
}))

const mockFocusTrap = jest.mocked(focusTrap)

describe('useFocusTrap', () => {
  beforeEach(() => {
    mockFocusTrap.mockReturnValue(new AbortController())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('creates stable refs when refs are not provided', () => {
    const {result, rerender} = renderHook(() => useFocusTrap({disabled: true}))
    const initialContainerRef = result.current.containerRef
    const initialFocusRef = result.current.initialFocusRef

    expect(initialContainerRef.current).toBeNull()
    expect(initialFocusRef.current).toBeNull()

    rerender()

    expect(result.current.containerRef).toBe(initialContainerRef)
    expect(result.current.initialFocusRef).toBe(initialFocusRef)
  })

  it('preserves provided refs', () => {
    const containerRef = React.createRef<HTMLElement>()
    const initialFocusRef = React.createRef<HTMLElement>()
    const {result} = renderHook(() => useFocusTrap({containerRef, initialFocusRef, disabled: true}))

    expect(result.current.containerRef).toBe(containerRef)
    expect(result.current.initialFocusRef).toBe(initialFocusRef)
  })

  it('passes generated ref elements to the focus trap', () => {
    const TestComponent = () => {
      const {containerRef, initialFocusRef} = useFocusTrap()

      return (
        <div ref={containerRef as React.RefObject<HTMLDivElement | null>}>
          <button ref={initialFocusRef as React.RefObject<HTMLButtonElement | null>} />
        </div>
      )
    }

    const {container} = render(<TestComponent />)

    expect(mockFocusTrap).toHaveBeenCalledWith(container.querySelector('div'), container.querySelector('button'))
  })
})
