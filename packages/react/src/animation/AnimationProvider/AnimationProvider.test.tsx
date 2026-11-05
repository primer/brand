import React from 'react'
import {act, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import '../../test-utils/mocks/match-media-mock'
import {AnimationProvider} from './AnimationProvider'
import styles from '../Animation.module.css'

describe('AnimationProvider visibility options', () => {
  const originalIntersectionObserver = global.IntersectionObserver
  let callback: IntersectionObserverCallback
  const observe = jest.fn()
  const disconnect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    global.IntersectionObserver = jest.fn((observerCallback: IntersectionObserverCallback) => {
      callback = observerCallback
      return {observe, disconnect}
    }) as unknown as typeof IntersectionObserver
  })

  afterAll(() => {
    global.IntersectionObserver = originalIntersectionObserver
  })

  function intersect(target: HTMLElement, intersectionRatio: number, isIntersecting = true) {
    act(() => {
      const rect = target.getBoundingClientRect()
      callback(
        [
          {
            target,
            intersectionRatio,
            isIntersecting,
            boundingClientRect: rect,
            intersectionRect: rect,
            rootBounds: null,
            time: 0,
          },
        ],
        {} as IntersectionObserver,
      )
    })
  }

  it.each([0, 0.5, 1])('passes the numeric visibility ratio %s to IntersectionObserver', visibilityOptions => {
    render(<AnimationProvider visibilityOptions={visibilityOptions}>Content</AnimationProvider>)

    expect(IntersectionObserver).toHaveBeenLastCalledWith(expect.any(Function), {
      rootMargin: '0px',
      threshold: visibilityOptions,
    })
  })

  it('waits for the numeric threshold and removes the active class when visibility drops below it', () => {
    const {getByText} = render(
      <AnimationProvider visibilityOptions={0.5} autoStaggerChildren={false}>
        <div className={styles.Animation}>Animated content</div>
      </AnimationProvider>,
    )
    const target = getByText('Animated content')

    expect(observe).toHaveBeenCalledWith(target)
    intersect(target, 0.01)
    expect(target).not.toHaveClass(styles['Animation--active'])
    intersect(target, 0.49)
    expect(target).not.toHaveClass(styles['Animation--active'])
    intersect(target, 0.5)
    expect(target).toHaveClass(styles['Animation--active'])
    intersect(target, 0.49)
    expect(target).not.toHaveClass(styles['Animation--active'])
    intersect(target, 1)
    expect(target).toHaveClass(styles['Animation--active'])
    intersect(target, 0, false)
    expect(target).not.toHaveClass(styles['Animation--active'])
  })

  it('retains the active class after meeting the numeric threshold with runOnce', () => {
    const {getByText} = render(
      <AnimationProvider visibilityOptions={0.5} runOnce autoStaggerChildren={false}>
        <div className={styles.Animation}>Animated content</div>
      </AnimationProvider>,
    )
    const target = getByText('Animated content')

    intersect(target, 0.25)
    expect(target).not.toHaveClass(styles['Animation--active'])
    intersect(target, 0.5)
    expect(target).toHaveClass(styles['Animation--active'])
    intersect(target, 0.25)
    expect(target).toHaveClass(styles['Animation--active'])
    intersect(target, 0, false)
    expect(target).toHaveClass(styles['Animation--active'])
  })

  it('requires intersection even when the numeric threshold is zero', () => {
    const {getByText} = render(
      <AnimationProvider visibilityOptions={0} autoStaggerChildren={false}>
        <div className={styles.Animation}>Animated content</div>
      </AnimationProvider>,
    )
    const target = getByText('Animated content')

    intersect(target, 0, false)
    expect(target).not.toHaveClass(styles['Animation--active'])
    intersect(target, 0)
    expect(target).toHaveClass(styles['Animation--active'])
  })

  it('waits for full visibility when the numeric threshold is one', () => {
    const {getByText} = render(
      <AnimationProvider visibilityOptions={1} autoStaggerChildren={false}>
        <div className={styles.Animation}>Animated content</div>
      </AnimationProvider>,
    )
    const target = getByText('Animated content')

    intersect(target, 0.99)
    expect(target).not.toHaveClass(styles['Animation--active'])
    intersect(target, 1)
    expect(target).toHaveClass(styles['Animation--active'])
  })

  it.each([
    ['bottom-of-screen', '0px 0px -10% 0px'],
    ['middle-of-screen', '0px 0px -30% 0px'],
    ['about-to-leave', '0px 0px -100% 0px'],
  ] as const)('preserves the %s preset observer options', (visibilityOptions, rootMargin) => {
    render(<AnimationProvider visibilityOptions={visibilityOptions}>Content</AnimationProvider>)

    expect(IntersectionObserver).toHaveBeenLastCalledWith(expect.any(Function), {rootMargin, threshold: 0.4})
  })

  it('disconnects the observer when the provider unmounts', () => {
    const {unmount} = render(<AnimationProvider visibilityOptions={0.5}>Content</AnimationProvider>)
    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
