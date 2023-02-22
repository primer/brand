import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Avatar, AvatarSizes} from './Avatar'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Avatar', () => {
  const mockImageSrc = 'https://avatars.githubusercontent.com/u/92997159?v=4'
  const mockAltText = 'Avatar image'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'Avatar'
    const mockTestId = 'test'

    const {getByTestId} = render(<Avatar data-testid={mockTestId} src={mockImageSrc} alt={mockAltText} />)

    const AvatarEl = getByTestId(mockTestId)
    expect(AvatarEl.classList).toContain(expectedClass)
  })

  it('renders the correct default shape', () => {
    const expectedShapeClass = `Avatar--shape-circle`
    const mockTestId = 'test'

    const {getByTestId} = render(<Avatar data-testid={mockTestId} src={mockImageSrc} alt={mockAltText} />)

    const avatarEl = getByTestId(mockTestId)
    expect(avatarEl.classList).toContain(expectedShapeClass)
  })

  it('renders the correct size', () => {
    const expectedShape = 'square'
    const expectedShapeClass = `Avatar--shape-${expectedShape}`
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Avatar shape={expectedShape} data-testid={mockTestId} src={mockImageSrc} alt={mockAltText} />
    )

    const avatarEl = getByTestId(mockTestId)
    expect(avatarEl.classList).toContain(expectedShapeClass)
  })

  it('renders the correct default size', () => {
    const expectedSizeClass = `Avatar--size-40`
    const mockTestId = 'test'

    const {getByTestId} = render(<Avatar data-testid={mockTestId} src={mockImageSrc} alt={mockAltText} />)

    const avatarEl = getByTestId(mockTestId)
    expect(avatarEl.classList).toContain(expectedSizeClass)
  })

  it('renders the correct size', () => {
    const expectedSize = 32
    const expectedSizeClass = `Avatar--size-${expectedSize}`
    const mockTestId = 'test'

    const {getByTestId} = render(
      <Avatar size={expectedSize} data-testid={mockTestId} src={mockImageSrc} alt={mockAltText} />
    )

    const avatarEl = getByTestId(mockTestId)
    expect(avatarEl.classList).toContain(expectedSizeClass)
  })

  it('can render in different responsive sizes', () => {
    const supportedBreakpoints = ['narrow', 'regular', 'wide']

    for (const breakpoint of supportedBreakpoints) {
      const expectedClass = `Avatar-${breakpoint}--size-`

      for (const size of AvatarSizes) {
        const {getByTestId} = render(
          <Avatar
            data-testid={`avatar-${breakpoint}-${size}`}
            src={mockImageSrc}
            alt={mockAltText}
            size={{
              [breakpoint]: size
            }}
          />
        )
        const avatarEl = getByTestId(`avatar-${breakpoint}-${size}`)

        expect(avatarEl.classList).toContain(expectedClass + size)
      }
    }
  })

  it('has no a11y violations', async () => {
    const {container} = render(<Avatar src={mockImageSrc} alt={mockAltText} />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
