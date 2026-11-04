import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {Link} from './Link'

describe('Link', () => {
  it('forwards an object ref to the anchor', () => {
    const refObject = React.createRef<HTMLAnchorElement>()
    const {getByRole} = render(
      <Link ref={refObject} href="/story">
        Read the story
      </Link>,
    )

    expect(refObject.current).toBe(getByRole('link', {name: 'Read the story'}))
  })

  it('forwards a callback ref to the anchor', () => {
    const handleRef = jest.fn()
    const {getByRole} = render(
      <Link ref={handleRef} href="/story">
        Read the story
      </Link>,
    )

    expect(handleRef).toHaveBeenCalledWith(getByRole('link', {name: 'Read the story'}))
  })

  it('preserves anchor attributes, classes, and activation handlers', () => {
    const handleActivate = jest.fn((event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault())
    const {getByRole} = render(
      <Link href="/story" className="custom-link" aria-label="Read the customer story" onClick={handleActivate}>
        Read the story
      </Link>,
    )
    const link = getByRole('link', {name: 'Read the customer story'})

    expect(link).toHaveAttribute('href', '/story')
    expect(link).toHaveClass('Link', 'custom-link')
    fireEvent.click(link)
    expect(handleActivate).toHaveBeenCalledTimes(1)
  })
})
