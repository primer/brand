import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Image, ImageBorderRadiusOptions} from './'

expect.extend(toHaveNoViolations)

describe('Image', () => {
  it('should have no a11y violations', async () => {
    const {container} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" />,
    )
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render an img element', async () => {
    const {getByAltText} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" />,
    )

    const imageElement = getByAltText('alternative text')

    expect(imageElement).toBeInTheDocument()
    expect(imageElement.tagName).toBe('IMG')
  })

  it('should apply animation styles when `animate` is provided', async () => {
    const {getByRole} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" animate="scale-in" />,
    )

    const imageElement = getByRole('img')

    expect(imageElement).toHaveClass('Animation')
    expect(imageElement).toHaveClass('Animation--scale-in')
  })

  it('should forward the `className` prop to the image', async () => {
    const testClass = 'test'

    const {getByRole} = render(
      <Image
        src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
        alt="alternative text"
        className={testClass}
      />,
    )

    expect(getByRole('img')).toHaveClass(testClass)
  })

  it('should forward the `style` prop to the image', async () => {
    const {getByRole} = render(
      <Image
        src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
        alt="alternative text"
        style={{background: 'red'}}
      />,
    )

    expect(getByRole('img')).toHaveStyle({background: 'red'})
  })

  it('should forward the `alt` prop to the image', async () => {
    const {getByAltText} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" />,
    )

    expect(getByAltText('alternative text')).toBeInTheDocument()
  })

  it.each(ImageBorderRadiusOptions)('should add the appropriate class when `borderRadius="%s"`', async size => {
    const {getByRole} = render(
      <Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" alt="alternative text" borderRadius={size} />,
    )
    expect(getByRole('img')).toHaveClass(`Image--borderRadius-${size}`)
  })
})
