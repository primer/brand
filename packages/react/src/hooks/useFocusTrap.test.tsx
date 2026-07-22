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
    const containerRef = React.createRef<HTMLDivElement>()
    const initialFocusRef = React.createRef<HTMLButtonElement>()
    const {result} = renderHook(() => useFocusTrap({containerRef, initialFocusRef, disabled: true}))

    expect(result.current.containerRef).toBe(containerRef)
    expect(result.current.initialFocusRef).toBe(initialFocusRef)
  })

  it('passes generated ref elements to the focus trap', () => {
    const TestComponent = () => {
      const {containerRef, initialFocusRef} = useFocusTrap<HTMLDivElement, HTMLButtonElement>()

      return (
        <div ref={containerRef}>
          <button ref={initialFocusRef} />
        </div>
      )
    }

    const {container} = render(<TestComponent />)

    expect(mockFocusTrap).toHaveBeenCalledWith(container.querySelector('div'), container.querySelector('button'))
  })

  it('starts and aborts the focus trap when disabled changes', () => {
    const abortController = new AbortController()
    const abortSpy = jest.spyOn(abortController, 'abort')
    mockFocusTrap.mockReturnValue(abortController)

    const TestComponent = ({disabled}: {disabled: boolean}) => {
      const {containerRef} = useFocusTrap<HTMLDivElement>({disabled})
      return <div ref={containerRef} />
    }

    const {rerender} = render(<TestComponent disabled />)

    expect(mockFocusTrap).not.toHaveBeenCalled()

    rerender(<TestComponent disabled={false} />)

    expect(mockFocusTrap).toHaveBeenCalledTimes(1)

    rerender(<TestComponent disabled />)

    expect(abortSpy).toHaveBeenCalled()
  })

  it('captures fresh focus after cleaning up a non-HTMLElement active element', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('tabindex', '0')
    document.body.append(svg)
    svg.focus()

    const nextFocusedElement = document.createElement('button')
    document.body.append(nextFocusedElement)

    const TestComponent = ({disabled}: {disabled: boolean}) => {
      const {containerRef} = useFocusTrap<HTMLDivElement>({disabled, restoreFocusOnCleanUp: true})
      return <div ref={containerRef} />
    }

    const {rerender} = render(<TestComponent disabled={false} />)

    rerender(<TestComponent disabled />)
    nextFocusedElement.focus()

    const focusSpy = jest.spyOn(nextFocusedElement, 'focus')

    rerender(<TestComponent disabled={false} />)
    rerender(<TestComponent disabled />)

    expect(focusSpy).toHaveBeenCalled()

    svg.remove()
    nextFocusedElement.remove()
  })
})
