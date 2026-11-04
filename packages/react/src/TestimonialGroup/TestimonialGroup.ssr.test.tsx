import React from 'react'
import {act, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import {hydrateRoot, type Root} from 'react-dom/client'
import {Testimonial} from '../Testimonial'
import {TestimonialGroup} from './TestimonialGroup'

const {renderToString} = jest.requireActual<typeof import('react-dom/server')>('react-dom/server.node')

describe('TestimonialGroup hydration', () => {
  it('hydrates stable navigation with reduced motion and supports manual selection', async () => {
    const browserWindow = window
    const matchMediaDescriptor = Object.getOwnPropertyDescriptor(browserWindow, 'matchMedia')
    let reducedMotion = false
    Object.defineProperty(browserWindow, 'matchMedia', {
      configurable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: reducedMotion,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })
    const content = (
      <TestimonialGroup>
        <Testimonial>
          <Testimonial.Quote>First quote</Testimonial.Quote>
          <Testimonial.Name>Mona Lisa</Testimonial.Name>
        </Testimonial>
        <Testimonial>
          <Testimonial.Quote>Second quote</Testimonial.Quote>
          <Testimonial.Name>Hubot</Testimonial.Name>
        </Testimonial>
      </TestimonialGroup>
    )
    const container = document.createElement('div')
    document.body.append(container)
    const onRecoverableError = jest.fn()
    let root: Root | undefined

    try {
      const markup = renderToString(content)
      reducedMotion = true
      const parsed = new DOMParser().parseFromString(markup, 'text/html')
      container.replaceChildren(...Array.from(parsed.body.childNodes))
      expect(within(container).getByRole('button', {name: 'Next testimonial'})).toBeInTheDocument()
      expect(within(container).getAllByRole('button')).toHaveLength(4)

      await act(async () => {
        root = hydrateRoot(container, content, {onRecoverableError})
      })

      expect(onRecoverableError).not.toHaveBeenCalled()
      expect(within(container).getAllByRole('button')).toHaveLength(4)
      expect(within(container).getByRole('group', {name: 'Testimonial 1 of 2'})).toBeInTheDocument()

      await userEvent.setup().click(within(container).getByRole('button', {name: 'Next testimonial'}))
      expect(within(container).getByRole('group', {name: 'Testimonial 2 of 2'})).toBeInTheDocument()
    } finally {
      await act(async () => root?.unmount())
      container.remove()
      if (matchMediaDescriptor) {
        Object.defineProperty(browserWindow, 'matchMedia', matchMediaDescriptor)
      } else {
        Reflect.deleteProperty(browserWindow, 'matchMedia')
      }
    }
  })
})
